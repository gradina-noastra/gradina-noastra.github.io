/* ============================================================
   GRĂDINA NOASTRĂ — blog.js
   Funcții modulare pentru randarea blogului.
   Depinde de: data/articles.js (încărcat înaintea acestui fișier)
   ============================================================ */

const MONTHS_RO = [
  'ianuarie','februarie','martie','aprilie','mai','iunie',
  'iulie','august','septembrie','octombrie','noiembrie','decembrie'
];

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return `${d.getDate()} ${MONTHS_RO[d.getMonth()]} ${d.getFullYear()}`;
}

/* ─── ADRESA UNUI ARTICOL ───────────────────────────────────────
   Fiecare articol are pagina lui: articole/<id cu litere mici>.html
   Paginile sunt create de build.js (vezi genereaza.bat).
   ─────────────────────────────────────────────────────────── */
function articleSlug(article) {
  return String(article.id)
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')   // fără diacritice
    .replace(/[^a-z0-9]+/g, '-')                        // doar litere, cifre și cratimă
    .replace(/^-+|-+$/g, '');
}

function articleUrl(article) {
  return `articole/${articleSlug(article)}.html`;
}

/* ─── CARD (folosit pe index.html și blog.html) ─────────────── */
function renderCard(article) {
  return `
    <article class="blog-card reveal">
      <a href="${articleUrl(article)}" class="blog-card-img">
        <img src="${article.image}" alt="${article.title}" loading="lazy">
        <span class="blog-card-cat">${article.category}</span>
      </a>
      <div class="blog-card-body">
        <p class="blog-card-meta">${formatDate(article.date)} · ${article.author}</p>
        <h3 class="blog-card-title">
          <a href="${articleUrl(article)}">${article.title}</a>
        </h3>
        <p class="blog-card-excerpt">${article.excerpt}</p>
        <a href="${articleUrl(article)}" class="blog-read-more">Citește mai mult →</a>
      </div>
    </article>`;
}

/* ─── REVEAL pentru elemente adăugate dinamic ───────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal:not(.observed)');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  els.forEach(el => { el.classList.add('observed'); obs.observe(el); });
}

/* ─── INDEX.HTML — preview 3 articole recente ───────────────── */
function initHomeBlog() {
  const container = document.getElementById('blog-preview-grid');
  if (!container) return;
  container.innerHTML = ARTICLES.slice(0, 3).map(renderCard).join('');
  initReveal();
}

/* ─── BLOG.HTML — lista completă + filtrare ─────────────────── */
function initBlogList() {
  const container = document.getElementById('blog-grid');
  const filterBar = document.getElementById('blog-filter-bar');
  if (!container) return;

  function render(list) {
    container.innerHTML = list.length
      ? list.map(renderCard).join('')
      : '<p class="blog-empty">Niciun articol în această categorie.</p>';
    initReveal();
  }

  if (filterBar) {
    const categories = ['Toate', ...new Set(ARTICLES.map(a => a.category))];
    filterBar.innerHTML = categories.map(cat =>
      `<button class="blog-filter-btn${cat === 'Toate' ? ' active' : ''}" data-cat="${cat}">${cat}</button>`
    ).join('');

    filterBar.addEventListener('click', e => {
      const btn = e.target.closest('.blog-filter-btn');
      if (!btn) return;
      document.querySelectorAll('.blog-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      render(cat === 'Toate' ? ARTICLES : ARTICLES.filter(a => a.category === cat));
    });
  }

  render(ARTICLES);
}
/* ─── ARTICOL.HTML — adresele vechi (articol.html?id=...) ───────
   Articolele au acum pagini proprii în folderul articole/.
   Cine deschide un link vechi este dus automat la pagina nouă.
   ─────────────────────────────────────────────────────────── */
function redirectOldArticleLink() {
  const id = new URLSearchParams(window.location.search).get('id');
  const article = ARTICLES.find(a => a.id === id);
  window.location.replace(article ? articleUrl(article) : 'blog.html');
}
