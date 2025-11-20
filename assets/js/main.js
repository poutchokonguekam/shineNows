document.addEventListener('DOMContentLoaded', () => {
  const supportedLangs = ['fr', 'en', 'de'];
  const labels = { fr: 'FR', en: 'EN', de: 'DE' };
  const localeHome = { fr: '/', en: '/en/', de: '/de/' };
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
      { label: 'Quote', href: '/en/devis' },
      { label: 'Contact', href: '/en/contact' }
    ],
    de: [
      { label: 'Start', href: '/de/' },
      { label: 'Leistungen', href: '/de/services' },
      { label: 'Referenzen', href: '/de/portfolio' },
      { label: 'Blog', href: '/de/blog' },
      { label: 'Angebot', href: '/de/devis' },
      { label: 'Kontakt', href: '/de/contact' }
    ]
  };

  const body = document.body;
  const navList = document.querySelector('.nav-list');
  const languageSwitcher = document.querySelector('.language-switcher');
  const langCurrent = languageSwitcher?.querySelector('.lang-current');
  const langDropdown = languageSwitcher?.querySelector('.lang-dropdown');
  const burgerBtn = document.querySelector('.burger-btn');

  const browserLang = (navigator.language || navigator.userLanguage || 'fr').slice(0, 2).toLowerCase();
  const htmlLang = document.documentElement.lang?.slice(0, 2).toLowerCase();
  let activeLang = supportedLangs.includes(htmlLang)
    ? htmlLang
    : (supportedLangs.includes(browserLang) ? browserLang : 'fr');

  const renderNav = (lang) => {
    if (!navList) return;
    navList.innerHTML = navConfig[lang]
      .map((item) => `<li><a href="${item.href}">${item.label}</a></li>`)
      .join('');
  };

  const renderDropdown = () => {
    if (!langDropdown) return;
    langDropdown.innerHTML = supportedLangs
      .filter((code) => code !== activeLang)
      .map((code) => `<a href="#" data-lang="${code}">${labels[code]}</a>`)
      .join('');
  };

  const setLanguage = (lang, navigate) => {
    if (!supportedLangs.includes(lang)) return;
    activeLang = lang;
    renderNav(activeLang);
    renderDropdown();
    if (langCurrent) {
      langCurrent.textContent = labels[activeLang];
    }
    if (navigate) {
      window.location.href = localeHome[lang];
    }
  };

  setLanguage(activeLang, false);

  langCurrent?.addEventListener('click', (event) => {
    event.stopPropagation();
    const expanded = languageSwitcher.classList.toggle('open');
    langCurrent.setAttribute('aria-expanded', String(expanded));
  });

  langDropdown?.addEventListener('click', (event) => {
    const link = event.target.closest('a[data-lang]');
    if (!link) return;
    event.preventDefault();
    languageSwitcher.classList.remove('open');
    langCurrent?.setAttribute('aria-expanded', 'false');
    setLanguage(link.dataset.lang, true);
  });

  document.addEventListener('click', (event) => {
    if (languageSwitcher && !languageSwitcher.contains(event.target)) {
      languageSwitcher.classList.remove('open');
      langCurrent?.setAttribute('aria-expanded', 'false');
    }
  });

  burgerBtn?.addEventListener('click', () => {
    const open = body.classList.toggle('menu-open');
    burgerBtn.setAttribute('aria-expanded', String(open));
    if (!open) {
      languageSwitcher?.classList.remove('open');
      langCurrent?.setAttribute('aria-expanded', 'false');
    }
  });

  navList?.addEventListener('click', (event) => {
    if (event.target.closest('a') && body.classList.contains('menu-open')) {
      body.classList.remove('menu-open');
      burgerBtn?.setAttribute('aria-expanded', 'false');
    }
  });

  const slider = document.querySelector('.hero-slider');
  if (slider) {
    const slides = Array.from(slider.querySelectorAll('.hero-slide'));
    const dotsContainer = slider.querySelector('.hero-slider-dots');
    let current = 0;
    const goTo = (index) => {
      slides[current].classList.remove('is-active');
      dotsContainer.children[current].classList.remove('is-active');
      current = index;
      slides[current].classList.add('is-active');
      dotsContainer.children[current].classList.add('is-active');
    };
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.addEventListener('click', () => goTo(idx));
      if (idx === 0) dot.classList.add('is-active');
      dotsContainer.appendChild(dot);
    });
    let timer = setInterval(() => goTo((current + 1) % slides.length), 5000);
    slider.addEventListener('mouseenter', () => clearInterval(timer));
    slider.addEventListener('mouseleave', () => (timer = setInterval(() => goTo((current + 1) % slides.length), 5000)));
  }

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
