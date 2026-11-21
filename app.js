/* =========================================================
   RABID PEDIA - main script
   ========================================================= */

/* ====================== DATA ====================== */
const bannerSlides = [
  {
    image: 'images/cekprime.jpg',
    title: 'CEK PRIME',
    description: 'Ayo cek total top up kamu.',
    link: 'https://adenpedia.my.id/cekprime/'
  },
  {
    image: 'images/ayocekakun.jpg',
    title: 'CEK AKUN DIBUAT',
    description: 'Proses cepat, aman, dan gratis!',
    link: 'https://adenpedia.my.id/update01/'
  },
  {
    image: 'images/cekprime.jpg',
    title: 'CEK PRIME',
    description: 'Ayo cek total top up kamu.',
    link: 'https://adenpedia.my.id/cekprime/'
  },
  {
    image: 'images/ayocekakun.jpg',
    title: 'CEK AKUN DIBUAT',
    description: 'Proses cepat, aman, dan gratis!',
    link: 'https://adenpedia.my.id/update01/'
  }
];

const featuredItems = [
  {
    title: 'CEK AKUN DIBUAT',
    sub: 'RABID x AhMyth',
    image: 'images/ayocekakun.jpg',
    link: 'https://adenpedia.my.id/update01/',
    toolKey: 'akundibuat'
  },
  {
    title: 'Download Crono Project',
    sub: 'RABID PEDIA',
    image: 'images/cronoproject.jpg',
    link: 'https://adenpedia.my.id/crono/',
    toolKey: 'crono'
  },
  {
    title: 'CEK PRIME',
    sub: 'RABID PEDIA',
    image: 'images/cekprime.jpg',
    link: 'https://adenpedia.my.id/cekprime/',
    toolKey: 'cekprime'
  }
];

const tools = [
  {
    name: 'CEK AKUN DIBUAT',
    image: 'images/cekakun.jpg',
    rating: '5.0',
    sold: '510K VISITOR',
    category: 'popular',
    link: 'https://adenpedia.my.id/update01/',
    toolKey: 'akundibuat'
  },
  {
    name: "Cek Point's Prime",
    image: 'images/cekpointprime.jpg',
    rating: '4.9',
    sold: '71K VISITOR',
    category: 'popular',
    link: 'https://adenpedia.my.id/cekprime/',
    toolKey: 'cekprime'
  },
  {
    name: 'GB LIKE/LOBBY5/BIO PANJANG/DAN LAIN-LAIN',
    image: 'images/gblike.jpg',
    rating: '4.5',
    sold: '2K VISITOR',
    category: 'popular',
    link: 'https://ahmyth.pro/'
  },
  {
    name: 'RABID 67',
    image: 'images/rabid67.jpg',
    rating: '4.8',
    sold: '5K VISITOR',
    category: 'popular',
    link: 'https://safefileku.com/download/S0eoU1s69ATZhP47',
    toolKey: 'rabid67'
  },
  {
    name: 'KIPAS 26',
    image: 'images/gblike.jpg',
    rating: '4.1',
    sold: '1K VISITOR',
    category: 'gaming',
    link: '#'
  }
];

/* ====================== SLIDER ====================== */
let currentSlide = 0;
let slideInterval;
const autoSlideDelay = 4500;

function initBannerSlider() {
  const track = document.getElementById('sliderTrack');
  const dotsContainer = document.getElementById('sliderDots');
  if (!track || !bannerSlides.length) return;

  track.innerHTML = '';
  dotsContainer.innerHTML = '';

  bannerSlides.forEach((slide, index) => {
    const slideEl = document.createElement('div');
    slideEl.className = 'slide-item';
    slideEl.innerHTML = `
      <a href="${slide.link || '#'}">
        <img src="${slide.image}" alt="${slide.title}">
        <div class="slide-overlay">
          <div class="slide-title">${slide.title}</div>
          <div class="slide-desc">${slide.description}</div>
        </div>
      </a>`;
    track.appendChild(slideEl);

    const dot = document.createElement('div');
    dot.className = 'dot' + (index === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  updateSlidePosition();
  startAutoSlide();

  document.getElementById('slidePrev').addEventListener('click', () => { prevSlide(); resetAutoSlide(); });
  document.getElementById('slideNext').addEventListener('click', () => { nextSlide(); resetAutoSlide(); });

  const sliderWrapper = document.getElementById('bannerSlider');
  let touchStartX = 0;
  sliderWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoSlide();
  }, { passive: true });
  sliderWrapper.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 40) { diff > 0 ? nextSlide() : prevSlide(); }
    startAutoSlide();
  }, { passive: true });
}

function updateSlidePosition() {
  const track = document.getElementById('sliderTrack');
  if (!track) return;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}
function nextSlide() { currentSlide = (currentSlide + 1) % bannerSlides.length; updateSlidePosition(); }
function prevSlide() { currentSlide = (currentSlide - 1 + bannerSlides.length) % bannerSlides.length; updateSlidePosition(); }
function goToSlide(index) { currentSlide = index; updateSlidePosition(); resetAutoSlide(); }
function startAutoSlide() { stopAutoSlide(); slideInterval = setInterval(nextSlide, autoSlideDelay); }
function stopAutoSlide() { if (slideInterval) clearInterval(slideInterval); }
function resetAutoSlide() { stopAutoSlide(); startAutoSlide(); }

/* ====================== ADVANTAGES MARQUEE ====================== */
function initAdvantagesScroll() {
  const track = document.getElementById('advantagesTrack');
  if (!track) return;
  const speed = 0.5;
  let interval = setInterval(() => {
    track.scrollLeft += speed;
    if (track.scrollLeft >= track.scrollWidth - track.clientWidth) track.scrollLeft = 0;
  }, 30);
  track.addEventListener('touchstart', () => clearInterval(interval), { passive: true });
  track.addEventListener('touchend', () => {
    interval = setInterval(() => { track.scrollLeft += speed; }, 30);
  }, { passive: true });
}

/* ====================== FEATURED GRID ====================== */
function renderFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  grid.innerHTML = '';
  featuredItems.forEach(item => {
    const el = document.createElement('a');
    el.href = item.link || '#';
    el.className = 'featured-card';
    el.addEventListener('click', () => addVisitorOnClick({ toolKey: item.toolKey, name: item.title }));
    el.innerHTML = `
      <div class="featured-img-wrap">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <div class="featured-img-gradient"></div>
      </div>
      <div class="featured-info">
        <div class="featured-title">${item.title}</div>
        <div class="featured-sub">${item.sub}</div>
        <div class="featured-visits">Dikunjungi : <span class="tool-visit-count" data-tool="${item.toolKey}">0</span></div>
      </div>`;
    grid.appendChild(el);
  });
}

/* ====================== CARD GRID ====================== */
let activeCategory = 'popular';

function renderTools() {
  const grid = document.getElementById('cardsGrid');
  const empty = document.getElementById('emptyState');
  const title = document.getElementById('sectionTitle');
  if (!grid) return;

  const list = tools.filter(t => t.category === activeCategory);
  grid.innerHTML = '';

  if (!list.length) {
    empty.hidden = false;
  } else {
    empty.hidden = true;
    list.forEach(card => {
      const el = document.createElement('a');
      el.href = card.link || '#';
      el.className = 'game-card';
      el.addEventListener('click', () => addVisitorOnClick({ toolKey: card.toolKey, name: card.name }));
      el.innerHTML = `
        <div class="card-image-wrapper">
          <img src="${card.image}" alt="${card.name}" class="card-image" loading="lazy">
          <div class="card-rating-badge"><span class="star-icon">&#9733;</span> ${card.rating}</div>
          <div class="card-gradient-overlay">
            <div class="card-title">${card.name}</div>
            ${card.toolKey ? `<div class="card-visits">Dikunjungi : <span class="tool-visit-count" data-tool="${card.toolKey}">0</span></div>` : ''}
          </div>
          <div class="card-sold-ribbon"><span class="flame">&#128293;</span> ${card.sold}</div>
        </div>`;
      grid.appendChild(el);
    });
  }

  title.textContent = activeCategory === 'popular' ? 'Lagi Populer' : title.textContent;
  refreshToolCounts();
}

function initCategories() {
  const pills = document.querySelectorAll('.category-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.dataset.category;
      if (!cat) return; // pill dekoratif / penanda (mis. GB LIKE, Akan Datang)
      activeCategory = cat;
      document.getElementById('sectionTitle').textContent = pill.textContent.trim();
      renderTools();
    });
  });
}

/* ====================== SEARCH ====================== */
function initSearchModal() {
  const btnOpen = document.getElementById('btnOpenSearch');
  const btnClose = document.getElementById('btnCloseSearch');
  const modal = document.getElementById('searchModal');
  const input = document.getElementById('searchInput');
  const grid = document.getElementById('cardsGrid');
  const empty = document.getElementById('emptyState');
  const title = document.getElementById('sectionTitle');

  btnOpen.addEventListener('click', () => { modal.classList.add('active'); input.focus(); });
  btnClose.addEventListener('click', () => { modal.classList.remove('active'); });
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { title.textContent = 'Lagi Populer'; renderTools(); return; }

    const result = tools.filter(t => t.name.toLowerCase().includes(q));
    grid.innerHTML = '';
    title.textContent = `Hasil untuk "${input.value.trim()}"`;
    empty.hidden = result.length > 0;

    result.forEach(card => {
      const el = document.createElement('a');
      el.href = card.link || '#';
      el.className = 'game-card';
      el.addEventListener('click', () => addVisitorOnClick({ toolKey: card.toolKey, name: card.name }));
      el.innerHTML = `
        <div class="card-image-wrapper">
          <img src="${card.image}" alt="${card.name}" class="card-image" loading="lazy">
          <div class="card-rating-badge"><span class="star-icon">&#9733;</span> ${card.rating}</div>
          <div class="card-gradient-overlay">
            <div class="card-title">${card.name}</div>
            ${card.toolKey ? `<div class="card-visits">Dikunjungi : <span class="tool-visit-count" data-tool="${card.toolKey}">0</span></div>` : ''}
          </div>
          <div class="card-sold-ribbon"><span class="flame">&#128293;</span> ${card.sold}</div>
        </div>`;
      grid.appendChild(el);
    });
    refreshToolCounts();
  });
}

/* ====================== VISITOR COUNTER ====================== */
const MIN = 152258;
const MAX = 19258198;
const GLOBAL_KEY = 'raden_visitor_global';
const TOOL_KEYS = {
  akundibuat: 'raden_tool_akundibuat',
  cekprime: 'raden_tool_cekprime',
  crono: 'raden_tool_crono',
  rabid67: 'raden_tool_rabid67'
};

function randomInRange() { return Math.floor(Math.random() * (MAX - MIN + 1)) + MIN; }
function formatNumber(num) { return num.toLocaleString('id-ID'); }

function getOrCreateCount(key) {
  let val = localStorage.getItem(key);
  if (val === null || isNaN(parseInt(val))) {
    val = randomInRange();
    localStorage.setItem(key, val);
  }
  return parseInt(val);
}

function updateGlobalDisplay(count) {
  const el = document.getElementById('visitorCount');
  if (el) el.textContent = formatNumber(count);
}

function refreshToolCounts() {
  Object.keys(TOOL_KEYS).forEach(toolKey => {
    const count = getOrCreateCount(TOOL_KEYS[toolKey]);
    document.querySelectorAll(`.tool-visit-count[data-tool="${toolKey}"]`).forEach(el => {
      el.textContent = formatNumber(count);
    });
  });
}

function showPlusOne() {
  const container = document.getElementById('visitorContainer');
  if (!container) return;
  const plus = document.createElement('div');
  plus.className = 'plus-one';
  plus.textContent = '+1';
  plus.style.left = `calc(50% + ${Math.random() * 25 - 12}px)`;
  plus.style.top = '25%';
  container.appendChild(plus);
  setTimeout(() => plus.remove(), 2000);
}

function addVisitorOnClick({ toolKey }) {
  let globalCount = getOrCreateCount(GLOBAL_KEY) + 1;
  localStorage.setItem(GLOBAL_KEY, globalCount);
  updateGlobalDisplay(globalCount);
  showPlusOne();

  if (toolKey && TOOL_KEYS[toolKey]) {
    const toolCount = getOrCreateCount(TOOL_KEYS[toolKey]) + 1;
    localStorage.setItem(TOOL_KEYS[toolKey], toolCount);
    document.querySelectorAll(`.tool-visit-count[data-tool="${toolKey}"]`).forEach(el => {
      el.textContent = formatNumber(toolCount);
    });
  }
}

/* ====================== INIT ====================== */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
  updateGlobalDisplay(getOrCreateCount(GLOBAL_KEY));
  initBannerSlider();
  initAdvantagesScroll();
  renderFeatured();
  initCategories();
  renderTools();
  initSearchModal();
});
