import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/**
 * Blog / Research Notes collection.
 *
 * Every `.md` file in src/content/blog/ becomes a page at /blog/<filename>.
 * Files starting with "_" (e.g. _TEMPLATE.md) are ignored, so the template
 * can live next to the real posts. Figures go either next to the post
 * (referenced as ./figure.png — Astro optimizes them) or in public/blog/.
 */
const blog = defineCollection({
  loader: glob({ pattern: ["**/*.md", "!**/_*"], base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      // Optional cover image, path relative to the post file. Rendered on
      // the card in /blog and as a hero on the post page.
      cover: image().optional(),
      coverAlt: z.string().optional(),
      // Link a post to one of the auto-synced publications by DOI; the post
      // page then shows a "Read the paper" button automatically.
      doi: z.string().optional(),
      // Set true to keep a post out of the list, feed, and sitemap while
      // it's still being written. The page itself is not built either.
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
