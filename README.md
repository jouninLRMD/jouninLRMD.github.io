# jouninlrmd.github.io

Personal website of **Luis R. Mercado-Diaz** &mdash; Ph.D. in Biomedical
Engineering and M.S. in Computer Science & Engineering. Built with
**[Astro](https://astro.build)** on top of Tailwind CSS, deployed to
**GitHub Pages** via GitHub Actions, with a separate workflow that
auto-refreshes the publications list from public APIs every day.

## Architecture at a glance

```
┌────────────────────────────────────────────────────────────────────────────┐
│  Authoring                                                                 │
│    src/pages/index.astro  ──►  src/components/*.astro                      │
│                                src/layouts/BaseLayout.astro                │
│                                src/data/{site,news,gallery}.ts             │
│                                data/publications.json  (imported at build) │
└────────────────────────────────────────────────────────────────────────────┘
          │
          │  git push main
          ▼
┌────────────────────────────────────────────────────────────────────────────┐
│  GitHub Actions (.github/workflows/deploy.yml)                             │
│    npm ci  ▶  npm run build  ▶  upload-pages-artifact  ▶  deploy-pages     │
└────────────────────────────────────────────────────────────────────────────┘
          │
          ▼
   https://jouninlrmd.github.io/   (static HTML + near-zero JS)

┌────────────────────────────────────────────────────────────────────────────┐
│  Publications refresh (.github/workflows/update-publications.yml)          │
│    cron daily ─► python scripts/update_publications.py                     │
│                   ▶ OpenAlex (by ORCID) + CrossRef fallback                │
│                   ▶ drops preprints, re-validates authors                  │
│                   ▶ writes data/publications.json                          │
│                   ▶ auto-commits & pushes (triggers a rebuild)             │
└────────────────────────────────────────────────────────────────────────────┘
```

## Directory layout

```
.
├── src/
│   ├── pages/index.astro       # Main page composition
│   ├── layouts/BaseLayout.astro
│   ├── components/             # Section components
│   │   ├── Navbar.astro
│   │   ├── Hero.astro
│   │   ├── Projects.astro
│   │   ├── Publications.astro  # Hydrates data/publications.json at build
│   │   ├── Experience.astro
│   │   ├── Skills.astro
│   │   ├── FeaturedResearch.astro   # SVG graphical abstracts + hover overlays
│   │   ├── News.astro
│   │   ├── Gallery.astro
│   │   └── Footer.astro
│   ├── data/                   # TS-typed content
│   │   ├── site.ts
│   │   ├── news.ts
│   │   └── gallery.ts
│   └── styles/global.css       # Tailwind + custom rules
├── public/                     # Passed through untouched (images, PDFs, .well-known)
│   ├── images/
│   ├── assets/
│   ├── robots.txt
│   ├── .well-known/security.txt
│   └── .nojekyll
├── data/
│   ├── publications.json       # Auto-refreshed; imported by Publications.astro
│   └── config.json             # ORCID, author name variants, fetch knobs
├── scripts/update_publications.py    # stdlib-only fetcher
├── .github/workflows/
│   ├── deploy.yml                    # Astro build + deploy to GitHub Pages
│   └── update-publications.yml       # Daily cron + manual dispatch
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
├── tsconfig.json
└── .nojekyll + .gitignore
```

## Local development

```bash
npm install            # one-time
npm run dev            # http://localhost:4321
npm run build          # -> dist/
npm run preview        # serve built site
```

## GitHub Pages setup (one-time)

In the repo settings, set **Pages → Build and deployment → Source** to
**GitHub Actions**. This project's deploy workflow (above) will then be
the source of truth; pushing to `main` triggers a build and deploy.

## Auto-updating publications

`scripts/update_publications.py` runs daily (`05:17 UTC`) and whenever
`data/config.json` or the script itself changes:

1. Reads `data/config.json` for the author's ORCID and name variants.
2. Queries **OpenAlex** by ORCID (deterministic). Falls back to
   **CrossRef** on failure.
3. Applies a strict author matcher (surname must be "Mercado Diaz" /
   "Mercado-Diaz", given name must start with "Luis" / "L") and drops
   preprints.
4. Merges with any manual curation already in `data/publications.json`
   and re-validates existing entries so homonyms cannot sneak back in.
5. Writes the file and auto-commits. The commit triggers the Astro
   deploy workflow, which rebuilds and redeploys with the new data.

### Set your ORCID

`data/config.json → author.orcid = "0000-0003-3543-3677"` is already in
place. If you ever want a different identifier, swap it there.

## Security & privacy posture

- **Content Security Policy** tightens to self-hosted scripts, self-hosted
  Inter fonts, and a single FontAwesome CDN asset pinned with
  Subresource Integrity.
- **No Google Fonts / no Tailwind CDN** — both are bundled at build time.
- `rel="noopener noreferrer"` on every external `target="_blank"` link.
- `robots.txt` opts out of GPTBot, ClaudeBot, CCBot, Google-Extended,
  PerplexityBot, etc. by default.
- `.well-known/security.txt` publishes a responsible-disclosure contact.
- GitHub Actions run with least-privilege scopes (`contents: write` only
  on the publications refresher; `pages: write` only on deploy).
