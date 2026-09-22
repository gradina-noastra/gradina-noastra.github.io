/* ============================================================
   GRĂDINA NOASTRĂ — main.js
   ============================================================ */

/* ─── HERO LOAD ANIMATION ────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const hero = document.getElementById('hero');
    if (hero) hero.classList.add('loaded');
  }, 80);
});

/* ─── NAV: SCROLL SHADOW ─────────────────────────────────────── */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (nav) {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }
});

/* ─── MOBILE MENU ────────────────────────────────────────────── */
function toggleMenu() {
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('mobileMenu');
  if (toggle) toggle.classList.toggle('open');
  if (menu)   menu.classList.toggle('open');
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('mobileMenu');
  if (menu && menu.classList.contains('open')) {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove('open');
      toggle.classList.remove('open');
    }
  }
});

/* ─── REVEAL ON SCROLL ───────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach((el) => revealObserver.observe(el));

/* ─── LIGHTBOX ───────────────────────────────────────────────── */
function openLightbox(src) {
  const lb  = document.getElementById('lightbox');
  const img = document.getElementById('lbImg');
  if (lb && img) {
    img.src = src;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    // Clear src after transition to avoid flicker on reopen
    setTimeout(() => {
      const img = document.getElementById('lbImg');
      if (img && !lb.classList.contains('open')) img.src = '';
    }, 300);
  }
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

/* ─── CONTACT FORM ───────────────────────────────────────────── */
function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const successMsg = document.getElementById('successMsg');

  fetch('https://formspree.io/f/mdekgpkr', {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  })
  .then((response) => {
    if (response.ok) {
      if (successMsg) {
        successMsg.classList.add('show');
        setTimeout(() => successMsg.classList.remove('show'), 5000);
      }
      form.reset();
    } else {
      alert('A apărut o problemă la trimitere. Încearcă din nou sau scrie-ne direct pe email.');
    }
  })
  .catch(() => {
    alert('A apărut o problemă la trimitere. Verifică conexiunea la internet.');
  });
}

/* ─── SMOOTH SCROLL FOR NAV LINKS ────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─── Sunetul grădinii ─────────────────────────── */
(function () {
  var btn = document.getElementById('soundToggle');
  var snd = document.getElementById('ambientSound');
  if (!btn || !snd) return;

  snd.volume = 0.55;

  btn.addEventListener('click', function () {
    if (snd.paused) {
      snd.play().then(function () {
        btn.classList.add('is-on');
        btn.setAttribute('aria-label', 'Oprește sunetul');
      }).catch(function () {});
    } else {
      snd.pause();
      btn.classList.remove('is-on');
      btn.setAttribute('aria-label', 'Pornește sunetul grădinii');
    }
  });
})();

/* ─── Video hero: versiune pentru telefon sau desktop ─── */
(function () {
  var v = document.querySelector('.hero-video');
  if (!v) return;
  var telefon = window.matchMedia('(max-width: 700px)').matches;
  v.poster = telefon ? 'images/greieri_poster_portret.jpg' : 'images/greieri_poster.jpg';
  v.src    = telefon ? 'images/greieri_portret.mp4'        : 'images/cantat_de_greieri.mp4';
  v.play().catch(function () {});
})();
/* ─── Poze mărite la click, în articole ─────────── */
(function () {
  var container = document.getElementById('article-container');
  if (!container) return;

  var box = document.createElement('div');
  box.className = 'lightbox';
  box.innerHTML = '<button class="lightbox-close" aria-label="Închide">&times;</button><img alt="">';
  document.body.appendChild(box);
  var boxImg = box.querySelector('img');

  container.addEventListener('click', function (e) {
    var img = e.target.closest('img');
    if (!img) return;
    boxImg.src = img.src;
    boxImg.alt = img.alt || '';
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  function inchide() {
    box.classList.remove('open');
    document.body.style.overflow = '';
  }

  box.addEventListener('click', inchide);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') inchide();
  });
})();
