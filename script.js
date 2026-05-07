/* RESET – script.js */

// ---- SVG Icons ----
const ICON_SUN  = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/></svg>`;
const ICON_MOON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

// ---- Theme Toggle ----
const STORAGE_KEY = 'reset-theme';

function getPreferred() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY, theme);

  const isDark = theme === 'dark';

  // Desktop toggle: show sun (→ go light) in dark mode, moon (→ go dark) in light mode
  const desktopBtn = document.getElementById('theme-toggle');
  if (desktopBtn) {
    desktopBtn.innerHTML    = isDark ? ICON_SUN : ICON_MOON;
    desktopBtn.title        = isDark ? 'Zum hellen Design wechseln' : 'Zum dunklen Design wechseln';
    desktopBtn.setAttribute('aria-label', desktopBtn.title);
  }

  // Mobile toggle: icon + label text
  const mobileBtn = document.getElementById('theme-toggle-mobile');
  if (mobileBtn) {
    mobileBtn.innerHTML     = (isDark ? ICON_SUN : ICON_MOON) + `<span>${isDark ? 'Helles Design' : 'Dunkles Design'}</span>`;
    mobileBtn.title         = isDark ? 'Zum hellen Design wechseln' : 'Zum dunklen Design wechseln';
    mobileBtn.setAttribute('aria-label', mobileBtn.title);
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

// ---- Copyright year ----
const yearEl = document.getElementById('copyright-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Init theme immediately (no flash)
applyTheme(getPreferred());

document.getElementById('theme-toggle')        ?.addEventListener('click', toggleTheme);
document.getElementById('theme-toggle-mobile') ?.addEventListener('click', toggleTheme);


// ---- Burger menu ----
const burger    = document.querySelector('.burger');
const mobileNav = document.getElementById('nav-mobile');

if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    burger.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
  });

  // Close on any link/button click inside mobile nav (except the theme toggle)
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Menü öffnen');
    });
  });
}


// ---- Über-uns Drawer ----
const uebBtn    = document.getElementById('ueber-uns-toggle');
const uebDrawer = document.getElementById('coaches-drawer');
if (uebBtn && uebDrawer) {
  uebBtn.addEventListener('click', () => {
    const isOpen = uebDrawer.classList.toggle('is-open');
    uebBtn.setAttribute('aria-expanded', String(isOpen));
    uebBtn.querySelector('.lasche-text').textContent = isOpen ? 'Zuklappen' : 'Lerne uns kennen';
  });
}

// ---- Footer-Logo → nach oben ----
document.getElementById('footer-logo')?.addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---- Logo scroll toggle (top ↔ footer) ----
const logoBtn   = document.getElementById('logo-scroll');
const siteFooter = document.getElementById('site-footer');

if (logoBtn && siteFooter) {
  logoBtn.addEventListener('click', e => {
    e.preventDefault();
    // Dropdown schließen falls offen
    if (mobileNav?.classList.contains('open')) {
      mobileNav.classList.remove('open');
      burger?.classList.remove('open');
      burger?.setAttribute('aria-expanded', 'false');
      burger?.setAttribute('aria-label', 'Menü öffnen');
    }
    const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const nearBottom = maxScroll > 0 && window.scrollY >= maxScroll - 200;
    if (nearBottom) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      siteFooter.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + entry.target.id
          ? 'var(--text)'
          : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));


// ---- Contact Modal ----
const modal    = document.getElementById('contact-modal');
const openBtns = document.querySelectorAll('[data-open-modal]');
const closeBtn = modal?.querySelector('[data-close-modal]');

const PRESET_MAP = {
  '1to1':    'cf-int-1to1',
  '12wochen':'cf-int-12w',
  'retreat': 'cf-int-retreat'
};

function openModal(source = '', preset = '') {
  if (!modal) return;

  // Hidden-Feld: Kontaktquelle für Empfänger
  const sourceField = document.getElementById('cf-source');
  if (sourceField) sourceField.value = source || 'Allgemein';

  // Alle Checkboxen zurücksetzen, dann Preset setzen
  Object.values(PRESET_MAP).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.checked = false;
  });
  if (preset && PRESET_MAP[preset]) {
    const el = document.getElementById(PRESET_MAP[preset]);
    if (el) el.checked = true;
  }

  modal.setAttribute('aria-hidden', 'false');
  modal.classList.add('is-open');
  document.body.classList.add('modal-open');
  const first = modal.querySelector('input:not([type="hidden"]), textarea, button:not([data-close-modal])');
  if (first) first.focus();
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('is-open');
  document.body.classList.remove('modal-open');
  modal.addEventListener('transitionend', () => {
    modal.setAttribute('aria-hidden', 'true');
  }, { once: true });
}

openBtns.forEach(btn => btn.addEventListener('click', () => {
  openModal(btn.dataset.source || '', btn.dataset.preset || '');
}));
if (closeBtn) closeBtn.addEventListener('click', closeModal);

if (modal) {
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal?.getAttribute('aria-hidden') === 'false') closeModal();
});


// ---- Testimonial-Karussell ----
document.querySelectorAll('[data-tc]').forEach(wrap => {
  const track   = wrap.querySelector('[data-tc-track]');
  const slides  = wrap.querySelectorAll('[data-tc-slide]');
  const dotsEl  = wrap.querySelector('[data-tc-dots]');
  const prevBtn = wrap.querySelector('[data-tc-prev]');
  const nextBtn = wrap.querySelector('[data-tc-next]');
  if (!track || !slides.length) return;

  let current = 0;
  let dots = [];

  function gapPx()  { return parseFloat(getComputedStyle(track).gap) || 0; }
  function slideW() { return slides[0].offsetWidth; }
  function visCount() {
    const sw = slideW();
    return sw > 0 ? Math.max(1, Math.round(wrap.offsetWidth / (sw + gapPx()))) : 1;
  }
  function maxIdx() { return Math.max(0, slides.length - visCount()); }

  function buildDots() {
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    dots = [];
    const count = maxIdx() + 1;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('button');
      dot.className = 'tc-dot';
      dot.setAttribute('aria-label', `Seite ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(dot);
      dots.push(dot);
    }
  }

  function goTo(n) {
    const max = maxIdx();
    const range = max + 1;
    current = ((n % range) + range) % range;
    track.style.transform = `translateX(-${current * (slideW() + gapPx())}px)`;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
  }

  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      buildDots();
      goTo(Math.min(current, maxIdx()));
    }, 100);
  }, { passive: true });

  // ---- Swipe / Drag (Maus + Touch) ----
  let startX = null, startY = null;

  track.addEventListener('pointerdown', e => {
    startX = e.clientX;
    startY = e.clientY;
    track.setPointerCapture(e.pointerId);
    track.style.userSelect = 'none';
  });

  track.addEventListener('pointerup', e => {
    if (startX === null) return;
    const dx = startX - e.clientX;
    const dy = startY - e.clientY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      goTo(dx > 0 ? current + 1 : current - 1);
    }
    startX = null; startY = null;
    track.style.userSelect = '';
  });

  track.addEventListener('pointercancel', () => {
    startX = null; startY = null;
    track.style.userSelect = '';
  });

  buildDots();
  goTo(0);
});
