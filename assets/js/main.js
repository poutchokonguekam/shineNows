document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
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
