(function () {
  'use strict';

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Lightbox
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = lightbox ? lightbox.querySelector('.lightbox__img') : null;
  var closeBtn = lightbox ? lightbox.querySelector('.lightbox__close') : null;

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    if (!lightbox || !lightboxImg) return;
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-lightbox] figure').forEach(function (fig) {
    fig.addEventListener('click', function () {
      var img = fig.querySelector('img');
      if (img) openLightbox(img.src, img.alt);
    });
  });

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target === closeBtn) closeLightbox();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox && !lightbox.hidden) closeLightbox();
  });

  // Copy buttons
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      if (!text) return;
      var done = function () {
        var orig = btn.textContent;
        btn.textContent = 'Copied';
        btn.classList.add('is-copied');
        setTimeout(function () {
          btn.textContent = orig;
          btn.classList.remove('is-copied');
        }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {});
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (_) {}
        document.body.removeChild(ta);
      }
    });
  });
})();
