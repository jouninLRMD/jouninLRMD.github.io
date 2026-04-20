/* main.js — Personal site behaviour.
 *
 * Modularized into small init() functions so each concern is independent and
 * a failure in one (e.g. the publications fetch) cannot break the rest.
 */

(() => {
    "use strict";

    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

    // --- Year in footer ---------------------------------------------------
    const yearEl = $("#year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    // --- Theme toggle -----------------------------------------------------
    function initTheme() {
        const stored = localStorage.getItem("color-theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const shouldBeDark = stored === "dark" || (!stored && prefersDark);
        document.documentElement.classList.toggle("dark", shouldBeDark);

        const toggle = () => {
            const nowDark = !document.documentElement.classList.contains("dark");
            document.documentElement.classList.toggle("dark", nowDark);
            localStorage.setItem("color-theme", nowDark ? "dark" : "light");
        };
        $("#theme-toggle")?.addEventListener("click", toggle);
        $("#theme-toggle-mobile")?.addEventListener("click", toggle);
    }

    // --- Mobile menu ------------------------------------------------------
    function initMobileMenu() {
        const btn = $("#mobile-menu-button");
        const menu = $("#mobile-menu");
        if (!btn || !menu) return;
        btn.addEventListener("click", () => menu.classList.toggle("hidden"));
        $$("a", menu).forEach((a) =>
            a.addEventListener("click", () => menu.classList.add("hidden")),
        );
    }

    // --- Sticky navbar polish --------------------------------------------
    function initNavbar() {
        const nav = $("#navbar");
        if (!nav) return;
        const onScroll = () => {
            const scrolled = window.scrollY > 50;
            nav.classList.toggle("shadow-md", scrolled);
            nav.classList.toggle("bg-white/90", scrolled);
            nav.classList.toggle("dark:bg-darkCard/90", scrolled);
            nav.classList.toggle("backdrop-blur-sm", scrolled);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
    }

    // --- Scroll reveal ----------------------------------------------------
    function initFadeIn(roots) {
        const nodes = Array.isArray(roots) ? roots : $$(".fade-in");
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("appear");
                        obs.unobserve(e.target);
                    }
                });
            },
            { threshold: 0, rootMargin: "0px 0px -80px 0px" },
        );
        nodes.forEach((n) => observer.observe(n));
    }

    // --- ScrollSpy --------------------------------------------------------
    function initScrollSpy() {
        const sections = $$("section, header");
        const links = $$(".nav-link");
        if (!sections.length || !links.length) return;
        const onScroll = () => {
            let current = "";
            for (const s of sections) {
                if (window.pageYOffset >= s.offsetTop - 200) current = s.id;
            }
            links.forEach((l) =>
                l.classList.toggle(
                    "active",
                    l.getAttribute("href") === `#${current}`,
                ),
            );
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
    }

    // --- Publications (dynamic) ------------------------------------------
    const escapeHTML = (s) =>
        String(s ?? "").replace(/[&<>"']/g, (c) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
        })[c]);

    const AUTHOR_BOLD_RE =
        /(L\.\s*R\.\s*Mercado[\-\s]?D[ií]az|Luis\s+R\.?\s*Mercado[\-\s]?D[ií]az)/gi;

    function highlightAuthor(authors) {
        return escapeHTML(authors).replace(
            AUTHOR_BOLD_RE,
            '<span class="font-semibold text-slate-800 dark:text-slate-200">$1</span>',
        );
    }

    function renderPublication(p) {
        const roleClass = p.role === "first"
            ? "border-primary"
            : "border-slate-300 dark:border-slate-600";
        const roleBadge = p.role === "first"
            ? '<span class="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded-full bg-primary/10 text-primary mr-2">First / Co-First</span>'
            : '<span class="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 mr-2">Co-Author</span>';
        const doiLink = p.doi
            ? `<a href="${escapeHTML(p.url || `https://doi.org/${p.doi}`)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-sm text-primary hover:text-secondary hover:underline">
                   <i class="fas fa-external-link-alt mr-1 text-xs"></i> DOI: ${escapeHTML(p.doi)}
               </a>`
            : p.url
            ? `<a href="${escapeHTML(p.url)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-sm text-primary hover:text-secondary hover:underline">
                   <i class="fas fa-external-link-alt mr-1 text-xs"></i> Link
               </a>`
            : "";
        const year = p.year ? `<span class="inline-block px-2 py-0.5 text-[10px] font-bold rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 mr-2">${escapeHTML(p.year)}</span>` : "";

        return `<article class="pub-item ${p.role === "first" ? "first" : "co"} p-6 bg-white dark:bg-darkCard rounded-lg shadow-sm border-l-4 ${roleClass} hover:shadow-md transition-shadow">
            <div class="mb-2">${year}${roleBadge}</div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug">${escapeHTML(p.title)}</h3>
            <p class="text-slate-600 dark:text-slate-400 text-sm mb-2">${highlightAuthor(p.authors || "")}</p>
            <p class="text-sm italic text-slate-500 dark:text-slate-500 mb-3">${escapeHTML(p.details || p.venue || "")}</p>
            ${doiLink}
        </article>`;
    }

    function renderEmpty(container) {
        container.innerHTML = "";
        const empty = $("#publications-empty");
        if (empty) empty.classList.remove("hidden");
    }

    function renderList(container, pubs) {
        if (!pubs.length) {
            renderEmpty(container);
            return;
        }
        container.innerHTML = pubs.map(renderPublication).join("");
        container.setAttribute("aria-busy", "false");
    }

    function initPublications() {
        const container = $("#publications-list");
        if (!container) return;

        let ALL = [];
        let currentFilter = "all";
        let currentQuery = "";

        const applyFilters = () => {
            const q = currentQuery.trim().toLowerCase();
            const filtered = ALL.filter((p) => {
                if (currentFilter !== "all" && p.role !== currentFilter) return false;
                if (!q) return true;
                const hay = `${p.title} ${p.authors} ${p.venue} ${p.details} ${p.doi || ""}`.toLowerCase();
                return hay.includes(q);
            });
            renderList(container, filtered);
        };

        // Filter buttons
        $$(".pub-filter").forEach((btn) => {
            btn.addEventListener("click", () => {
                $$(".pub-filter").forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");
                currentFilter = btn.dataset.filter || "all";
                applyFilters();
            });
        });

        // Search input
        const search = $("#pub-search");
        if (search) {
            search.addEventListener("input", (e) => {
                currentQuery = e.target.value || "";
                applyFilters();
            });
        }

        // Fetch JSON (cache-busted against stale caches)
        fetch(`data/publications.json?_=${Date.now()}`, { cache: "no-cache" })
            .then((r) => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json();
            })
            .then((payload) => {
                ALL = (payload.publications || []).slice().sort(
                    (a, b) => (b.year || 0) - (a.year || 0),
                );
                const updatedEl = $("#publications-updated-at");
                if (updatedEl && payload.generated_at)
                    updatedEl.textContent = payload.generated_at;
                applyFilters();
            })
            .catch((err) => {
                console.warn("Failed to load publications.json:", err);
                renderEmpty(container);
            });
    }

    // --- Carousel ---------------------------------------------------------
    function initCarousel() {
        const carouselInner = $("#carousel-inner");
        const prevBtn = $("#prevBtn");
        const nextBtn = $("#nextBtn");
        const indicators = $$(".indicator-btn");
        if (!carouselInner || !indicators.length) return;

        let current = 0;
        const total = indicators.length;
        let timer = null;

        const update = () => {
            carouselInner.style.transform = `translateX(-${current * 100}%)`;
            indicators.forEach((ind, i) => {
                ind.classList.toggle("bg-white", i === current);
                ind.classList.toggle("bg-white/50", i !== current);
            });
        };
        const go = (i) => {
            current = (i + total) % total;
            update();
        };
        const scheduleAuto = () => {
            if (timer) clearInterval(timer);
            timer = setInterval(() => go(current + 1), 6000);
        };

        prevBtn?.addEventListener("click", () => {
            go(current - 1);
            scheduleAuto();
        });
        nextBtn?.addEventListener("click", () => {
            go(current + 1);
            scheduleAuto();
        });
        indicators.forEach((ind) =>
            ind.addEventListener("click", (e) => {
                go(parseInt(e.currentTarget.dataset.index, 10));
                scheduleAuto();
            }),
        );

        // Pause on hover (respect user intent)
        const carousel = $("#carousel");
        carousel?.addEventListener("mouseenter", () => timer && clearInterval(timer));
        carousel?.addEventListener("mouseleave", scheduleAuto);

        update();
        scheduleAuto();
    }

    // --- Featured-research cards: tap-to-flip on touch devices -----------
    function initResearchCards() {
        const cards = $$(".research-card");
        if (!cards.length) return;

        // Treat touch / no-hover devices specially: a tap toggles the
        // overlay, a second tap closes it. On hover-capable devices we let
        // CSS :hover handle everything so mouse users aren't disrupted.
        const isHover = window.matchMedia("(hover: hover)").matches;
        if (isHover) return;

        cards.forEach((card) => {
            card.addEventListener("click", (e) => {
                // Don't swallow clicks on links inside the overlay.
                if (e.target.closest("a")) return;
                cards.forEach((c) => c !== card && c.classList.remove("show"));
                card.classList.toggle("show");
            });
        });

        // Close on outside tap
        document.addEventListener("click", (e) => {
            if (!e.target.closest(".research-card")) {
                cards.forEach((c) => c.classList.remove("show"));
            }
        });
    }

    // --- Bootstrap --------------------------------------------------------
    document.addEventListener("DOMContentLoaded", () => {
        initTheme();
        initMobileMenu();
        initNavbar();
        initScrollSpy();
        initPublications();
        initCarousel();
        initResearchCards();
        initFadeIn();
    });
})();
