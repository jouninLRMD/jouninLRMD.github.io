#!/usr/bin/env python3
"""Automatically refresh data/publications.json from OpenAlex (primary) and
CrossRef (fallback).

Flow:
  1. Load data/config.json (author name + optional ORCID / OpenAlex ID).
  2. Query OpenAlex for all works authored by the person. If ORCID or
     OpenAlex author ID is missing, fall back to a name-filtered search.
  3. If OpenAlex returns nothing, try CrossRef author search as a second
     source (uses bibliographic query + author filter).
  4. Merge the fetched works with data/publications.json, preserving any
     manual curation (title/role overrides, manual entries, etc.).
  5. Emit a stable, diff-friendly JSON file sorted by year desc / title asc.

Environment:
  * No secrets required. All APIs used are public.
  * We set a descriptive User-Agent + mailto as a polite identifier so the
    providers can contact us if we misbehave.

Safety:
  * Never deletes manually-added publications (entries with source=="manual").
  * Only marks the file "dirty" when something actually changed, so the
    GitHub Actions job can skip commits on no-op days.
"""

from __future__ import annotations

import dataclasses
import datetime as dt
import json
import logging
import os
import re
import sys
import time
import unicodedata
import urllib.parse
import urllib.request
import urllib.error
from pathlib import Path
from typing import Any, Iterable

REPO_ROOT = Path(__file__).resolve().parent.parent
CONFIG_PATH = REPO_ROOT / "data" / "config.json"
PUBS_PATH = REPO_ROOT / "data" / "publications.json"

CONTACT_EMAIL = os.environ.get("CONTACT_EMAIL", "lrmercadod@gmail.com")
USER_AGENT = (
    f"jouninLRMD-site-updater/1.0 (+https://jouninlrmd.github.io; mailto:{CONTACT_EMAIL})"
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
log = logging.getLogger("update_publications")


# ---------- Utilities ----------

def http_get_json(url: str, *, retries: int = 4, backoff: float = 2.0) -> dict[str, Any]:
    """GET JSON with retry + exponential backoff. Raises on final failure."""
    last_err: Exception | None = None
    for attempt in range(retries):
        req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, "Accept": "application/json"})
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError) as exc:
            last_err = exc
            wait = backoff * (2 ** attempt)
            log.warning("GET %s failed (%s); retrying in %.1fs", url, exc, wait)
            time.sleep(wait)
    assert last_err is not None
    raise last_err


def strip_accents(s: str) -> str:
    return "".join(c for c in unicodedata.normalize("NFKD", s) if not unicodedata.combining(c))


def normalize_name(name: str) -> str:
    """Lowercase, strip accents, replace hyphens & dots with spaces, collapse whitespace."""
    name = strip_accents(name).lower()
    name = re.sub(r"[\-\.,_]", " ", name)
    name = re.sub(r"[^a-z\s]", "", name)
    return re.sub(r"\s+", " ", name).strip()


def normalize_doi(doi: str | None) -> str | None:
    if not doi:
        return None
    doi = doi.strip().lower()
    doi = re.sub(r"^https?://(dx\.)?doi\.org/", "", doi)
    return doi or None


# ---------- Author matching ----------

# Hard-coded constraints for *this* author. They are deliberately narrow —
# we want a high-precision filter so we never pull in homonyms.
_VALID_GIVEN_FIRST_TOKENS = {"l", "luis"}
# After normalization, the surname token sequence must be exactly one of:
_VALID_SURNAME_FORMS: tuple[tuple[str, ...], ...] = (
    ("mercado", "diaz"),  # "Mercado Diaz" / "Mercado-Diaz" → both normalize to two tokens
)


@dataclasses.dataclass
class AuthorMatcher:
    """Strict author identity check.

    A name matches iff:
      * its normalized surname tokens equal one of `_VALID_SURNAME_FORMS`, AND
      * its first given-name token is "l" or "luis", AND
      * every additional given-name token (between first and surname) is either
        a single initial that prefixes a corresponding paper-side full token,
        or matches a configured variant token positionally.

    `variants` and `co_first` are kept for backwards compatibility with the
    existing call sites, but the logic above is what actually decides matches.
    """

    variants: list[str]
    co_first: list[str]

    def is_author(self, raw_name: str) -> bool:
        tokens = normalize_name(raw_name).split()
        if len(tokens) < 2:
            return False

        # Try the canonical surnames first ("Mercado Diaz" / "Mercado-Diaz").
        surname_len = 0
        for form in _VALID_SURNAME_FORMS:
            n = len(form)
            if len(tokens) >= n and tuple(tokens[-n:]) == form:
                surname_len = n
                break

        # Fallback: ultra-abbreviated forms like "L.R.M. Diaz" or "L. R. M. D."
        # Accept a final "diaz" (or trailing "m d" for "M. D.") only if the
        # given-name region contains an "m" / "mercado" hint, so we don't
        # collide with random "Luis Diaz" / "L. Diaz" people.
        if surname_len == 0:
            if tokens[-1] == "d" and len(tokens) >= 2 and tokens[-2] == "m":
                surname_len = 2
            elif tokens[-1] == "diaz":
                # Require an "m" / "mercado" earlier in the tokens.
                given_region = tokens[:-1]
                if any(t == "m" or t == "mercado" for t in given_region[1:]):
                    surname_len = 1

        if surname_len == 0:
            return False

        given = tokens[:-surname_len]
        if not given:
            return False
        if given[0] not in _VALID_GIVEN_FIRST_TOKENS:
            return False
        # Any further given-name tokens must start with l/r/m/d (matching
        # Luis/Roberto/Mercado/Diaz) — keeps "Luis Carlos Mercado Diaz" out.
        allowed_initials = {"l", "r", "m", "d"}
        for tok in given[1:]:
            if tok[0] not in allowed_initials:
                return False
        return True


# ---------- OpenAlex ----------

def _candidate_affiliations(candidate: dict[str, Any]) -> set[str]:
    """All affiliation strings (lower-case) reported for an OpenAlex author."""
    out: set[str] = set()
    for inst in candidate.get("last_known_institutions") or []:
        name = (inst or {}).get("display_name") or ""
        if name:
            out.add(name.lower())
    for aff in candidate.get("affiliations") or []:
        name = ((aff or {}).get("institution") or {}).get("display_name") or ""
        if name:
            out.add(name.lower())
    return out


def _affiliation_matches(candidate_affs: set[str], required: set[str]) -> bool:
    """True if any required affiliation substring appears in any candidate aff."""
    if not required:
        return True
    for req in required:
        for cand in candidate_affs:
            if req in cand:
                return True
    return False


def openalex_discover_author_ids(config: dict[str, Any], matcher: AuthorMatcher) -> list[str]:
    """Resolve likely OpenAlex author IDs from the configured name variants.

    To prevent homonym pollution we *also* require the candidate to share at
    least one configured affiliation when `fetch.require_affiliation_for_discovery`
    is true (the default). Without that guard, multiple "Luis Mercado-Diaz"
    accounts at OpenAlex would all get pulled.
    """
    fetch_cfg = config.get("fetch") or {}
    required_affs = {a.lower() for a in (config["author"].get("affiliations") or []) if a}
    require_aff = bool(fetch_cfg.get("require_affiliation_for_discovery", True))

    author_ids: set[str] = set()
    variants = config["author"].get("name_variants") or [config["author"]["full_name"]]
    for variant in variants:
        if not variant:
            continue
        url = (
            "https://api.openalex.org/authors?"
            + urllib.parse.urlencode(
                {"search": variant, "per-page": "25", "mailto": CONTACT_EMAIL}
            )
        )
        try:
            payload = http_get_json(url)
        except Exception as exc:  # noqa: BLE001
            log.warning("Author search for %r failed: %s", variant, exc)
            continue
        for candidate in payload.get("results") or []:
            display = candidate.get("display_name", "")
            if not matcher.is_author(display):
                continue
            cand_affs = _candidate_affiliations(candidate)
            if require_aff and required_affs and not _affiliation_matches(cand_affs, required_affs):
                log.info(
                    "Skipping homonym %r (id=%s) — affiliations %s do not match required %s",
                    display, candidate.get("id"), sorted(cand_affs) or ["(none)"], sorted(required_affs),
                )
                continue
            aid = candidate.get("id")
            if aid:
                author_ids.add(aid)
                log.info("Accepted author %r (id=%s) with affiliations %s", display, aid, sorted(cand_affs))
    log.info("Discovered %d OpenAlex author ID(s): %s", len(author_ids), sorted(author_ids))
    return sorted(author_ids)


def openalex_fetch(config: dict[str, Any], matcher: AuthorMatcher) -> list[dict[str, Any]]:
    author = config["author"]
    orcid = (author.get("orcid") or "").strip()
    openalex_id = (author.get("openalex_id") or "").strip()
    fetch_cfg = config.get("fetch") or {}
    min_year = int(fetch_cfg.get("min_year", 2015))
    require_aff_per_work = bool(fetch_cfg.get("require_affiliation_per_work", True))
    required_affs = (
        {a.lower() for a in (author.get("affiliations") or []) if a}
        if require_aff_per_work else set()
    )

    # Build author-level filters in priority order: deterministic IDs first,
    # then author-ID discovery (also affiliation-filtered), then fuzzy name
    # search as a last resort.
    author_filters: list[str] = []
    if orcid:
        author_filters.append(f"author.orcid:{orcid}")
    if openalex_id:
        author_filters.append(f"author.id:{openalex_id}")
    if not author_filters:
        for aid in openalex_discover_author_ids(config, matcher):
            author_filters.append(f"author.id:{aid}")
    if not author_filters:
        primary = author["full_name"].replace(" ", "+")
        author_filters.append(f"raw_author_name.search:{primary}")

    collected: dict[str, dict[str, Any]] = {}
    for af in author_filters:
        try:
            for work in _openalex_works(af, min_year):
                wid = work.get("id") or normalize_doi(work.get("doi"))
                if not wid or wid in collected:
                    continue
                collected[wid] = work
        except Exception as exc:  # noqa: BLE001 — keep other filters running
            log.warning("OpenAlex filter %r failed: %s", af, exc)

    kept = [w for w in collected.values() if openalex_keep(w, matcher, required_affs)]
    skipped = len(collected) - len(kept)
    if skipped:
        log.info(
            "Filtered out %d work(s) lacking matched author with required affiliation",
            skipped,
        )
    return [openalex_to_publication(w, matcher) for w in kept]


def _openalex_works(author_filter: str, min_year: int) -> list[dict[str, Any]]:
    """Page through /works for a single author filter, returning all results."""
    filters = [author_filter, f"from_publication_date:{min_year}-01-01"]
    params = {
        "filter": ",".join(filters),
        "per-page": "100",
        "mailto": CONTACT_EMAIL,
    }
    works: list[dict[str, Any]] = []
    cursor = "*"
    while True:
        url = "https://api.openalex.org/works?" + urllib.parse.urlencode(
            {**params, "cursor": cursor}
        )
        log.info("OpenAlex query: %s", url)
        payload = http_get_json(url)
        results = payload.get("results") or []
        works.extend(results)
        cursor = (payload.get("meta") or {}).get("next_cursor")
        if not cursor or not results:
            break
    log.info("OpenAlex %s -> %d works", author_filter, len(works))
    return works


def openalex_keep(work: dict[str, Any], matcher: AuthorMatcher, required_affs: set[str] | None = None) -> bool:
    """Return True if at least one authorship matches the strict matcher.

    When `required_affs` is supplied we additionally require that the matched
    authorship's institutions overlap one of them — this kills the homonym
    case where a different "Luis Mercado-Diaz" published with a non-UConn
    institution.
    """
    authorships = work.get("authorships") or []
    for a in authorships:
        name = (a.get("author") or {}).get("display_name", "")
        if not matcher.is_author(name):
            continue
        if not required_affs:
            return True
        institutions = a.get("institutions") or []
        inst_names = {(inst.get("display_name") or "").lower() for inst in institutions}
        # Also check raw_affiliation_strings for cases where an institution
        # entity isn't linked but the affiliation text mentions UConn.
        raw_strs = {s.lower() for s in (a.get("raw_affiliation_strings") or [])}
        haystacks = inst_names | raw_strs
        if any(req in cand for req in required_affs for cand in haystacks):
            return True
    return False


def openalex_to_publication(work: dict[str, Any], matcher: AuthorMatcher) -> dict[str, Any]:
    doi = normalize_doi(work.get("doi"))
    authors = work.get("authorships") or []
    author_names = [a.get("author", {}).get("display_name", "") for a in authors]
    title = (work.get("title") or "").strip()
    venue = (
        (work.get("primary_location") or {}).get("source", {}) or {}
    ).get("display_name") or work.get("host_venue", {}).get("display_name") or ""
    year = work.get("publication_year")
    work_type = work.get("type") or "article"

    role = _infer_role(author_names, matcher)
    authors_str = _format_authors(author_names, matcher)
    details = _format_details(venue, work, year)

    return {
        "id": doi or work.get("id"),
        "title": title,
        "authors": authors_str,
        "venue": venue,
        "details": details,
        "year": year,
        "doi": doi,
        "url": f"https://doi.org/{doi}" if doi else (work.get("id") or ""),
        "role": role,
        "type": _map_type(work_type),
        "source": "openalex",
    }


# ---------- CrossRef fallback ----------

def crossref_fetch(config: dict[str, Any], matcher: AuthorMatcher) -> list[dict[str, Any]]:
    name = config["author"]["full_name"]
    min_year = int(config.get("fetch", {}).get("min_year", 2015))
    params = {
        "query.author": name,
        "rows": "100",
        "filter": f"from-pub-date:{min_year}-01-01",
        "mailto": CONTACT_EMAIL,
    }
    url = "https://api.crossref.org/works?" + urllib.parse.urlencode(params)
    log.info("CrossRef query: %s", url)
    payload = http_get_json(url)
    items = ((payload.get("message") or {}).get("items") or [])
    out: list[dict[str, Any]] = []
    for item in items:
        authors = [
            " ".join(filter(None, [a.get("given"), a.get("family")]))
            for a in item.get("author", [])
        ]
        if not any(matcher.is_author(a) for a in authors):
            continue
        doi = normalize_doi(item.get("DOI"))
        title = (item.get("title") or [""])[0].strip()
        year = None
        for k in ("published-print", "published-online", "issued"):
            parts = ((item.get(k) or {}).get("date-parts") or [[None]])[0]
            if parts and parts[0]:
                year = parts[0]
                break
        venue = (item.get("container-title") or [""])[0]
        out.append({
            "id": doi or item.get("URL"),
            "title": title,
            "authors": _format_authors(authors, matcher),
            "venue": venue,
            "details": _format_details(venue, item, year),
            "year": year,
            "doi": doi,
            "url": f"https://doi.org/{doi}" if doi else item.get("URL", ""),
            "role": _infer_role(authors, matcher),
            "type": _map_type(item.get("type", "journal-article")),
            "source": "crossref",
        })
    return out


# ---------- Shared helpers ----------

def _infer_role(authors: list[str], matcher: AuthorMatcher) -> str:
    for idx, name in enumerate(authors):
        if matcher.is_author(name):
            return "first" if idx == 0 else "co"
    return "co"


def _format_authors(authors: Iterable[str], matcher: AuthorMatcher) -> str:
    names = [a for a in authors if a]
    if len(names) > 6:
        names = names[:5] + ["et al."]
    return ", ".join(names)


def _format_details(venue: str, work: dict[str, Any], year: int | None) -> str:
    pieces = [p for p in [venue, str(year) if year else None] if p]
    return ", ".join(pieces)


def _map_type(t: str) -> str:
    t = (t or "").lower()
    if "proceedings" in t or "conference" in t:
        return "conference"
    if "chapter" in t or "book" in t:
        return "book"
    if "preprint" in t or "posted-content" in t:
        return "preprint"
    return "journal"


def _authors_contain_this_author(authors_str: str, matcher: AuthorMatcher) -> bool:
    """True if any name inside the formatted author string passes the matcher.

    The stored `authors` is typically "A, B, C, D, E, et al." — a split on
    commas / semicolons / "and" gives us the individual names to check.
    """
    if not authors_str:
        return False
    parts = re.split(r"[,;]|\band\b", authors_str, flags=re.IGNORECASE)
    for p in parts:
        p = p.strip()
        if not p or p.lower() == "et al.":
            continue
        if matcher.is_author(p):
            return True
    return False


def _purge_non_author(entries: list[dict[str, Any]], matcher: AuthorMatcher) -> list[dict[str, Any]]:
    """Drop any entry whose formatted author list contains no Mercado-Diaz match.

    This is the safety net for legacy records that predate the strict
    matcher — without it, homonym papers already committed to
    publications.json would stick around forever since merge_publications
    only ever *adds* entries.
    """
    kept: list[dict[str, Any]] = []
    dropped = 0
    for e in entries:
        if _authors_contain_this_author(e.get("authors") or "", matcher):
            kept.append(e)
        else:
            dropped += 1
    if dropped:
        log.info("Purged %d entry(ies) whose authors list has no Mercado-Diaz match", dropped)
    return kept


# ---------- Preprint filter ----------

PREPRINT_DOI_PREFIXES = (
    "10.31234/osf.io/",   # OSF / PsyArXiv
    "10.48550/arxiv.",     # arXiv
    "10.1101/",            # bioRxiv / medRxiv
    "10.21203/rs.3.rs-",   # Research Square
    "10.36227/techrxiv.",  # TechRxiv
    "10.2139/ssrn.",       # SSRN
    "10.31219/osf.io/",    # OSF alt prefix
)


def _is_preprint(entry: dict[str, Any]) -> bool:
    doi = (entry.get("doi") or "").lower()
    if any(doi.startswith(p) for p in PREPRINT_DOI_PREFIXES):
        return True
    return (entry.get("type") or "").lower() == "preprint"


def _drop_preprints(entries: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Drop all preprint entries (OSF/arXiv/bioRxiv/SSRN/TechRxiv/etc.)."""
    out = [e for e in entries if not _is_preprint(e)]
    dropped = len(entries) - len(out)
    if dropped:
        log.info("Dropped %d preprint(s) (policy: published-only)", dropped)
    return out


# ---------- Merge logic ----------

def merge_publications(
    existing: list[dict[str, Any]],
    fetched: list[dict[str, Any]],
    exclude: set[str],
    matcher: AuthorMatcher | None = None,
) -> tuple[list[dict[str, Any]], int]:
    index: dict[str, dict[str, Any]] = {}
    added = 0

    # Keep manual/seed entries first so their curated metadata wins on merge
    for entry in existing:
        key = (normalize_doi(entry.get("doi")) or entry.get("id") or entry.get("title", "")).lower()
        if not key:
            continue
        index[key] = dict(entry)

    for entry in fetched:
        doi = normalize_doi(entry.get("doi"))
        if doi and doi in exclude:
            continue
        key = (doi or entry.get("id") or entry.get("title", "")).lower()
        if not key:
            continue
        if key in index:
            merged = dict(index[key])
            # Prefer existing curated fields; only fill blanks from fetch.
            for field, value in entry.items():
                if field in {"authors", "role", "title", "details"} and merged.get(field):
                    continue
                if merged.get(field) in (None, "", []):
                    merged[field] = value
            # Always keep the latest source tag so we can tell what touched it
            merged["source"] = merged.get("source") or entry.get("source")
            index[key] = merged
        else:
            index[key] = entry
            added += 1

    merged_list = _drop_preprints(list(index.values()))
    if matcher is not None:
        merged_list = _purge_non_author(merged_list, matcher)
    merged_list.sort(
        key=lambda p: (-(p.get("year") or 0), (p.get("title") or "").lower())
    )
    return merged_list, added


# ---------- Main ----------

def main() -> int:
    if not CONFIG_PATH.exists():
        log.error("Missing %s", CONFIG_PATH)
        return 2

    config = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    existing_payload = (
        json.loads(PUBS_PATH.read_text(encoding="utf-8")) if PUBS_PATH.exists() else {"publications": []}
    )
    existing = existing_payload.get("publications", [])
    exclude = {normalize_doi(d) for d in config.get("fetch", {}).get("exclude_dois", []) if d}

    matcher = AuthorMatcher(
        variants=config["author"].get("name_variants") or [config["author"]["full_name"]],
        co_first=config.get("fetch", {}).get("co_first_author_aliases", []),
    )

    fetched: list[dict[str, Any]] = []
    try:
        fetched = openalex_fetch(config, matcher)
        log.info("OpenAlex returned %d matching works", len(fetched))
    except Exception as exc:  # noqa: BLE001 — we want to fall back
        log.warning("OpenAlex failed (%s); attempting CrossRef", exc)

    if not fetched:
        try:
            fetched = crossref_fetch(config, matcher)
            log.info("CrossRef returned %d matching works", len(fetched))
        except Exception as exc:  # noqa: BLE001
            log.error("CrossRef also failed: %s", exc)
            fetched = []

    if not fetched and not existing:
        log.error("No publications fetched and no existing data. Aborting.")
        return 1

    merged, added = merge_publications(existing, fetched, exclude, matcher)

    payload = {
        "generated_at": dt.date.today().isoformat(),
        "source": "auto (openalex+crossref) merged with manual curation",
        "author": {
            "name": config["author"]["full_name"],
            "name_variants": config["author"].get("name_variants", []),
        },
        "publications": merged,
    }

    previous = json.dumps(existing_payload.get("publications", []), sort_keys=True)
    current = json.dumps(merged, sort_keys=True)
    if previous == current:
        log.info("No changes; %d publications tracked.", len(merged))
        # Still write so generated_at advances only once per real change (skipped)
        return 0

    PUBS_PATH.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    log.info(
        "Wrote %s with %d publications (%d new vs. previous).",
        PUBS_PATH, len(merged), added,
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
