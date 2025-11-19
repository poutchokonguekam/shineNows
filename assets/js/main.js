document.addEventListener('DOMContentLoaded', () => {
  const supportedLangs = ['fr', 'en', 'de'];
  const navConfig = {
    fr: [
      { label: 'Accueil', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'Réalisations', href: '/portfolio' },
      { label: 'Blog', href: '/blog' },
      { label: 'Devis', href: '/devis' },
      { label: 'Contact', href: '/contact' }
    ],
    en: [
      { label: 'Home', href: '/en/' },
      { label: 'Services', href: '/en/services' },
      { label: 'Work', href: '/en/portfolio' },
      { label: 'Blog', href: '/en/blog' },
      { label: 'Quote', href: '/en/quote' },
      { label: 'Contact', href: '/en/contact' }
    ],
    de: [
      { label: 'Start', href: '/de/' },
      { label: 'Leistungen', href: '/de/services' },
      { label: 'Referenzen', href: '/de/portfolio' },
      { label: 'Blog', href: '/de/blog' },
      { label: 'Angebot', href: '/de/angebot' },
      { label: 'Kontakt', href: '/de/kontakt' }
    ]
  };

  const navList = document.querySelector('.nav-list');
  const languageSwitcher = document.querySelector('.language-switcher');
  const languageToggle = languageSwitcher?.querySelector('.language-toggle');
  const languageMenu = languageSwitcher?.querySelector('.language-menu');
  const languageActive = languageSwitcher?.querySelector('.language-active');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const body = document.body;

  const browserLang = (navigator.language || navigator.userLanguage || 'fr').slice(0, 2).toLowerCase();
  const htmlLang = document.documentElement.lang?.slice(0, 2).toLowerCase();
  let activeLang = supportedLangs.includes(browserLang)
    ? browserLang
    : (supportedLangs.includes(htmlLang) ? htmlLang : 'fr');

  const renderNav = (lang) => {
    if (!navList) return;
    navList.innerHTML = navConfig[lang]
      .map((item) => `<li><a href="${item.href}">${item.label}</a></li>`)
      .join('');
  };

  const updateLanguageMenu = () => {
    if (!languageSwitcher) return;
    languageActive.textContent = activeLang.toUpperCase();
    languageMenu?.querySelectorAll('[data-lang]').forEach((btn) => {
      btn.hidden = btn.dataset.lang === activeLang;
    });
  };

  const setLanguage = (lang) => {
    if (!supportedLangs.includes(lang)) return;
    activeLang = lang;
    renderNav(activeLang);
    updateLanguageMenu();
  };

  renderNav(activeLang);
  updateLanguageMenu();

  languageToggle?.addEventListener('click', (event) => {
    event.stopPropagation();
    const expanded = languageSwitcher.classList.toggle('open');
    languageToggle.setAttribute('aria-expanded', expanded);
  });

  languageMenu?.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-lang]');
    if (!btn) return;
    setLanguage(btn.dataset.lang);
    languageSwitcher.classList.remove('open');
    languageToggle?.setAttribute('aria-expanded', 'false');
  });

  document.addEventListener('click', (event) => {
    if (languageSwitcher && !languageSwitcher.contains(event.target)) {
      languageSwitcher.classList.remove('open');
      languageToggle?.setAttribute('aria-expanded', 'false');
    }
  });

  mobileToggle?.addEventListener('click', () => {
    const isOpen = body.classList.toggle('menu-open');
    mobileToggle.setAttribute('aria-expanded', String(isOpen));
    if (!isOpen) {
      languageSwitcher?.classList.remove('open');
      languageToggle?.setAttribute('aria-expanded', 'false');
    }
  });

  navList?.addEventListener('click', (event) => {
    if (event.target.closest('a') && body.classList.contains('menu-open')) {
      body.classList.remove('menu-open');
      mobileToggle?.setAttribute('aria-expanded', 'false');
    }
  });

  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    let current = 0;
    const step = Math.max(1, Math.floor(target / 80));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = `${target}+`;
        clearInterval(timer);
      } else {
        el.textContent = current;
      }
    }, 20);
  });

  const downloadBtn = document.getElementById('download-brief');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const form = document.getElementById('devis-form');
      if (!form) return;
      const data = new FormData(form);
      let content = 'BRIEF PROJET SHINENOWS\n\n';
      data.forEach((value, key) => {
        content += `${key}: ${value}\n`;
      });
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'brief-shinenows.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }
});
