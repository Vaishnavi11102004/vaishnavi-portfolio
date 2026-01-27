/* eslint-disable no-console */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// Inline icon masks (tiny SVGs)
const ICONS = {
  menu:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M4 6h16v2H4V6Zm0 5h16v2H4v-2Zm0 5h16v2H4v-2Z'/%3E%3C/svg%3E",
  sun:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M12 18a6 6 0 1 0 0-12a6 6 0 0 0 0 12Zm0-16h1v3h-2V2h1Zm0 17h1v3h-2v-3h1ZM2 11h3v2H2v-2Zm17 0h3v2h-3v-2ZM4.22 5.64 6.34 3.52l1.42 1.42L5.64 7.06 4.22 5.64Zm12.02 12.02 2.12-2.12 1.42 1.42-2.12 2.12-1.42-1.42ZM18.36 4.94l1.42-1.42 2.12 2.12-1.42 1.42-2.12-2.12ZM3.52 18.36l1.42-1.42 2.12 2.12-1.42 1.42-2.12-2.12Z'/%3E%3C/svg%3E",
  download:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M12 3h2v8l2.5-2.5 1.4 1.4L13 15.8 7.1 9.9l1.4-1.4L11 11V3h1ZM5 19h14v2H5v-2Z'/%3E%3C/svg%3E",
  spark:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M12 2l1.2 5.4L19 8.6l-4.8 2.5L12 16l-2.2-4.9L5 8.6l5.8-1.2L12 2Zm7 10l.8 3.2L23 16l-3.2.8L19 20l-.8-3.2L15 16l3.2-.8L19 12ZM2 12l.7 2.7L5.4 15l-2.7.7L2 18.4l-.7-2.7L-1.4 15l2.7-.3L2 12Z'/%3E%3C/svg%3E",
  grid:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M3 3h8v8H3V3Zm10 0h8v8h-8V3ZM3 13h8v8H3v-8Zm10 0h8v8h-8v-8Z'/%3E%3C/svg%3E",
  send:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M2 21 23 12 2 3v7l15 2-15 2v7Z'/%3E%3C/svg%3E",
  close:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3 1.4 1.4Z'/%3E%3C/svg%3E",
  chevLeft:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='m15.4 7.4-1.4-1.4L7 13l7 7 1.4-1.4L9.8 13l5.6-5.6Z'/%3E%3C/svg%3E",
  chevRight:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='m8.6 16.6 1.4 1.4 7-7-7-7-1.4 1.4L14.2 12l-5.6 4.6Z'/%3E%3C/svg%3E",
};

function applyIconMasks() {
  const map = [
    ["icon--menu", ICONS.menu],
    ["icon--sun", ICONS.sun],
    ["icon--download", ICONS.download],
    ["icon--spark", ICONS.spark],
    ["icon--grid", ICONS.grid],
    ["icon--send", ICONS.send],
    ["icon--close", ICONS.close],
    ["icon--chev-left", ICONS.chevLeft],
    ["icon--chev-right", ICONS.chevRight],
  ];
  for (const [cls, url] of map) {
    for (const el of $$(`.${cls}`)) {
      el.style.webkitMaskImage = `url("${url}")`;
      el.style.maskImage = `url("${url}")`;
    }
  }
}

function initHeroReveals() {
  for (const el of $$(".reveal")) {
    const d = Number(el.getAttribute("data-reveal-delay") ?? 0);
    el.style.setProperty("--delay", `${d}ms`);
  }
}

function initTheme() {
  const root = document.documentElement;
  const btn = $("[data-theme-toggle]");
  const label = $("[data-theme-label]");

  const saved = localStorage.getItem("theme");
  const preferLight =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  const initial = saved ?? (preferLight ? "light" : "dark");

  function setTheme(next) {
    if (next === "light") root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");
    localStorage.setItem("theme", next);
    label.textContent = next === "light" ? "Light" : "Dark";
  }

  setTheme(initial);

  btn?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
    setTheme(current === "light" ? "dark" : "light");
  });
}

function initMobileNav() {
  const toggle = $("[data-nav-toggle]");
  const panel = $("[data-nav-panel]");
  const links = $$("[data-nav-link]");

  function close() {
    panel?.removeAttribute("data-open");
    toggle?.setAttribute("aria-label", "Open menu");
  }

  toggle?.addEventListener("click", () => {
    const open = panel?.getAttribute("data-open") === "true";
    if (open) close();
    else {
      panel?.setAttribute("data-open", "true");
      toggle?.setAttribute("aria-label", "Close menu");
    }
  });

  for (const link of links) link.addEventListener("click", close);

  document.addEventListener("click", (e) => {
    if (!panel || !toggle) return;
    const target = e.target;
    if (!(target instanceof Element)) return;
    if (panel.contains(target) || toggle.contains(target)) return;
    close();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) close();
  });
}

function initScrollAnimations() {
  const els = $$("[data-animate]");
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12 }
  );
  for (const el of els) io.observe(el);
}

function initActiveNav() {
  const links = $$("[data-nav-link]");
  const sections = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const byId = new Map();
  for (const a of links) {
    const href = a.getAttribute("href") ?? "";
    if (href.startsWith("#")) byId.set(href.slice(1), a);
  }

  function clearCurrent() {
    for (const a of links) a.removeAttribute("aria-current");
  }

  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting);
      if (!visible.length) return;
      visible.sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
      const id = visible[0].target.id;
      const a = byId.get(id);
      if (!a) return;
      clearCurrent();
      a.setAttribute("aria-current", "page");
    },
    {
      rootMargin: "-40% 0px -55% 0px",
      threshold: [0.12, 0.25, 0.4],
    }
  );

  for (const s of sections) io.observe(s);
}

function initFooterYear() {
  const y = $("[data-year]");
  if (y) y.textContent = String(new Date().getFullYear());
}

// Gallery + Lightbox
const GALLERY_ITEMS = [
  { title: "Hobby: Photography", tag: "Hover zoom", src: "https://picsum.photos/id/1011/900/1100" },
  { title: "Inspiration: Architecture", tag: "Masonry", src: "https://picsum.photos/id/1015/900/700" },
  { title: "Achievement: UI Study", tag: "Lightbox", src: "https://picsum.photos/id/1031/900/1000" },
  { title: "Hobby: Travel", tag: "Keyboard nav", src: "https://picsum.photos/id/1003/900/800" },
  { title: "Inspiration: Nature", tag: "Smooth", src: "https://picsum.photos/id/1025/900/1200" },
  { title: "Achievement: Project", tag: "Responsive", src: "https://picsum.photos/id/1040/900/900" },
  { title: "Hobby: Music", tag: "Micro-interactions", src: "https://picsum.photos/id/1050/900/950" },
  { title: "Inspiration: Colors", tag: "Clean UI", src: "https://picsum.photos/id/1060/900/780" },
  { title: "Achievement: Build", tag: "Portfolio", src: "https://picsum.photos/id/1074/900/1060" },
];

function initGallery() {
  const root = $("[data-gallery]");
  if (!root) return;

  root.innerHTML = GALLERY_ITEMS.map(
    (it, idx) => `
      <article class="gallery__item" role="button" tabindex="0" data-gallery-item data-idx="${idx}" aria-label="Open image: ${escapeHtml(
      it.title
    )}">
        <img class="gallery__img" src="${it.src}" alt="${escapeAttr(it.title)}" loading="lazy" />
        <div class="gallery__cap">
          <p>${escapeHtml(it.title)}</p>
          <span>${escapeHtml(it.tag)}</span>
        </div>
      </article>
    `
  ).join("");
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
function escapeAttr(s) {
  return escapeHtml(s);
}

function initLightbox() {
  const wrap = $("[data-lightbox]");
  const img = $("[data-lightbox-img]");
  const cap = $("[data-lightbox-caption]");
  const closeBtns = $$("[data-lightbox-close]");
  const prevBtn = $("[data-lightbox-prev]");
  const nextBtn = $("[data-lightbox-next]");

  if (!wrap || !img || !cap) return;

  let index = 0;
  let lastFocus = null;

  function openAt(i) {
    index = clamp(i, 0, GALLERY_ITEMS.length - 1);
    const item = GALLERY_ITEMS[index];
    img.src = item.src;
    img.alt = item.title;
    cap.textContent = `${item.title} • ${item.tag}`;
    wrap.setAttribute("data-open", "true");
    wrap.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lastFocus = document.activeElement;
    prevBtn?.focus();
  }

  function close() {
    wrap.removeAttribute("data-open");
    wrap.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus instanceof HTMLElement) lastFocus.focus();
  }

  function prev() {
    openAt((index - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  }
  function next() {
    openAt((index + 1) % GALLERY_ITEMS.length);
  }

  for (const b of closeBtns) b.addEventListener("click", close);
  prevBtn?.addEventListener("click", prev);
  nextBtn?.addEventListener("click", next);

  document.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    const item = t.closest("[data-gallery-item]");
    if (!item) return;
    const i = Number(item.getAttribute("data-idx") ?? 0);
    openAt(i);
  });

  document.addEventListener("keydown", (e) => {
    const open = wrap.getAttribute("data-open") === "true";
    if (!open) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });

  document.addEventListener("keydown", (e) => {
    const item = document.activeElement?.closest?.("[data-gallery-item]");
    if (!item) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const i = Number(item.getAttribute("data-idx") ?? 0);
      openAt(i);
    }
  });
}

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function initContactForm() {
  const form = $("[data-contact-form]");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    const subject = encodeURIComponent(`Portfolio message from ${name || "Someone"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    // Replace the email with yours
    window.location.href = `mailto:your.email@example.com?subject=${subject}&body=${body}`;
  });
}

applyIconMasks();
initHeroReveals();
initTheme();
initMobileNav();
initScrollAnimations();
initActiveNav();
initFooterYear();
initGallery();
initLightbox();
initContactForm();

