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

/* ─── CARD (folosit pe index.html și blog.html) ─────────────── */
function renderCard(article) {
  return `
    <article class="blog-card reveal">
      <a href="articol.html?id=${article.id}" class="blog-card-img">
        <img src="${article.image}" alt="${article.title}" loading="lazy">
        <span class="blog-card-cat">${article.category}</span>
      </a>
      <div class="blog-card-body">
        <p class="blog-card-meta">${formatDate(article.date)} · ${article.author}</p>
        <h3 class="blog-card-title">
          <a href="articol.html?id=${article.id}">${article.title}</a>
        </h3>
        <p class="blog-card-excerpt">${article.excerpt}</p>
        <a href="articol.html?id=${article.id}" class="blog-read-more">Citește mai mult →</a>
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

/* ─── ARTICOL.HTML — articol individual ─────────────────────── */
function initArticlePage() {
  const container = document.getElementById('article-container');
  if (!container) return;

  const id = new URLSearchParams(window.location.search).get('id');
  const article = ARTICLES.find(a => a.id === id);

  if (!article) {
    container.innerHTML = `
      <div style="text-align:center;padding:8rem 5vw">
        <p class="section-label">Eroare 404</p>
        <h1 class="section-title">Articolul nu a fost găsit</h1>
        <a href="blog.html" class="btn-green" style="display:inline-block;margin-top:2rem">← Înapoi la blog</a>
      </div>`;
    return;
  }

  document.title = `${article.title} — Grădina Noastră`;

  /* Articolele vecine (anterior / următor) */
  const idx  = ARTICLES.findIndex(a => a.id === id);
  const prev = ARTICLES[idx + 1];
  const next = ARTICLES[idx - 1];
  const navHtml = `
    <div class="article-nav">
      <div>${next ? `<a href="articol.html?id=${next.id}" class="article-nav-link">${next.title} →</a>` : ''}</div>
      <div>${prev ? `<a href="articol.html?id=${prev.id}" class="article-nav-link">← ${prev.title}</a>` : ''}</div>
    </div>`;

  container.innerHTML = `
      <div class="article-hero" style="background-image:url('${article.image}'); background-position: ${article.heroPosition || 'center center'}; background-size: cover; background-repeat: no-repeat;">
      <div class="article-hero-overlay"></div>
      <div class="article-hero-content">
        <p class="section-label">${article.category}</p>
        <h1 class="article-title">${article.title}</h1>
        <p class="article-meta">${formatDate(article.date)} · ${article.author}</p>
      </div>
    </div>
    <div class="article-body">
      <div class="article-content">${article.content}</div>
      <div class="article-tags">
        ${article.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
      ${navHtml}
      <div class="article-back">
        <a href="blog.html" class="btn-green">← Înapoi la blog</a>
      </div>
    </div>`;
}