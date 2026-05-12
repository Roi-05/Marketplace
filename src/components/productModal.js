import { formatCurrency } from '../utils.js';
import { addToCart, toggleCart } from '../store.js';
import { navigate } from '../router.js';
import { renderStarDisplay } from './productCard.js';
import { renderReviewSection } from './reviewSection.js';

let currentProduct = null;

export function openProductModal(product) {
  currentProduct = product;
  const backdrop = document.getElementById('modal-backdrop');
  const container = document.getElementById('product-modal');
  const body = document.getElementById('modal-body');

  if (!backdrop || !container || !body) return;

  const specRows = Object.entries(product.specs)
    .map(([k, v]) => `
      <div class="flex justify-between py-3 border-b border-[#F5F5F5]">
        <span class="text-xs uppercase tracking-widest text-gray-400">${formatSpecKey(k)}</span>
        <span class="text-xs font-medium">${v}</span>
      </div>
    `).join('');

  body.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 min-h-[60vh]">
      <!-- Image -->
      <div class="bg-[#F9F9F9] flex items-center justify-center p-8 md:p-12 aspect-square md:aspect-auto">
        <img
          src="${product.image}"
          alt="${product.name}"
          class="w-full h-full object-contain max-h-[400px]"
          onerror="this.src='https://placehold.co/600x600/F5F5F5/CCCCCC?text=${encodeURIComponent(product.name)}'"
        />
      </div>

      <!-- Details -->
      <div class="flex flex-col p-8 md:p-10 overflow-y-auto">
        <!-- Close -->
        <div class="flex justify-end mb-6">
          <button id="modal-close" class="p-1 hover:opacity-50 transition-opacity" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <!-- Meta tags -->
        <div class="flex flex-wrap gap-1 mb-3">
          <span class="text-[10px] uppercase tracking-wider text-gray-400 border border-[#E0E0E0] px-2 py-0.5">${product.type}</span>
          ${product.layout ? `<span class="text-[10px] uppercase tracking-wider text-gray-400 border border-[#E0E0E0] px-2 py-0.5">${product.layout}</span>` : ''}
          ${product.mounting ? `<span class="text-[10px] uppercase tracking-wider text-gray-400 border border-[#E0E0E0] px-2 py-0.5">${product.mounting}</span>` : ''}
        </div>

        <h1 class="text-2xl font-bold tracking-tight mb-1">${product.name}</h1>

        <div class="flex items-center gap-2 mb-4">
          <div class="flex gap-0.5">${renderStarDisplay(product.rating)}</div>
          <span class="text-xs text-gray-400">(${product.reviewCount} reviews)</span>
        </div>

        <p class="text-sm text-gray-600 leading-relaxed mb-6">${product.description}</p>

        <div class="text-2xl font-bold mb-6">${formatCurrency(product.price)}</div>

        <!-- Quantity -->
        <div class="flex items-center gap-4 mb-6">
          <span class="text-xs uppercase tracking-widest text-gray-400">Qty</span>
          <div class="qty-stepper" id="modal-qty-stepper">
            <button id="modal-qty-dec" aria-label="Decrease">−</button>
            <span id="modal-qty">1</span>
            <button id="modal-qty-inc" aria-label="Increase">+</button>
          </div>
        </div>

        <!-- CTAs -->
        <div class="flex flex-col sm:flex-row gap-3 mb-8">
          <button id="modal-add-cart" class="btn-primary flex-1">Add to Cart</button>
          <button id="modal-buy-now" class="btn-secondary flex-1">Buy Now</button>
        </div>

        <!-- Specs -->
        <div>
          <h3 class="text-[11px] font-semibold uppercase tracking-widest mb-2">Specifications</h3>
          ${specRows}
        </div>

        <!-- Reviews -->
        <div id="modal-reviews" class="mt-8"></div>
      </div>
    </div>
  `;

  // Render reviews section
  const reviewsEl = body.querySelector('#modal-reviews');
  if (reviewsEl) renderReviewSection(reviewsEl, product);

  // Qty stepper logic
  let qty = 1;
  const qtyDisplay = body.querySelector('#modal-qty');
  body.querySelector('#modal-qty-dec').addEventListener('click', () => {
    if (qty > 1) { qty--; qtyDisplay.textContent = qty; }
  });
  body.querySelector('#modal-qty-inc').addEventListener('click', () => {
    qty++;
    qtyDisplay.textContent = qty;
  });

  // Add to cart
  body.querySelector('#modal-add-cart').addEventListener('click', () => {
    addToCart(product, qty);
    closeProductModal();
    toggleCart(true);
  });

  // Buy Now
  body.querySelector('#modal-buy-now').addEventListener('click', () => {
    addToCart(product, qty);
    closeProductModal();
    navigate('/checkout');
  });

  // Close button
  body.querySelector('#modal-close').addEventListener('click', closeProductModal);

  backdrop.classList.add('open');
  container.classList.add('open');
  document.body.style.overflow = 'hidden';
}

export function closeProductModal() {
  const backdrop = document.getElementById('modal-backdrop');
  const container = document.getElementById('product-modal');
  if (backdrop) backdrop.classList.remove('open');
  if (container) container.classList.remove('open');
  document.body.style.overflow = '';
}

function formatSpecKey(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, s => s.toUpperCase())
    .trim();
}
