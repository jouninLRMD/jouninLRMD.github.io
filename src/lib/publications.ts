/** Helpers shared by the Publications section, per-publication routes,
 *  and the RSS feed. Pure data massaging — no runtime side effects. */

import pubsData from "../../data/publications.json";

export type Publication = {
  id?: string;
  title: string;
  authors?: string;
  venue?: string;
  details?: string;
  year?: number;
  doi?: string;
  url?: string;
  role?: "first" | "co" | string;
  type?: string;
  source?: string;
};

/** URL-safe slug for a publication. Prefers the DOI (stable, unique) and
 *  falls back to a title slug for rare DOI-less entries. */
export function pubSlug(p: Publication): string {
  if (p.doi) {
    return p.doi
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  return (p.title || "untitled")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function allPublications(): Publication[] {
  return (pubsData.publications as Publication[]).slice().sort(
    (a, b) => (b.year || 0) - (a.year || 0),
  );
}

export const generatedAt: string = pubsData.generated_at ?? "";
