import { getState, toggleCart, getCartCount, subscribe } from '../store.js';
import { navigate } from '../router.js';

export function renderNavbar() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  nav.innerHTML = `
    <!-- Top Promo Bar (Marquee) -->
    <div class="bg-[#0A0A0A] text-white overflow-hidden py-2.5 relative">
      <div class="marquee-track pointer-events-none select-none">
        ${[1,2,3,4].map(() => `
          <span class="inline-flex items-center gap-6 px-8 text-[10px] uppercase tracking-[0.2em] font-bold whitespace-nowrap">
            <span class="text-red-400">10% OFF</span> MOD007 Year of Dragon — Limited Edition
            <span class="text-white/20 mx-2">✦</span>
            Free Shipping on orders over ₱5,000
            <span class="text-white/20 mx-2">✦</span>
            Authentic Keyboards, Switches, and Keycaps
            <span class="text-white/20 mx-2">✦</span>
          </span>
        `).join('')}
      </div>
    </div>

    <!-- Main Nav -->
    <div id="nav-main" class="flex items-center justify-between px-6 md:px-12 py-4 border-b border-[#F5F5F5] bg-white/95 backdrop-blur-md transition-all duration-300">
      <!-- Logo -->
      <a href="#/" id="nav-logo" class="flex items-center gap-3 cursor-pointer select-none group">
        <div class="w-7 h-7 bg-black flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:rotate-12">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10"/>
          </svg>
        </div>
        <span class="text-base md:text-lg font-black tracking-tight uppercase leading-none">Not My Type</span>
      </a>

      <!-- Desktop links -->
      <nav class="hidden md:flex items-center gap-10" aria-label="Main navigation">
        <a href="#/" class="nav-link text-[11px] font-semibold uppercase tracking-widest text-gray-600 hover:text-black transition-colors">Shop</a>
        <a href="#/tracking" class="nav-link text-[11px] font-semibold uppercase tracking-widest text-gray-600 hover:text-black transition-colors">My Order</a>
      </nav>

      <!-- Right icons -->
      <div class="flex items-center gap-4">
        <!-- Search toggle -->
        <button id="search-toggle" class="p-2 hover:bg-gray-100 rounded-full transition-all duration-200" aria-label="Search">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </button>

        <!-- Cart -->
        <button id="cart-toggle" class="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 relative" aria-label="Cart">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <span id="cart-badge" class="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] min-h-[18px] bg-red-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full opacity-0 transition-all duration-200 leading-none px-1" style="opacity:0">0</span>
        </button>

        <!-- Mobile menu toggle -->
        <button id="mobile-menu-toggle" class="md:hidden p-2 hover:bg-gray-100 rounded-full transition-all duration-200" aria-label="Menu">
          <svg id="menu-icon-open" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>
          <svg id="menu-icon-close" class="hidden" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
    </div>

    <!-- Search bar -->
    <div id="search-bar" class="hidden border-b border-[#F5F5F5] px-6 md:px-12 py-3 bg-white">
      <div class="flex items-center gap-3 max-w-lg mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="text" id="search-input" class="flex-1 py-2 bg-transparent outline-none text-sm placeholder:text-gray-400" placeholder="Search keyboards, switches, keycaps…" />
        <button id="search-close" class="text-gray-400 hover:text-black transition-colors text-xs uppercase tracking-widest font-medium">Close</button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div id="mobile-menu" class="hidden md:hidden border-b border-[#F5F5F5] bg-white">
      <div class="flex flex-col px-6 py-5 gap-5">
        <a href="#/" class="text-[11px] font-semibold uppercase tracking-widest flex items-center justify-between group">
          Shop
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="opacity-0 group-hover:opacity-100 transition-opacity"><path d="m9 18 6-6-6-6"/></svg>
        </a>
        <a href="#/tracking" class="text-[11px] font-semibold uppercase tracking-widest flex items-center justify-between group">
          My Order
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="opacity-0 group-hover:opacity-100 transition-opacity"><path d="m9 18 6-6-6-6"/></svg>
        </a>
      </div>
    </div>
  `;

  // Search toggle
  const searchBar = document.getElementById('search-bar');
  document.getElementById('search-toggle').addEventListener('click', () => {
    const isHidden = searchBar.classList.contains('hidden');
    searchBar.classList.toggle('hidden');
    if (isHidden) {
      document.getElementById('search-input').focus();
      document.getElementById('search-toggle').classList.add('bg-gray-100');
    } else {
      document.getElementById('search-toggle').classList.remove('bg-gray-100');
    }
  });
  document.getElementById('search-close')?.addEventListener('click', () => {
    searchBar.classList.add('hidden');
    document.getElementById('search-toggle').classList.remove('bg-gray-100');
  });

  // Cart toggle
  document.getElementById('cart-toggle').addEventListener('click', () => {
    toggleCart(true);
  });

  // Mobile menu toggle
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');
  document.getElementById('mobile-menu-toggle').addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    iconOpen.classList.toggle('hidden', !isHidden);
    iconClose.classList.toggle('hidden', isHidden);
  });

  // Shrink nav on scroll
  window.addEventListener('scroll', () => {
    const navMain = document.getElementById('nav-main');
    if (navMain) {
      if (window.scrollY > 40) {
        navMain.classList.add('py-3');
        navMain.classList.remove('py-4');
      } else {
        navMain.classList.add('py-4');
        navMain.classList.remove('py-3');
      }
    }
  }, { passive: true });

  // Update cart badge
  const updateBadge = () => {
    const count = getCartCount();
    const badge = document.getElementById('cart-badge');
    if (badge) {
      const prev = parseInt(badge.textContent) || 0;
      badge.textContent = count;
      badge.style.opacity = count > 0 ? '1' : '0';
      if (count > prev) {
        badge.classList.add('badge-pulse');
        setTimeout(() => badge.classList.remove('badge-pulse'), 400);
      }
    }
  };

  subscribe(updateBadge);
  updateBadge();
}
