import { products } from '../data/products.js';
import { formatCurrency, uid, showToast } from '../utils.js';
import { addToCart, toggleCart } from '../store.js';
import { navigate } from '../router.js';
import { renderStarDisplay, renderProductCard } from './productCard.js';
import { renderReviewSection } from './reviewSection.js';

export function renderProductDetail(container, { id }) {
  const product = products.find(p => p.id === id);
  if (!product) {
    container.innerHTML = `
      <div class="flex flex-col items-center justify-center min-h-[60vh]">
        <p class="text-sm font-medium mb-4">Product not found</p>
        <a href="#/" class="btn-primary">Back to Shop</a>
      </div>
    `;
    return;
  }

  const images = product.images || [product.image];
  let currentImageIndex = 0;

  const specRows = Object.entries(product.specs)
    .map(([k, v]) => `
      <div class="flex justify-between py-4 border-b border-[#F5F5F5]">
        <span class="text-[10px] uppercase tracking-widest text-gray-400">${formatSpecKey(k)}</span>
        <span class="text-xs font-semibold">${v}</span>
      </div>
    `).join('');

  function renderTabs() {
    return `
      <button class="tab-btn py-4 text-[11px] uppercase tracking-[0.2em] font-bold text-black border-b-2 border-black transition-all" data-tab="details">The Details</button>
      <button class="tab-btn py-4 text-[11px] uppercase tracking-[0.2em] font-bold text-gray-400 border-b-2 border-transparent transition-all hover:text-black" data-tab="reviews">Ratings & Reviews <span class="ml-1 opacity-60 count-reviews">${product.reviews.length}</span></button>
    `;
  }

  const reviewCount = product.reviews ? product.reviews.length : 0;
  const rating = reviewCount > 0 ? (product.reviews.reduce((acc, r) => acc + r.rating, 0) / reviewCount) : 0;

  container.innerHTML = `
    <div class="max-w-7xl mx-auto px-6 md:px-12 py-8">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 mb-8">
        <a href="#/" class="hover:text-black transition-colors">Browse Products</a>
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
        <a href="#/" class="hover:text-black transition-colors">${product.type}</a>
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
        <span class="text-black">${product.name}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <!-- Left: Carousel -->
        <div class="space-y-4">
          <div class="relative bg-[#F9F9F9] aspect-[4/3] overflow-hidden group">
            <img
              id="main-product-image"
              src="${images[currentImageIndex]}"
              alt="${product.name}"
              class="w-full h-full object-contain p-8 transition-transform duration-700"
            />
            
            ${images.length > 1 ? `
              <button id="prev-img" class="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-black/5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <button id="next-img" class="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-black/5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            ` : ''}
          </div>

          <!-- Thumbnails -->
          <div class="grid grid-cols-4 gap-4">
            ${images.slice(0, 4).map((img, i) => `
              <button class="thumb-btn bg-[#F9F9F9] aspect-square border ${i === 0 ? 'border-black' : 'border-transparent'} transition-colors overflow-hidden" data-index="${i}">
                <img src="${img}" class="w-full h-full object-contain p-2" />
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Right: Content -->
        <div class="space-y-8">
          <div class="space-y-2">
            <h1 class="text-3xl font-bold tracking-tight">${product.name}</h1>
            <div class="flex items-center gap-3" id="pdp-rating-container">
              ${reviewCount > 0 
                ? `<div class="flex gap-0.5">${renderStarDisplay(rating)}</div><span class="text-[11px] text-gray-400 ml-1">(${reviewCount} review${reviewCount > 1 ? 's' : ''})</span>` 
                : `<span class="text-[11px] text-gray-400 italic">No reviews yet — be the first!</span>`
              }
            </div>
          </div>

          <div class="flex items-baseline gap-3 flex-wrap">
            <p class="text-3xl font-black">${formatCurrency(product.price)}</p>
            ${product.originalPrice ? `<p class="text-lg text-gray-400 line-through font-medium">${formatCurrency(product.originalPrice)}</p>` : ''}
            ${product.originalPrice ? `<span class="promo-pill">10% OFF</span>` : ''}
          </div>

          <div class="space-y-6">
            ${product.layout ? `
              <div class="flex items-center gap-4">
                <span class="text-[11px] uppercase tracking-widest text-gray-400 font-semibold">Standard Layout</span>
                <span class="text-sm font-bold uppercase">${product.layout}</span>
              </div>
            ` : ''}

            ${product.mounting ? `
              <div class="flex items-center gap-4">
                <span class="text-[11px] uppercase tracking-widest text-gray-400 font-semibold">Mounting</span>
                <span class="text-sm font-bold uppercase">${product.mounting}</span>
              </div>
            ` : ''}
          </div>

          <div class="flex flex-col gap-4 pt-4">
            <div class="flex items-center gap-4">
              <div class="qty-stepper h-11">
                <button id="qty-dec">−</button>
                <span id="qty-val" class="w-10">1</span>
                <button id="qty-inc">+</button>
              </div>
              <button id="add-to-cart-btn" class="btn-primary flex-1 h-11 text-xs tracking-[0.2em] font-bold uppercase">Add to cart</button>
            </div>
            <button id="buy-now-btn" class="btn-secondary w-full h-11 text-xs tracking-[0.2em] font-bold uppercase">Buy it now</button>
          </div>
        </div>
      </div>

      <!-- Tabs Section -->
      <div class="mt-20 border-b border-[#F0F0F0]">
        <div class="flex gap-8 md:gap-12" id="tab-header">
          ${renderTabs()}
        </div>
      </div>

      <!-- Tab Panels -->
      <div class="py-12">
        <div id="panel-details" class="tab-panel max-w-2xl mx-auto">
          <div class="space-y-8">
            <p class="text-sm text-gray-600 leading-relaxed text-center">${product.description}</p>
            <div class="pt-4">
              ${specRows}
            </div>
          </div>
        </div>

        <div id="panel-reviews" class="tab-panel hidden max-w-4xl mx-auto">
           <div id="reviews-container-tab"></div>
        </div>
      </div>

      <!-- Related Products -->
      <div class="mt-24 pt-16 border-t border-[#F0F0F0]">
        <div class="flex items-baseline justify-between mb-10">
          <h2 class="text-2xl font-black tracking-tight">You May Also Like</h2>
          <a href="#/" class="text-[10px] uppercase tracking-widest font-semibold text-gray-400 hover:text-black transition-colors">View All →</a>
        </div>
        <div id="related-products-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"></div>
      </div>
    </div>
  `;

  // --- Logic ---

  function updateTabCounts() {
    const revCount = container.querySelector('.count-reviews');
    if (revCount) revCount.textContent = product.reviews.length;
  }
  
  function updateRatingDisplay() {
    const pdpRatingContainer = container.querySelector('#pdp-rating-container');
    const newReviewCount = product.reviews ? product.reviews.length : 0;
    const newRating = newReviewCount > 0 ? (product.reviews.reduce((acc, r) => acc + r.rating, 0) / newReviewCount) : 0;
    if (pdpRatingContainer) {
      pdpRatingContainer.innerHTML = newReviewCount > 0
        ? `<div class="flex gap-0.5">${renderStarDisplay(newRating)}</div><span class="text-[11px] text-gray-400 ml-1">(${newReviewCount} review${newReviewCount > 1 ? 's' : ''})</span>`
        : `<span class="text-[11px] text-gray-400 italic">No reviews yet — be the first!</span>`;
    }
  }

  // Carousel
  const mainImg = container.querySelector('#main-product-image');
  const thumbs = container.querySelectorAll('.thumb-btn');
  function updateGallery(index) {
    currentImageIndex = (index + images.length) % images.length;
    mainImg.src = images[currentImageIndex];
    thumbs.forEach((t, i) => {
      t.classList.toggle('border-black', i === currentImageIndex);
      t.classList.toggle('border-transparent', i !== currentImageIndex);
    });
  }
  container.querySelector('#prev-img')?.addEventListener('click', () => updateGallery(currentImageIndex - 1));
  container.querySelector('#next-img')?.addEventListener('click', () => updateGallery(currentImageIndex + 1));
  thumbs.forEach(btn => btn.addEventListener('click', () => updateGallery(parseInt(btn.dataset.index))));

  // Tabs
  function initTabListeners() {
    const tabBtns = container.querySelectorAll('.tab-btn');
    const tabPanels = container.querySelectorAll('.tab-panel');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        tabBtns.forEach(b => {
          const isActive = b.dataset.tab === target;
          b.classList.toggle('text-black', isActive);
          b.classList.toggle('border-black', isActive);
          b.classList.toggle('text-gray-400', !isActive);
          b.classList.toggle('border-transparent', !isActive);
          b.classList.toggle('active-tab', isActive);
        });
        tabPanels.forEach(p => p.classList.toggle('hidden', p.id !== `panel-${target}`));
      });
    });
    // Activate first tab by default
    tabBtns[0]?.classList.add('active-tab');
  }
  initTabListeners();

  // Qty
  let qty = 1;
  const qtyVal = container.querySelector('#qty-val');
  container.querySelector('#qty-dec').addEventListener('click', () => {
    if (qty > 1) { qty--; qtyVal.textContent = qty; }
  });
  container.querySelector('#qty-inc').addEventListener('click', () => {
    qty++;
    qtyVal.textContent = qty;
  });

  // Cart
  container.querySelector('#add-to-cart-btn').addEventListener('click', () => {
    addToCart(product, qty);
    showToast('Added to bag');
    toggleCart(true);
  });

  container.querySelector('#buy-now-btn').addEventListener('click', () => {
    addToCart(product, qty);
    navigate('/checkout');
  });

  // Render Reviews
  const reviewsTarget = container.querySelector('#reviews-container-tab');
  if (reviewsTarget) {
    renderReviewSection(reviewsTarget, product, () => {
      showToast('Review submitted successfully');
      updateTabCounts();
    });
  }

  // Render Related Products
  const relatedGrid = container.querySelector('#related-products-grid');
  if (relatedGrid) {
    const related = products.filter(p => p.id !== product.id).slice(0, 4);
    related.forEach(p => {
      relatedGrid.appendChild(renderProductCard(p));
    });
  }

  window.scrollTo(0, 0);
}

function formatSpecKey(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, s => s.toUpperCase())
    .trim();
}
