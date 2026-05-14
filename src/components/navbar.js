import { getState, toggleCart, getCartCount, subscribe } from '../store.js';
import { navigate } from '../router.js';

export function renderNavbar() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  nav.innerHTML = `
    <!-- Top Promo Bar -->
    <div class="bg-black text-white text-center py-2.5 px-6">
      <p class="text-[10px] uppercase tracking-[0.2em] font-bold">
        Limited Edition Sale: <span class="text-red-500">10% OFF</span> on MOD007 Year of Dragon — Today Only.
      </p>
    </div>

    <div class="flex items-center justify-between px-6 md:px-12 py-5 border-b border-brand-gray">
      <!-- Logo -->
      <a href="#/" id="nav-logo" class="flex items-center gap-3 cursor-pointer select-none">
        <span class="text-lg md:text-xl font-bold tracking-tight uppercase">Not My Type</span>
      </a>

      <!-- Desktop links -->
      <nav class="hidden md:flex items-center gap-8" aria-label="Main navigation">
        <a href="#/" class="text-xs font-medium uppercase tracking-widest hover:opacity-50 transition-opacity">Shop</a>
        <a href="#/tracking" class="text-xs font-medium uppercase tracking-widest hover:opacity-50 transition-opacity">My Order</a>
      </nav>

      <!-- Right icons -->
      <div class="flex items-center gap-5">
        <!-- Search toggle -->
        <button id="search-toggle" class="p-1 hover:opacity-50 transition-opacity" aria-label="Search">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </button>

        <!-- Cart -->
        <button id="cart-toggle" class="p-1 hover:opacity-50 transition-opacity relative" aria-label="Cart">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <span id="cart-badge" class="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[10px] font-bold flex items-center justify-center rounded-full opacity-0 transition-opacity">0</span>
        </button>

        <!-- Mobile menu toggle -->
        <button id="mobile-menu-toggle" class="md:hidden p-1 hover:opacity-50 transition-opacity" aria-label="Menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>
        </button>
      </div>
    </div>

    <!-- Search bar (hidden by default) -->
    <div id="search-bar" class="hidden border-b border-brand-gray px-6 md:px-12 py-4">
      <input type="text" id="search-input" class="input-minimal" placeholder="Search keyboards, switches, keycaps…" />
    </div>

    <!-- Mobile menu (hidden by default) -->
    <div id="mobile-menu" class="hidden md:hidden border-b border-brand-gray">
      <div class="flex flex-col px-6 py-4 gap-4">
        <a href="#/" class="text-xs font-medium uppercase tracking-widest">Shop</a>
        <a href="#/tracking" class="text-xs font-medium uppercase tracking-widest">My Order</a>
      </div>
    </div>
  `;

  // Search toggle
  document.getElementById('search-toggle').addEventListener('click', () => {
    const bar = document.getElementById('search-bar');
    bar.classList.toggle('hidden');
    if (!bar.classList.contains('hidden')) {
      document.getElementById('search-input').focus();
    }
  });

  // Cart toggle
  document.getElementById('cart-toggle').addEventListener('click', () => {
    toggleCart(true);
  });

  // Mobile menu toggle
  document.getElementById('mobile-menu-toggle').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('hidden');
  });

  // Update badge on state change
  const updateBadge = () => {
    const count = getCartCount();
    const badge = document.getElementById('cart-badge');
    if (badge) {
      badge.textContent = count;
      badge.style.opacity = count > 0 ? '1' : '0';
    }
  };

  subscribe(updateBadge);
  updateBadge();
}
