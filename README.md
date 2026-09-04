# Software Engineer Portfolio

A clean, professional portfolio website template built with plain HTML, CSS, and JavaScript — no framework, no build step, ready to deploy on GitHub Pages in a few minutes.

It includes Hero, About, Skills, Projects, Experience, Education, and Contact sections, a responsive layout that works from mobile to desktop, and accessible, restrained styling (no flashy animations, no gimmicks).

Everything in the site is placeholder content for a fictional "Alex Morgan." Replace it with your own details using the guide below.

## Tech stack

- **HTML5** — semantic markup
- **CSS3** — custom properties for theming, Grid/Flexbox layout, no preprocessor or framework
- **Vanilla JavaScript** — mobile nav, scroll-spy, contact form; no dependencies, no build tools
- **Google Fonts** — Fraunces, IBM Plex Sans, IBM Plex Mono

Because there's no build step, you can edit the files directly and refresh your browser to see changes.

## Project structure

```
portfolio/
├── index.html            All page content and structure
├── css/
│   └── styles.css        All styling (design tokens at the top)
├── js/
│   └── main.js            Nav, scroll-spy, contact form behavior
├── assets/
│   └── favicon.svg       Site icon (and where your resume PDF goes)
├── .nojekyll              Tells GitHub Pages to skip Jekyll processing
├── .gitignore
└── README.md
```

## Preview it locally

You can just open `index.html` directly in a browser — everything works without a server. For the closest match to how it'll behave once deployed (and to avoid any browser quirks with local file paths), you can optionally serve it with a lightweight local server instead:

```bash
# Option A — Python (usually preinstalled on macOS/Linux)
python3 -m http.server 8000

# Option B — Node
npx serve .
```

Then visit `http://localhost:8000` (or whatever port is shown).

---

## Customization guide

Every placeholder is marked with a `TODO` comment in `index.html` — searching for `TODO` will walk you through everything below in order.

### 1. Personal info & hero

In `index.html`, inside `<section class="hero" id="hero">`:
- Replace `Alex Morgan` (also in the `<title>` tag and the nav `.brand-name`)
- Replace `Full-Stack Software Engineer` with your title
- Rewrite the `.hero-summary` paragraph (keep it to 2–3 lines)
- Edit or delete the "Open to new opportunities" status line — swap it for something like "Currently at Acme Inc." if you're not job-hunting, or remove the whole `<p class="hero-eyebrow">` block

### 2. Social links & resume

Your GitHub, LinkedIn, and email appear in **four places**: the hero buttons, the Contact section, the footer, and the nav "Resume" button. The simplest approach is a find-and-replace across `index.html`:

| Placeholder | Replace with |
|---|---|
| `https://github.com/yourusername` | your GitHub profile URL |
| `https://www.linkedin.com/in/yourusername/` | your LinkedIn profile URL |
| `[email protected]` | your email address |

**Add your resume:** export it as a PDF, name it `resume.pdf`, and place it in the `assets/` folder (i.e. `assets/resume.pdf`). The "Resume" buttons already link there — no HTML changes needed once the file exists.

### 3. About section

Edit the two paragraphs inside `<div class="about-bio">` with your own background and interests. The four "values" (Clean Code, Scalable Systems, Collaboration, Continuous Learning) can be renamed, reworded, reordered, or replaced — each is a `.value` block with an icon, a heading, and a one-line description.

### 4. Skills

Each category in `<section id="skills">` is a `.skills-row` — a heading plus a `<ul class="tag-list">`. Add, remove, or rename `<li class="tag">` entries freely; there's no limit on how many tags a row holds. To add a whole new category, copy an existing `.skills-row` block (icons available in the sprite at the top of `<body>`: `icon-code`, `icon-monitor`, `icon-server`, `icon-database`, `icon-terminal`, `icon-cloud`).

### 5. Projects

Each project is a `.project-card` inside `<div class="projects-grid">`. To add or remove a project, copy or delete an entire `<article class="project-card">…</article>` block — the grid adapts automatically. The template currently has 4; 3–6 is a good range.

- The `<span class="featured-tag">Featured</span>` line is optional — keep it only on your strongest project, or remove it from all of them.
- If a project has no live demo, just omit the second `<a>` inside `.project-links` (the DevLink example in the template shows this).

### 6. Experience

Each role is a `<li class="timeline-item">` inside `<ol class="timeline">`. Copy the block to add another role (internship, job, freelance, or a major academic project all work). Keep entries in reverse-chronological order (most recent first) so the timeline reads correctly.

### 7. Education

Edit the single `.education-block`: degree, institution, dates, honors, coursework tags, and the certifications list (`.cert-list`). Add or remove `<li>` entries in either list as needed.

### 8. Contact form

The form works immediately with **no setup**: it opens the visitor's email client with their message pre-filled, because GitHub Pages can't run server-side code to receive form submissions directly.

If you'd rather collect submissions directly (recommended for real use), connect a free form backend:

1. Sign up at [formspree.io](https://formspree.io) (or a similar service like Getform or Web3Forms) and create a form to get an endpoint URL.
2. In `index.html`, find `<form class="contact-form" id="contact-form" action="#" ...>` and replace `action="#"` with your endpoint, e.g. `action="https://formspree.io/f/your-form-id"`.
3. That's it — `js/main.js` automatically detects that a real `action` is set and steps aside, letting the form submit normally.

### 9. Colors & fonts

All design tokens live at the top of `css/styles.css` under `:root`. Changing a value there updates it everywhere:

```css
--navy: #0b1b33;      /* primary dark background */
--teal: #0f766e;      /* the one accent color — buttons, links, highlights */
--charcoal: #2a3142;  /* body text */
```

To change fonts, swap the Google Fonts `<link>` in the `<head>` of `index.html` and update the matching `--font-display` / `--font-body` / `--font-mono` variables in `styles.css`.

### 10. Favicon

`assets/favicon.svg` is a small generic monogram that matches the site's palette — replace it with your own mark, or delete the `<link rel="icon">` tag in `index.html` if you'd rather use none.

---

## Deploying to GitHub Pages

1. **Create a repository.** On GitHub, create a new repo. If you want the site at `https://yourusername.github.io` (no extra path), name the repo exactly `yourusername.github.io`. Any other name works too — it'll be served at `https://yourusername.github.io/repo-name/`.

2. **Push your code.** From inside the `portfolio` folder:

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

3. **Enable Pages.** In your repository on GitHub, go to **Settings → Pages**. Under "Build and deployment," set **Source** to "Deploy from a branch," pick the **`main`** branch and the **`/ (root)`** folder, then save.

4. **Wait a minute, then visit your site.** GitHub will show a link once it's live — usually `https://yourusername.github.io/your-repo-name/`.

5. **(Optional) Custom domain.** In the same Pages settings, add your domain under "Custom domain" — GitHub will create a `CNAME` file in your repo automatically. Then add the DNS records GitHub shows you (typically an `A` record to GitHub's IPs, or a `CNAME` record if using a subdomain) at your domain registrar.

Any time you push a new commit to `main`, GitHub Pages redeploys automatically — there's nothing else to run.

## Accessibility & browser support

- Semantic landmarks (`header`, `nav`, `main`, `footer`), a "skip to content" link, and a logical heading order
- Visible keyboard focus states throughout
- Color combinations were chosen to meet WCAG AA contrast for text
- Motion is minimal by design, and everything respects `prefers-reduced-motion`
- Works in all modern evergreen browsers (Chrome, Firefox, Safari, Edge)

## License

No license is included by default, so all rights are reserved to you as-is. If you'd like to open-source your fork, consider adding an MIT `LICENSE` file.

## Credits

Fonts via [Google Fonts](https://fonts.google.com): [Fraunces](https://fonts.google.com/specimen/Fraunces), [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans), and [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono). Icons are hand-built inline SVG — no icon library dependency.
