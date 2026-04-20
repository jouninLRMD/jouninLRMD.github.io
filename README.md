# jouninlrmd.github.io

Personal website of **Luis R. Mercado-Diaz** &mdash; Ph.D. in Biomedical
Engineering and M.S. in Computer Science & Engineering. Built as a static site
on **GitHub Pages** with an automated publication-update pipeline.

## Architecture at a glance

```
┌──────────────────────────────────────────────────────────────────────────┐
│  Browser                                                                 │
│                                                                          │
│  index.html  ──►  assets/css/style.css  ──►  Tailwind (CDN, pinned)      │
│       │                                                                  │
│       └── assets/js/main.js                                              │
│               │                                                          │
│               └── fetch("data/publications.json")                        │
│                        (rendered client-side into the Publications list) │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│  GitHub Actions  (.github/workflows/update-publications.yml)             │
│                                                                          │
│  cron: daily at 05:17 UTC                                                │
│    │                                                                     │
│    └── python scripts/update_publications.py                             │
│            │                                                             │
│            ├── OpenAlex public API (primary)                             │
│            └── CrossRef public API (fallback)                            │
│                    │                                                     │
│                    ▼                                                     │
│            data/publications.json  ──►  auto-commit back to main         │
└──────────────────────────────────────────────────────────────────────────┘
```

## Directory layout

```
.
├── index.html                     # Single-page app (Tailwind + vanilla JS)
├── assets/
│   ├── css/style.css              # Custom CSS (small; Tailwind does the rest)
│   ├── js/main.js                 # Modular client-side behaviour
│   ├── images/                    # Hero & gallery images
│   ├── papers/                    # PDF preprints (self-hosted)
│   └── docs/                      # Resume PDF
├── data/
│   ├── config.json                # Author metadata (ORCID, name variants)
│   └── publications.json          # Auto-refreshed list rendered by the site
├── scripts/
│   ├── update_publications.py     # OpenAlex+CrossRef fetcher (stdlib only)
│   └── requirements.txt
├── .github/workflows/
│   └── update-publications.yml    # Daily cron to refresh publications.json
├── .well-known/security.txt       # Responsible-disclosure contact
├── robots.txt                     # Blocks AI scraper bots by default
├── sitemap.xml
└── .nojekyll                      # Disable Jekyll so .well-known is served
```

## Auto-updating publications

Every day at **05:17 UTC** (and on manual dispatch) the GitHub Action runs
`scripts/update_publications.py`. The script:

1. Reads `data/config.json` for the author's name, ORCID (if set), and an
   optional OpenAlex author ID.
2. Queries **[OpenAlex](https://openalex.org)** for all works authored by
   that person since `min_year`. If OpenAlex fails or returns nothing, it
   falls back to **[CrossRef](https://www.crossref.org)**.
3. Normalises DOIs, detects whether you are first / co-first / co-author,
   and formats each work to the site's schema.
4. Merges the fetched list with the committed `data/publications.json`,
   preserving any manual curation. Entries you curated by hand keep their
   polished author strings, titles, and roles.
5. Writes the file back, sorted by year desc / title asc. The workflow only
   commits if something actually changed.

### Adding your ORCID (recommended)

Edit `data/config.json`:

```json
"author": {
  "orcid": "0000-0002-XXXX-XXXX"
}
```

With an ORCID set, the fetcher is deterministic and cannot be fooled by
name collisions. Without one, it falls back to a name search (reliable but
slightly fuzzier).

### Curating a publication by hand

Any entry you add to `data/publications.json` with `"source": "manual"`
(or no `source`) will survive future automated runs &mdash; `title`,
`authors`, `role`, and `details` are never overwritten once they exist.

To *exclude* a DOI (e.g. a duplicate or an irrelevant record), add it to
`config.json`:

```json
"fetch": { "exclude_dois": ["10.xxxx/XXXX"] }
```

### Running it locally

```bash
python3 scripts/update_publications.py
git diff data/publications.json   # review the change
```

No external dependencies &mdash; only the Python standard library.

## Security & privacy posture

This is a personal website, so the blast radius is small. Even so:

- **Content Security Policy** meta tag restricts script / style / font /
  image origins (`index.html` `<head>`).
- **Subresource Integrity** (`integrity=`) on the FontAwesome CDN asset.
- `referrer-policy: strict-origin-when-cross-origin`, `X-Content-Type-Options: nosniff`, and a locked-down `Permissions-Policy` (no camera/mic/geolocation/FLoC).
- `rel="noopener noreferrer"` on every external link that opens in a new tab.
- **No analytics / trackers** &mdash; no Google Analytics, no fingerprinting libs.
- `robots.txt` opts out of the major LLM scraping bots by default.
- `.well-known/security.txt` publishes a responsible-disclosure contact.
- GitHub Actions runs with `permissions: contents: write` (nothing else) and
  uses the built-in `GITHUB_TOKEN` &mdash; no secrets are stored in the repo.

## Local development

```bash
python3 -m http.server 8000
# then open http://localhost:8000/
```

(Or use the legacy helper: `python3 test_http.py`.)

## Going further (optional upgrades)

- **Ship a pre-built Tailwind bundle** instead of the Play CDN (removes
  the `unsafe-inline` script in the CSP and saves ~50kB on repeat visits).
  Add a `npm run build` step with `tailwindcss -i src.css -o assets/css/tw.css`.
- **Self-host fonts** (Google Fonts → `fonts/Inter-*.woff2`) to drop the
  `fonts.googleapis.com` CSP exception entirely.
- **Add dependabot** for the GitHub Actions version pins
  (`actions/checkout`, `actions/setup-python`).
- **Upgrade to Astro or 11ty** if you ever want components, Markdown-driven
  blog posts, or MDX. Both compile down to the same static HTML.
