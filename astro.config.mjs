// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// Central config for the Astro build. Site URL is fixed to the production
// GitHub Pages origin so generated absolute URLs (sitemap, Open Graph) are
// correct.
export default defineConfig({
  site: "https://jouninlrmd.github.io",
  trailingSlash: "never",
  integrations: [sitemap()],
  vite: {
    // Tailwind v4 ships as a first-class Vite plugin; the old
    // @astrojs/tailwind integration is deprecated in v4.
    plugins: [tailwindcss()],
  },
  build: {
    assets: "_astro",
  },
});
