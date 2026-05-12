import './style.css';
import { renderNavbar } from './components/navbar.js';
import { initCart } from './components/cart.js';
import { renderGallery } from './components/gallery.js';
import { renderProductDetail } from './components/productDetail.js';
import { renderCheckout } from './components/checkout.js';
import { renderOrderTracking } from './components/orderTracking.js';
import { route, start } from './router.js';
import { getState } from './store.js';

// ── Routes ───────────────────────────────────────────────────────────
route('/', (container) => {
  renderGallery(container);
});

route('/product/:id', (container, params) => {
  renderProductDetail(container, params);
});

route('/checkout', (container) => {
  const { cart } = getState();
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <p class="text-sm font-medium mb-2">Your cart is empty</p>
        <p class="text-[11px] text-gray-400 mb-6">Add some products before checking out.</p>
        <a href="#/" class="btn-primary">Browse Shop</a>
      </div>
    `;
  } else {
    renderCheckout(container);
  }
});

route('/tracking', (container) => {
  renderOrderTracking(container);
});

// ── Bootstrap ────────────────────────────────────────────────────────
function init() {
  // Render persistent navbar
  renderNavbar();

  // Init cart drawer
  initCart();

  // Start router
  start();
}

init();
