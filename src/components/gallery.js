import { products } from '../data/products.js';
import { getState, subscribe } from '../store.js';
import { renderProductCard } from './productCard.js';
import { renderFilterBar } from './filterBar.js';
import { openProductModal } from './productModal.js';

export function renderGallery(container) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <!-- Section header -->
    <div class="px-6 md:px-12 pt-16 pb-10">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p class="text-[10px] uppercase tracking-[0.25em] text-red-500 font-bold mb-3">New Collection — 2026</p>
          <h1 class="text-4xl md:text-5xl font-black tracking-tight leading-[1.05] max-w-lg">
            Every keystroke,<br/><span class="text-gray-300">a statement.</span>
          </h1>
        </div>
        <p class="text-[11px] text-gray-400 max-w-xs leading-relaxed md:text-right">
          Curated mechanical keyboards, switches, and keycaps for enthusiasts who demand perfection.
        </p>
      </div>
    </div>

    <!-- Divider -->
    <div class="px-6 md:px-12">
      <div class="h-px bg-[#F0F0F0]"></div>
    </div>

    <!-- Filter bar -->
    <div id="filter-bar-wrapper"></div>

    <!-- Product grid -->
    <div class="px-6 md:px-12 py-10">
      <div id="product-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14"></div>
      <div id="no-results" class="hidden py-20 text-center">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
        <p class="text-sm font-bold mb-1">No products found</p>
        <p class="text-[11px] text-gray-400">Try adjusting your filters or search term.</p>
      </div>
    </div>
  `;
  container.appendChild(wrapper);

  const filterWrapper = wrapper.querySelector('#filter-bar-wrapper');
  renderFilterBar(filterWrapper, renderProducts);

  renderProducts();
  subscribe(() => renderProducts());

  function renderProducts() {
    const { filters } = getState();
    const grid = wrapper.querySelector('#product-grid');
    const noResults = wrapper.querySelector('#no-results');
    if (!grid) return;

    const filtered = products.filter(p => {
      if (filters.type && p.type !== filters.type) return false;
      if (filters.mounting && p.mounting !== filters.mounting) return false;
      if (filters.layout && p.layout !== filters.layout) return false;
      return true;
    });

    const searchInput = document.querySelector('#search-input');
    const query = searchInput?.value?.toLowerCase().trim();
    const displayed = query
      ? filtered.filter(p =>
          p.name.toLowerCase().includes(query) ||
          p.type.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
        )
      : filtered;

    grid.innerHTML = '';
    if (displayed.length === 0) {
      noResults.classList.remove('hidden');
    } else {
      noResults.classList.add('hidden');
      displayed.forEach((product, i) => {
        const card = renderProductCard(product, openProductModal);
        card.style.animationDelay = `${i * 60}ms`;
        card.classList.add('page-enter');
        grid.appendChild(card);
      });
    }
  }

  document.addEventListener('input', (e) => {
    if (e.target.id === 'search-input') renderProducts();
  });
}
