// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// Central config for the Astro build. Site URL is fixed to the production
// GitHub Pages origin so generated absolute URLs (sitemap, Open Graph) are
// correct.
export default defineConfig({
  site: "https://jouninlrmd.github.io",
  trailingSlash: "never",
  integrations: [
    tailwind({
      // Our custom CSS lives in src/styles/global.css; we apply it manually.
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
  build: {
    // Keep asset hashes stable-ish so browser caches are happy across
    // deploys when content didn't change.
    assets: "_astro",
  },
  vite: {
    build: {
      cssMinify: "lightningcss",
    },
  },
});
