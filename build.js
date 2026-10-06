/* ============================================================
   GRĂDINA NOASTRĂ — build.js
   Creează câte o pagină HTML pentru fiecare articol din
   data/articles.js și reface sitemap.xml.

   Cum se folosește:
     1. Adaugi sau modifici articolul în data/articles.js, ca până acum.
     2. Dublu click pe genereaza.bat  (sau, în terminal:  node build.js)
     3. Faci commit și push ca de obicei.

   Ce face:
     - articole/<id>.html  — o pagină completă pentru fiecare articol,
       cu titlul, descrierea și poza lui (pentru Google și Facebook)
     - sitemap.xml         — lista de adrese pentru Google

   Nu are nevoie de nimic instalat în afară de Node.js.
   ============================================================ */

const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

/* ─── SETĂRI ─────────────────────────────────────────────────── */
const SITE_URL  = 'https://gradinanoastra.blog/';
const SITE_NAME = 'Grădina Noastră';
const OUT_DIR   = 'articole';

/* Poze de previzualizare pentru Facebook / WhatsApp (1200×630, pe lat).
   Dacă există images/og/<id>.jpg, pagina articolului o folosește la
   distribuire. Dacă nu există, se folosește poza de copertă a articolului.
   Pozele din articol și din carduri nu se schimbă. */
const OG_DIR    = 'images/og';
const OG_WIDTH  = 1200;
const OG_HEIGHT = 630;

/* Paginile obișnuite care apar în sitemap (în afară de articole).
   Dacă adaugi o pagină nouă pe site, trece-o și aici. */
const STATIC_PAGES = ['', 'blog.html', 'galerie.html', 'despre.html', 'contact.html'];

/* Linia de statistică Cloudflare, aceeași ca în celelalte pagini */
const ANALYTICS = `<!-- Cloudflare Web Analytics --><script type='module' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "9afbc6478e6f4b1b995bdd07b165cc21"}'></script><!-- End Cloudflare Web Analytics -->`;

/* Semn pus în paginile create de acest script, ca să le poată
   șterge pe cele rămase de la articole care nu mai există. */
const MARKER = '<!-- pagină creată automat de build.js — nu o modifica de mână -->';

const ROOT = __dirname;
const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');

/* ─── CITEȘTE ARTICOLELE ─────────────────────────────────────── */
/* Folosim chiar fișierele site-ului, ca adresele și datele să fie
   calculate la fel ca în browser. */
let ARTICLES, formatDate, articleSlug;
try {
  ({ ARTICLES, formatDate, articleSlug } = vm.runInNewContext(
    read('data/articles.js') + '\n' + read('js/blog.js') +
    '\n;({ ARTICLES, formatDate, articleSlug })',
    { URLSearchParams }
  ));
} catch (err) {
  stop(`Nu am putut citi data/articles.js sau js/blog.js.\n  ${err.message}\n` +
       '  De obicei lipsește o virgulă, o ghilimea sau un apostrof invers (`) într-un articol.');
}

/* ─── VERIFICĂRI ─────────────────────────────────────────────── */
const REQUIRED = ['id', 'title', 'date', 'category', 'tags', 'image', 'author', 'excerpt', 'content'];
const seen = new Map();
const warnings = [];

ARTICLES.forEach((a, i) => {
  const name = a.id ? `„${a.id}”` : `numărul ${i + 1} din listă`;
  for (const field of REQUIRED) {
    if (a[field] === undefined || a[field] === '') stop(`Articolul ${name} nu are câmpul „${field}”.`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(a.date) || isNaN(new Date(a.date + 'T00:00:00'))) {
    stop(`Articolul ${name} are data „${a.date}”. Formatul corect este AAAA-LL-ZZ, de exemplu 2026-09-06.`);
  }
  const slug = articleSlug(a);
  if (!slug) stop(`Articolul ${name} are un id din care nu se poate face o adresă.`);
  if (seen.has(slug)) stop(`Articolele „${seen.get(slug)}” și „${a.id}” ar avea aceeași adresă (${slug}.html). Schimbă id-ul unuia dintre ele.`);
  seen.set(slug, a.id);

  if (!fs.existsSync(path.join(ROOT, a.image))) {
    warnings.push(`Articolul ${name}: poza „${a.image}” nu există în folder.`);
  }
  if (i > 0 && a.date > ARTICLES[i - 1].date) {
    warnings.push(`Articolul ${name} are data ${a.date}, mai nouă decât articolul de deasupra lui (${ARTICLES[i - 1].date}). Lista ar trebui să fie de la cel mai nou la cel mai vechi — verifică anul.`);
  }
});

/* ─── AJUTOARE ───────────────────────────────────────────────── */
/* Text pus în atribute HTML (content="...", alt="...") */
function attr(text) {
  return String(text)
    .replace(/&(?!#?\w+;)/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/* Paginile de articol stau în folderul articole/, deci adresele
   scrise ca „images/poza.jpg” trebuie să devină „../images/poza.jpg”. */
function fromSubfolder(html) {
  return html
    .replace(/\b(src|href|poster)=(["'])(?![a-z][a-z0-9+.-]*:|\/|#|\.\.\/)/gi, '$1=$2../')
    .replace(/url\((["']?)(?![a-z][a-z0-9+.-]*:|\/|#|\.\.\/)/gi, 'url($1../');
}

function absoluteUrl(relative) {
  return new URL(relative, SITE_URL).href;
}

/* Poza de previzualizare a articolului, dacă a fost pregătită una */
function previewImage(article) {
  const file = `${OG_DIR}/${articleSlug(article)}.jpg`;
  return fs.existsSync(path.join(ROOT, file)) ? file : null;
}

/* ─── PAGINA UNUI ARTICOL ────────────────────────────────────── */
function articlePage(article, index) {
  const slug  = articleSlug(article);
  const url   = `${SITE_URL}${OUT_DIR}/${slug}.html`;
  const preview = previewImage(article);
  const image = absoluteUrl(preview || article.image);
  const title = `${article.title} — ${SITE_NAME}`;

  /* Pozele din articol se încarcă abia când cititorul ajunge la ele */
  const content = fromSubfolder(
    article.content.replace(/<img /g, '<img loading="lazy" decoding="async" ')
  );

  /* Articolele vecine: lista e de la cel mai nou la cel mai vechi */
  const older = ARTICLES[index + 1];
  const newer = ARTICLES[index - 1];

  const structuredData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    image: image,
    datePublished: article.date,
    author: { '@type': 'Person', name: article.author },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: url,
    inLanguage: 'ro'
  }, null, 2).replace(/</g, '\\u003c');

  return `<!DOCTYPE html>
<html lang="ro">
<head>
  ${MARKER}
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${attr(title)}</title>
  <meta name="description" content="${attr(article.excerpt)}" />
  <link rel="canonical" href="${url}" />

  <!-- Previzualizare la distribuire (Facebook, WhatsApp, LinkedIn) -->
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="${attr(SITE_NAME)}" />
  <meta property="og:locale" content="ro_RO" />
  <meta property="og:title" content="${attr(title)}" />
  <meta property="og:description" content="${attr(article.excerpt)}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${image}" />${preview ? `
  <meta property="og:image:width" content="${OG_WIDTH}" />
  <meta property="og:image:height" content="${OG_HEIGHT}" />` : ''}
  <meta property="og:image:alt" content="${attr(article.title)}" />
  <meta property="article:published_time" content="${article.date}" />
  <meta name="twitter:card" content="summary_large_image" />

  <!-- Date structurate pentru Google -->
  <script type="application/ld+json">
${structuredData}
  </script>

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap" rel="stylesheet" />
  <link rel="preload" as="image" href="../${attr(article.image)}" />
  <link rel="stylesheet" href="../css/style.css" />
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" href="/favicon-192.png" type="image/png" sizes="192x192">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
</head>
<body>
  <nav id="nav">
    <a href="../index.html" class="nav-logo">Grădina <em>Noastră</em></a>
    <ul class="nav-links">
      <li><a href="../index.html#gradina">Grădina</a></li>
      <li><a href="../galerie.html">Galerie</a></li>
      <li><a href="../blog.html">Blog</a></li>
      <li><a href="../despre.html">Despre</a></li>
      <li><a href="../contact.html">Contact</a></li>
    </ul>
    <button type="button" class="nav-toggle" id="navToggle" onclick="toggleMenu()" aria-label="Deschide meniul" aria-expanded="false" aria-controls="mobileMenu">
      <span></span><span></span><span></span>
    </button>
  </nav>

  <!-- Mobile menu -->
  <div class="mobile-menu" id="mobileMenu">
    <a href="../index.html#gradina" onclick="toggleMenu()">Grădina</a>
    <a href="../galerie.html" onclick="toggleMenu()">Galerie</a>
    <a href="../blog.html" onclick="toggleMenu()">Blog</a>
    <a href="../despre.html" onclick="toggleMenu()">Despre</a>
    <a href="../contact.html" onclick="toggleMenu()">Contact</a>
  </div>

  <div id="article-container">
    <div class="article-hero" style="background-image:url('../${article.image}'); background-position: ${article.heroPosition || 'center center'}; background-size: cover; background-repeat: no-repeat;">
      <div class="article-hero-overlay"></div>
      <div class="article-hero-content">
        <p class="section-label">${article.category}</p>
        <h1 class="article-title">${article.title}</h1>
        <p class="article-meta">${formatDate(article.date)} · ${article.author}</p>
      </div>
    </div>
    <div class="article-body">
      <div class="article-content">${content}</div>
      <div class="article-tags">
        ${article.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
      <div class="article-nav">
        <div>${newer ? `<a href="${articleSlug(newer)}.html" class="article-nav-link">${newer.title} →</a>` : ''}</div>
        <div>${older ? `<a href="${articleSlug(older)}.html" class="article-nav-link">← ${older.title}</a>` : ''}</div>
      </div>
      <div class="article-back">
        <a href="../blog.html" class="btn-green">← Înapoi la blog</a>
      </div>
    </div>
  </div>

  <footer>
    <div class="footer-logo">Grădina <em>Noastră</em></div>
    <div class="footer-note">Cu drag, din inima naturii · 2026</div>
  </footer>

  <script src="../js/main.js"></script>
  ${ANALYTICS}
</body>
</html>
`;
}

/* ─── SITEMAP ────────────────────────────────────────────────── */
function sitemap() {
  const newest = ARTICLES.map(a => a.date).sort().pop();
  const line = (loc, lastmod) =>
    `  <url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`;

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    /* Prima pagină și lista de articole se schimbă odată cu cel mai nou articol */
    ...STATIC_PAGES.map(p => line(SITE_URL + p, (p === '' || p === 'blog.html') ? newest : '')),
    '',
    '  <!-- Articole -->',
    ...ARTICLES.map(a => line(`${SITE_URL}${OUT_DIR}/${articleSlug(a)}.html`, a.date)),
    '</urlset>',
    ''
  ].join('\n');
}

/* ─── SCRIE FIȘIERELE ────────────────────────────────────────── */
/* Fișierele site-ului folosesc sfârșit de rând Windows (CRLF) */
function write(file, text) {
  fs.writeFileSync(path.join(ROOT, file), text.replace(/\r\n/g, '\n').replace(/\n/g, '\r\n'), 'utf8');
}

const outDir = path.join(ROOT, OUT_DIR);
fs.mkdirSync(outDir, { recursive: true });

/* Șterge paginile vechi create de acest script (de la articole șterse sau redenumite) */
const wanted = new Set(ARTICLES.map(a => `${articleSlug(a)}.html`));
let removed = 0;
for (const file of fs.readdirSync(outDir)) {
  if (!file.endsWith('.html') || wanted.has(file)) continue;
  if (fs.readFileSync(path.join(outDir, file), 'utf8').includes(MARKER)) {
    fs.unlinkSync(path.join(outDir, file));
    removed++;
  }
}

ARTICLES.forEach((article, index) => {
  write(`${OUT_DIR}/${articleSlug(article)}.html`, articlePage(article, index));
});
write('sitemap.xml', sitemap());

/* ─── RAPORT ─────────────────────────────────────────────────── */
console.log(`\nGata: ${ARTICLES.length} articole.\n`);
ARTICLES.forEach(a => console.log(`  ${OUT_DIR}/${articleSlug(a)}.html   ${a.title}`));

const withPreview = ARTICLES.filter(previewImage);
console.log(`\n  Poză proprie de previzualizare (${OG_DIR}/): ${withPreview.length} din ${ARTICLES.length}.`);
ARTICLES.filter(a => !previewImage(a)).forEach(a =>
  console.log(`    fără: ${articleSlug(a)}  (se folosește coperta ${a.image})`));
console.log('\n  sitemap.xml a fost refăcut.');
if (removed) console.log(`  ${removed} pagini vechi au fost șterse.`);
if (warnings.length) {
  console.log('\nDe verificat:');
  warnings.forEach(w => console.log(`  ! ${w}`));
}
console.log('\nAcum poți face commit și push.\n');

function stop(message) {
  console.error(`\nEROARE: ${message}\n\nNu am modificat nimic. Corectează și rulează din nou.\n`);
  process.exit(1);
}
