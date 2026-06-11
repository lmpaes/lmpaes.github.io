# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is Leonardo Paes' personal portfolio website, served via GitHub Pages (repo `lmpaes.github.io`). It is a static, single-page site: plain HTML, CSS, and vanilla JavaScript. There is no build step, package manager, bundler, or test suite. All visible content is in Brazilian Portuguese.

## Development commands

- **Preview locally**: open `index.html` directly in a browser, or serve the folder with a static server (e.g. the VS Code "Live Server" extension, configured in `.vscode/settings.json`) so relative paths to `css/`, `js/` and `Imagens/` resolve correctly.
- **Deploy**: pushing to the `main` branch publishes directly to GitHub Pages — there is no build/CI step.
- No lint, test, or build commands exist for this project.

## Architecture

### Single-page layout
Everything lives in one `index.html`. There is no multi-page structure, shared layout, or templating engine — content is organized into anchor-linked sections (`#sobre`, `#experiencia`, `#habilidades`, `#projetos`, `#formacao`, `#contato`). The fixed navbar smooth-scrolls between sections and a JS scrollspy highlights the active link as the user scrolls.

### Sections (in order)
- **Navbar** — fixed, logo "LP.", anchor links to each section, a "Currículo" download button, and a hamburger menu on mobile (`< 768px`).
- **Hero** — name, headline, short pitch, CTAs to `#projetos`/`#contato`, and certification badges. Content is wrapped in `.hero-inner`/`.hero-content` so it aligns with the same centered container as the other sections; `.hero-glow` is the decorative radial gradient anchored to the top-right of `.hero-content`.
- `#sobre` — bio text + 3 `.highlight-card` items (pós-graduação, foco em IA, stack principal).
- `#experiencia` — 5 `.exp-item` blocks (one per professional experience), each with period/company/role/description.
- `#habilidades` — `.skills-grid` of `.skill-item` cards using Devicon icons (`-plain`/`-original` classes), colored via `.ic-*` CSS classes (Devicon webfont icons respect `currentColor`).
- `#projetos` — 2 `.project-card-featured` cards (with screenshot placeholders) + a `.projects-grid` of `.project-card-mini` cards linking to GitHub/Figma.
- `#formacao` — `.certs-grid` of `.cert-card` items; cards with a verification link are `<a>` elements, others are `<div>`.
- `#contato` — `.contact-link-item` entries (LinkedIn, GitHub, WhatsApp, e-mail, location) + a `.contact-form` wired to EmailJS.
- **Footer** — logo, anchor links, copyright.
- **Scroll-to-top button** (`#scrollTop`) — fixed, shown after scrolling past 300px.

### Shared assets
- `css/style.css` — single global stylesheet. Design tokens for the Grafite + Verde Esmeralda palette (`--bg-primary`, `--bg-alt`, `--bg-footer`, `--accent`, `--text-*`, `--border`, etc.) live in `:root`. Mobile-first, with breakpoints at `768px` and `1024px`. Also defines the bidirectional reveal animation (`.reveal` / `.reveal-visible`), the click-ripple effect (`.click-ripple` + `@keyframes ripple-expand`), the navbar `.scrolled` state, and `prefers-reduced-motion` overrides.
- `js/script.js` — all page behavior:
  - Mobile menu toggle (hamburger ↔ `.nav-links` drawer, closes on link click).
  - Navbar scroll shadow (`.scrolled`) and scroll-to-top button visibility, both driven by a single `scroll` listener.
  - Scrollspy via `IntersectionObserver` on each `<section id="...">`, toggling `.active` on the matching `.nav-links a`.
  - Bidirectional scroll-reveal via `IntersectionObserver` on every `.reveal` element — toggles `.reveal-visible` on both enter and exit (no `unobserve`); skipped entirely when `prefers-reduced-motion` is set.
  - Global click-ripple effect (skipped under `prefers-reduced-motion`).
  - Contact form submit handler using the EmailJS browser SDK (`emailjs.sendForm`), with success/error feedback in `#formStatus`.
- `Imagens/Logo.png` — site favicon. The remaining files in `Imagens/` are leftovers from the previous multi-page design and are currently unused.

### External CDNs
Loaded in `<head>` / end of `<body>` in `index.html`:
- Google Fonts — Inter (400/500/600/700)
- Devicon (`devicon.min.css`) — technology icons in `#habilidades`
- Tabler Icons webfont (`tabler-icons.min.css`) — UI icons (`ti ti-*`) used throughout
- EmailJS browser SDK (`@emailjs/browser`) — contact form

### Outstanding placeholders
Marked with `<!-- TODO -->` comments in `index.html` (and one in `js/script.js`):
- `assets/curriculo-leonardo-paes.pdf` — CV file referenced by the navbar "Currículo" button (the `assets/` folder doesn't exist yet).
- FraudWatch project card — screenshot (`assets/fraudwatch.png`) and real project link (currently `href="#"`).
- Raízes do Nordeste project card — screenshot (`assets/raizes.png`).
- "Claude Code in Action" certificate — verification link (currently `href="#"`).
- `js/script.js` EmailJS config — `YOUR_PUBLIC_KEY`, `YOUR_SERVICE_ID`, `YOUR_TEMPLATE_ID` need real values.

### Conventions to follow when adding content
- Keep all visible text in Portuguese, matching the tone/style of existing copy.
- New skills go in `#habilidades` as a `.skill-item` using a Devicon icon class plus an `.ic-*` color class (add a new `.ic-*` color in `css/style.css` if none of the existing tones fit).
- New projects go in `#projetos` as either a `.project-card-featured` (screenshot + tags + link) or a `.project-card-mini` (title + tags + link) inside `.projects-grid`.
- New certificates go in `#formacao` as a `.cert-card` (`<a>` if there's a verification link, `<div>` otherwise) using the matching `.cert-issuer-badge` class (`cert-ms`, `cert-ant`, `cert-udemy`, `cert-uninter`, or a new one).
- Any new animatable element should get `class="reveal"` to participate in the bidirectional scroll-reveal.
