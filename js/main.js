/* ==========================================================================
   SOFTWARE ENGINEER PORTFOLIO — SCRIPT
   ==========================================================================
   Small, dependency-free enhancements:
     - Mobile navigation toggle
     - Header shadow on scroll
     - Active nav link while scrolling (scroll-spy)
     - Footer year
     - Contact form (mailto fallback when no backend is configured)

   Note: this file intentionally does NOT animate sections/cards as they
   scroll into view. The only motion on this site is a single entrance
   animation on the hero (handled in CSS), by design.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initHeaderScrollShadow();
  initScrollSpy();
  initFooterYear();
  initContactForm();
});

/**
 * Toggles the mobile navigation menu and keeps it in sync with
 * aria-expanded, Escape-to-close, click-outside-to-close, and
 * closing automatically when a link is chosen.
 */
function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("primary-menu");
  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove("is-open");
    toggle.classList.remove("is-active");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.classList.toggle("is-active", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (!menu.classList.contains("is-open")) return;
    const clickedInsideMenu = menu.contains(event.target);
    const clickedToggle = toggle.contains(event.target);
    if (!clickedInsideMenu && !clickedToggle) closeMenu();
  });
}

/**
 * Adds a subtle shadow/border to the sticky header once the page
 * has scrolled, so it reads as separated from the content beneath it.
 */
function initHeaderScrollShadow() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

/**
 * Highlights the nav link matching whichever section is currently
 * most in view, using an IntersectionObserver "band" near the
 * vertical center of the viewport.
 */
function initScrollSpy() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  if (!sections.length || !navLinks.length || !("IntersectionObserver" in window)) return;

  const linkForId = new Map();
  navLinks.forEach((link) => {
    const id = link.getAttribute("href")?.replace("#", "");
    if (id) linkForId.set(id, link);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const activeLink = linkForId.get(entry.target.id);
        if (!activeLink) return;
        navLinks.forEach((link) => link.classList.remove("active"));
        activeLink.classList.add("active");
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/** Keeps the footer copyright year current without manual edits. */
function initFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

/**
 * GitHub Pages has no backend, so this form works out of the box by
 * opening the visitor's email client with their message pre-filled.
 * The recipient address is read from the form's data-recipient
 * attribute, so it only needs to be updated in one place (index.html).
 *
 * To collect submissions directly instead (recommended for a real
 * deployment), point the form's `action` at a service like Formspree
 * — see README.md. Once `action` is a real endpoint, this script gets
 * out of the way and lets the form submit normally.
 */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    const action = form.getAttribute("action") || "";
    const usingPlaceholderBackend = action.trim() === "" || action.trim() === "#";
    if (!usingPlaceholderBackend) return; // real form backend configured — let it submit normally

    event.preventDefault();

    const name = form.elements.namedItem("name")?.value.trim() || "";
    const email = form.elements.namedItem("email")?.value.trim() || "";
    const message = form.elements.namedItem("message")?.value.trim() || "";

    if (!name || !email || !message) {
      setStatus(status, "Please fill in every field before sending.");
      return;
    }

    const recipient = form.dataset.recipient || "[email protected]";
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n—\n${name}\n${email}`);

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    setStatus(status, "Opening your email app with your message pre-filled…");
  });
}

function setStatus(statusEl, message) {
  if (statusEl) statusEl.textContent = message;
}
