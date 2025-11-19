document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });
  }

  const counters = document.querySelectorAll('[data-count]');
  const animateCounter = (el) => {
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
  };
  counters.forEach(animateCounter);

  const downloadBtn = document.getElementById('download-brief');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const form = document.getElementById('devis-form');
      if (!form) return;
      const formData = new FormData(form);
      let content = 'BRIEF PROJET SHINENOWS\n\n';
      formData.forEach((value, key) => {
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
