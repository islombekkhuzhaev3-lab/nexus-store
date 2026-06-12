/* =============================================
   ANTIGRAVITY HUB — Main Application Logic
   ============================================= */

// =============================================
// DATA STORES
// =============================================

const TRACKS = [
  {
    id: 1,
    title: 'Antigravity Drift (Original Mix)',
    artist: 'DJ Antigravity',
    duration: '03:42',
    durationSec: 222,
    cover: 'https://images.unsplash.com/photo-1614680376593-902f74fa0d41?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'Neon Skyline (Ambient Edit)',
    artist: 'Shaxboz Music',
    duration: '04:15',
    durationSec: 255,
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'Luxury Bassline (House Tech)',
    artist: 'Umid & Brand Studio',
    duration: '02:58',
    durationSec: 178,
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    title: 'Midnight Shield (Lo-fi PPF)',
    artist: 'CarWrap Beats',
    duration: '03:21',
    durationSec: 201,
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80',
  },
  {
    id: 5,
    title: 'Cyberpunk Boulevard (Synthwave)',
    artist: 'DJ Antigravity',
    duration: '05:02',
    durationSec: 302,
    cover: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&auto=format&fit=crop&q=80',
  },
];

const PRODUCTS = [
  {
    id: 'p1',
    name: 'Antigravity PPF Ultra Shield',
    category: 'Автомобиль ҳимояси',
    price: 1800000,
    description: 'Машина кузови учун тош ва тирналишлардан ҳимоя қилувчи, ўзи даволанувчи (self-healing) полиуретан плёнка.',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
  },
  {
    id: 'p2',
    name: 'Ceramic Coating 9H Diamond',
    category: 'Гидрофоб қоплама',
    price: 650000,
    description: 'Кузов учун 3 йиллик ҳимоя, кристалдек ёрқинлик ва сув қочириш хусусиятини берувчи керамо-қоплама.',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
  },
  {
    id: 'p3',
    name: 'Antigravity Cyber Hoodie',
    category: 'Бренд мерч',
    price: 350000,
    description: 'Рефлектив неон логотипи туширилган, 100% органик пахтадан тайёрланган премиум кийим.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80',
    rating: 4.7,
  },
  {
    id: 'p4',
    name: 'Matte Satin Carbon Wrap',
    category: 'Виниль плёнка',
    price: 2200000,
    description: 'Сатин карбон кўринишдаги виниль плёнка. Машинага спорт ва агрессив дизайн бағишлайди.',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
  },
  {
    id: 'p5',
    name: 'Detailing Kit Pro',
    category: 'Аксессуарлар',
    price: 480000,
    description: 'Профессионал детайлинг тўплами: микрофибра салфеткалар, полирол ва шампунь.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&auto=format&fit=crop&q=80',
    rating: 4.6,
  },
  {
    id: 'p6',
    name: 'Windshield PPF Film',
    category: 'Шиша ҳимояси',
    price: 950000,
    description: 'Олд ойна учун антигравий плёнка. Тошлардан ва зарбалардан ойнани сақлайди.',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
  },
];

const INITIAL_ADS = [
  {
    id: 'a1',
    title: 'BMW M4 учун тайёр антигравий лекаллари',
    category: 'Аксессуарлар',
    price: '1 200 000 сум',
    description: 'BMW M4 (2021+) кузови учун компьютерда кесилган ҳимоя плёнкаси тайёр лекаллари.',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&auto=format&fit=crop&q=80',
    status: 'approved',
  },
  {
    id: 'a2',
    title: 'Студия микрафони — Shure SM7B',
    category: 'Мусиқа асбоблари',
    price: '3 500 000 сум',
    description: 'Shure SM7B микрофони, жуда яхши ҳолатда. Ижодкорлар учун овоз ёзишга жуда қулай.',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&auto=format&fit=crop&q=80',
    status: 'approved',
  },
];

// =============================================
// STATE
// =============================================

let cart = {};
let currentTrackIdx = 0;
let isPlaying = false;
let playInterval = null;
let currentProgress = 0;
let adsList = [...INITIAL_ADS];

// =============================================
// UTILITY FUNCTIONS
// =============================================

function formatPrice(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' сум';
}

function showDbHud(msg) {
  const hud = document.getElementById('db-hud');
  const txt = document.getElementById('db-hud-msg');
  txt.textContent = msg;
  hud.classList.add('visible');
  setTimeout(() => hud.classList.remove('visible'), 3500);
}

function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// =============================================
// THEME TOGGLE
// =============================================

document.getElementById('theme-toggle').addEventListener('click', () => {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'cyberpunk' ? 'luxury' : 'cyberpunk';
  html.setAttribute('data-theme', next);

  const logoIcon = document.querySelector('.logo-icon');
  logoIcon.textContent = next === 'cyberpunk' ? '⚡' : '⚜';

  showToast(next === 'cyberpunk' ? 'Cyberpunk Neon мавзуси фаоллаштирилди' : 'Minimalist Luxury мавзуси фаоллаштирилди');

  lucide.createIcons();
});

// =============================================
// NAV SCROLL HIGHLIGHTING
// =============================================

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function () {
    document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

// =============================================
// PHONE SIMULATOR NAVIGATION
// =============================================

function navigateSim(screen) {
  document.querySelectorAll('.sim-screen').forEach(s => s.classList.remove('active'));
  document.getElementById(`sim-${screen}`).classList.add('active');
  if (screen === 'home') {
    showDbHud('Firebase: auth.signInWithPhoneNumber("+998...")');
  }
  lucide.createIcons();
}

let postLiked = {};
function togglePostLike(postId) {
  const icon = document.getElementById(`like-icon-${postId}`);
  const cnt = document.getElementById(`like-cnt-${postId}`);
  const btn = icon.closest('.post-action-btn');

  if (postLiked[postId]) {
    postLiked[postId] = false;
    btn.classList.remove('liked');
    cnt.textContent = parseInt(cnt.textContent) - 1;
    showDbHud(`Firebase: posts/${postId}/likes -= 1`);
  } else {
    postLiked[postId] = true;
    btn.classList.add('liked');
    cnt.textContent = parseInt(cnt.textContent) + 1;
    showDbHud(`Firebase: posts/${postId}/likes += 1`);
  }
}

function showCommentDrawer() {
  showToast('Изоҳлар бўлими очилди');
  showDbHud('Firebase: db.ref("posts/1/comments").on("value")');
}

function sharePost() {
  showToast('Ҳавола нусхаланди!');
  showDbHud('Firebase: analytics.logEvent("share_post")');
}

// =============================================
// MUSIC PLAYER
// =============================================

function renderPlaylist() {
  const container = document.getElementById('playlist-container');
  container.innerHTML = TRACKS.map((t, i) => `
    <div class="playlist-item ${i === currentTrackIdx ? 'active' : ''}" onclick="selectTrack(${i})">
      <div class="playlist-cover"><img src="${t.cover}" alt="${t.title}"></div>
      <div class="playlist-info">
        <strong>${t.title}</strong>
        <small>${t.artist}</small>
      </div>
      <span class="playlist-duration">${t.duration}</span>
    </div>
  `).join('');
}

function updatePlayerUI() {
  const track = TRACKS[currentTrackIdx];
  document.getElementById('track-title').textContent = track.title;
  document.getElementById('track-artist').textContent = track.artist;
  document.getElementById('player-cover-img').src = track.cover;
  document.getElementById('total-time').textContent = track.duration;
  renderPlaylist();
}

function selectTrack(idx) {
  currentTrackIdx = idx;
  currentProgress = 0;
  updatePlayerUI();
  updateProgress();
  showDbHud(`Firebase: analytics.logEvent("select_track", { id: ${TRACKS[idx].id} })`);
  if (isPlaying) startPlayback();
}

function togglePlay() {
  isPlaying = !isPlaying;
  const btn = document.getElementById('play-btn');

  if (isPlaying) {
    btn.innerHTML = '<i data-lucide="pause"></i>';
    startPlayback();
    showDbHud(`Firebase: analytics.logEvent("play_track", { id: ${TRACKS[currentTrackIdx].id} })`);
  } else {
    btn.innerHTML = '<i data-lucide="play"></i>';
    stopPlayback();
  }
  lucide.createIcons();
}

function startPlayback() {
  stopPlayback();
  playInterval = setInterval(() => {
    const track = TRACKS[currentTrackIdx];
    currentProgress += 1;
    if (currentProgress >= track.durationSec) {
      nextTrack();
      return;
    }
    updateProgress();
  }, 1000);
}

function stopPlayback() {
  if (playInterval) {
    clearInterval(playInterval);
    playInterval = null;
  }
}

function updateProgress() {
  const track = TRACKS[currentTrackIdx];
  const pct = (currentProgress / track.durationSec) * 100;
  document.getElementById('track-progress').style.width = pct + '%';
  document.getElementById('current-time').textContent = formatTime(currentProgress);
}

function nextTrack() {
  currentTrackIdx = (currentTrackIdx + 1) % TRACKS.length;
  currentProgress = 0;
  updatePlayerUI();
  updateProgress();
  if (isPlaying) startPlayback();
}

function prevTrack() {
  currentTrackIdx = currentTrackIdx === 0 ? TRACKS.length - 1 : currentTrackIdx - 1;
  currentProgress = 0;
  updatePlayerUI();
  updateProgress();
  if (isPlaying) startPlayback();
}

// =============================================
// MARKETPLACE — PRODUCT RENDERING
// =============================================

function renderProducts() {
  const container = document.getElementById('products-container');
  container.innerHTML = PRODUCTS.map(p => `
    <div class="product-card" id="product-${p.id}">
      <div class="product-img">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <span class="product-rating">★ ${p.rating}</span>
      </div>
      <div class="product-body">
        <div class="product-cat">${p.category}</div>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.description}</p>
        <div class="product-footer">
          <span class="product-price">${formatPrice(p.price)}</span>
          <button class="btn-add-cart" onclick="addToCart('${p.id}')">
            <i data-lucide="plus"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

// =============================================
// SHOPPING CART
// =============================================

function addToCart(productId) {
  cart[productId] = (cart[productId] || 0) + 1;
  updateCartBadge();
  showToast('Маҳсулот саватга қўшилди!');
  showDbHud(`Firebase: cart.update("${productId}", qty: ${cart[productId]})`);
}

function removeFromCart(productId) {
  if (!cart[productId]) return;
  cart[productId]--;
  if (cart[productId] <= 0) delete cart[productId];
  updateCartBadge();
  renderCartItems();
  showDbHud(`Firebase: cart.update("${productId}", qty: ${cart[productId] || 0})`);
}

function increaseQty(productId) {
  cart[productId] = (cart[productId] || 0) + 1;
  updateCartBadge();
  renderCartItems();
}

function updateCartBadge() {
  const count = Object.values(cart).reduce((sum, v) => sum + v, 0);
  document.getElementById('cart-count').textContent = count;
}

function getCartTotal() {
  return Object.entries(cart).reduce((total, [pid, qty]) => {
    const prod = PRODUCTS.find(p => p.id === pid);
    return total + (prod ? prod.price * qty : 0);
  }, 0);
}

function renderCartItems() {
  const container = document.getElementById('cart-items-container');
  const entries = Object.entries(cart);

  if (entries.length === 0) {
    container.innerHTML = `<div class="empty-cart"><svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg><span>Саватча бўш</span></div>`;
    document.getElementById('cart-total-price').textContent = '0 сум';
    return;
  }

  container.innerHTML = entries.map(([pid, qty]) => {
    const p = PRODUCTS.find(pr => pr.id === pid);
    if (!p) return '';
    return `<div class="cart-item"><div class="cart-item-img"><img src="${p.image}" alt="${p.name}"></div><div class="cart-item-details"><h4>${p.name}</h4><div class="cart-item-price">${formatPrice(p.price * qty)}</div><div class="cart-qty-controls"><button class="btn-qty" onclick="removeFromCart('${p.id}')">−</button><span class="cart-qty-text">${qty}</span><button class="btn-qty" onclick="increaseQty('${p.id}')">+</button></div></div></div>`;
  }).join('');

  document.getElementById('cart-total-price').textContent = formatPrice(getCartTotal());
}

document.getElementById('cart-btn').addEventListener('click', () => {
  renderCartItems();
  document.getElementById('cart-drawer').classList.add('open');
  document.getElementById('cart-overlay').classList.add('visible');
});

document.getElementById('close-cart-btn').addEventListener('click', closeCart);
document.getElementById('cart-overlay').addEventListener('click', closeCart);

function closeCart() {
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('visible');
}

function checkoutCart() {
  const total = getCartTotal();
  if (total === 0) {
    showToast('Саватча бўш!');
    return;
  }
  showDbHud(`Firebase: orders.add({ total: ${total}, method: "Payme", status: "Paid" })`);
  showToast('Тўлов муваффақиятли! Буюртмангиз қабул қилинди.');
  cart = {};
  updateCartBadge();
  renderCartItems();
  setTimeout(closeCart, 1500);
}

// =============================================
// ADS SECTION
// =============================================

function renderAds() {
  const container = document.getElementById('ads-container');
  container.innerHTML = adsList.map(ad => `
    <div class="ad-card" id="ad-${ad.id}">
      <div class="ad-img"><img src="${ad.image}" alt="${ad.title}" loading="lazy"></div>
      <div class="ad-body">
        <div>
          <div class="ad-cat">${ad.category}</div>
          <div class="ad-name">${ad.title}</div>
          <div class="ad-desc">${ad.description}</div>
        </div>
        <div class="ad-meta">
          <span class="ad-price">${ad.price}</span>
          <span class="ad-status ${ad.status}">${ad.status === 'approved' ? 'Фаол' : 'Модерацияда'}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function submitAd(e) {
  e.preventDefault();

  const title = document.getElementById('ad-title').value.trim();
  const category = document.getElementById('ad-category').value;
  const price = document.getElementById('ad-price').value;
  const desc = document.getElementById('ad-desc').value.trim();

  if (!title || !price || !desc) return;

  const priceStr = parseInt(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' сум';

  const newAd = {
    id: 'a_' + Date.now(),
    title,
    category,
    price: priceStr,
    description: desc,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&auto=format&fit=crop&q=80',
    status: 'pending',
  };

  adsList.unshift(newAd);
  renderAds();

  showDbHud(`Firebase: db.collection("ads").add({ title: "${title}", status: "Pending" })`);
  showToast('Эълонингиз модерацияга юборилди!');

  document.getElementById('ad-form').reset();
}

// =============================================
// SMOOTH SCROLL FOR NAV
// =============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// =============================================
// SCROLL SPY
// =============================================

window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// =============================================
// INTERSECTION OBSERVER
// =============================================

const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

function observeElements() {
  document.querySelectorAll('.product-card, .ad-card, .player-widget, .playlist-card, .ads-form-card, .console-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// =============================================
// INIT
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  renderPlaylist();
  updatePlayerUI();
  renderProducts();
  renderAds();

  setTimeout(observeElements, 100);

  setTimeout(() => showDbHud('Firebase: app.initializeApp(config) ✓ Уланиш муваффақиятли'), 800);
});