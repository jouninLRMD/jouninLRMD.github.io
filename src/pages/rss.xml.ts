import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { site } from "../data/site";
import { allPublications, pubSlug } from "../lib/publications";

export async function GET(context: APIContext) {
  const feedSite = context.site ?? site.url;
  const publications = allPublications();
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  const publicationItems = publications.map((p) => ({
    title: p.title,
    description: [p.authors, p.details || p.venue].filter(Boolean).join(" — "),
    link: `/publications/${pubSlug(p)}`,
    // Use Jan 1 of the publication year as pubDate. OpenAlex often lacks
    // the exact day, and this keeps feed entries chronologically correct.
    pubDate: p.year ? new Date(Date.UTC(p.year, 0, 1)) : undefined,
    customData: p.doi ? `<guid isPermaLink="false">doi:${p.doi}</guid>` : undefined,
  }));

  const postItems = posts.map((post) => ({
    title: post.data.title,
    description: post.data.description,
    link: `/blog/${post.id}`,
    pubDate: post.data.date,
    categories: post.data.tags,
  }));

  // Merge posts + publications into one feed, newest first.
  const items = [...postItems, ...publicationItems].sort(
    (a, b) => (b.pubDate?.valueOf() ?? 0) - (a.pubDate?.valueOf() ?? 0),
  );

  return rss({
    title: `${site.name} — Blog & Publications`,
    description:
      "Research notes, project updates, and new peer-reviewed publications by Luis R. Mercado-Diaz. Publications auto-synced from OpenAlex / CrossRef.",
    site: feedSite,
    items,
    customData: `<language>en-us</language>`,
  });
}
