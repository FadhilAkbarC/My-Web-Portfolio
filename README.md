# My Web Portfolio — Futuristic Template

A modern, professional, futuristic portfolio template for a personal website. Designed to be lightweight, accessible, and visually striking with neon/glass aesthetics.

## What is included

- `index.html` — main page structure and sections (hero, about, projects, skills, contact).
- `styles.css` — theme styles (dark, glass, neon accent).
- `script.js` — canvas particle background, theme toggle, smooth scrolling helpers.
- `assets/` — folder for images, resume, and project screenshots (place your files here).

## Getting started

1. Clone the repository:
   ```bash
   git clone https://github.com/FadhilAkbarC/My-Web-Portfolio.git
   cd My-Web-Portfolio
   ```

2. Add your assets:
   - `assets/me.jpg` — your headshot
   - `assets/resume.pdf` — resume file (linked as Resume)
   - `assets/project-1.jpg`, `assets/project-2.jpg`, etc. — project thumbnails

3. Open `index.html` locally or serve with a static server:
   ```bash
   npx http-server   # or `python -m http.server`
   ```

4. Customize:
   - Edit the hero copy, projects, links, and contact email in `index.html`.
   - Tweak colors and layout in `styles.css`.
   - Extend the `script.js` for custom interactions (e.g., live data, analytics).

## Accessibility & performance

- Uses semantic HTML and focusable skip link.
- Respects `prefers-reduced-motion`.
- Lightweight canvas background with fallback visuals.
- Keep images optimized (WebP/optimized JPG) for best performance.

## Deployment (GitHub Pages)

1. Push your changes to GitHub.
2. In your repository settings -> Pages, set the source to the `main` branch (or `gh-pages` if you prefer a branch).
3. Visit `https://<your-username>.github.io/My-Web-Portfolio/`.

## Next steps & ideas

- Integrate a CMS (Netlify CMS / Contentful) for editable projects.
- Add a light-weight animation library or WebGL micro-interactions.
- Add analytics and privacy notice.
- Add tests and CI for linting / formatting.

---

If you want, I can:
- Commit these files directly into `FadhilAkbarC/My-Web-Portfolio` on a new branch.
- Add a simple GitHub Actions workflow to preview the site.
- Convert this to a Next.js starter with SSR and deployment steps.

Tell me which one you want me to do next.
