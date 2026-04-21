import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { site } from "../data/site";
import { allPublications, pubSlug } from "../lib/publications";

export async function GET(context: APIContext) {
  const publications = allPublications();

  return rss({
    title: `${site.name} — Publications`,
    description:
      "New and updated peer-reviewed publications by Luis R. Mercado-Diaz. Auto-synced from OpenAlex / CrossRef.",
    // `context.site` comes from astro.config.mjs `site` so the feed URL is
    // always the production origin.
    site: context.site ?? site.url,
    items: publications.map((p) => ({
      title: p.title,
      description: [p.authors, p.details || p.venue].filter(Boolean).join(" — "),
      link: `/publications/${pubSlug(p)}`,
      // Use Jan 1 of the publication year as pubDate. OpenAlex often lacks
      // the exact day, and this keeps feed entries chronologically correct.
      pubDate: p.year ? new Date(Date.UTC(p.year, 0, 1)) : undefined,
      customData: p.doi ? `<guid isPermaLink="false">doi:${p.doi}</guid>` : undefined,
    })),
    customData: `<language>en-us</language>`,
  });
}
