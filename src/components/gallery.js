import { products } from '../data/products.js';
import { getState, subscribe } from '../store.js';
import { renderProductCard } from './productCard.js';
import { renderFilterBar } from './filterBar.js';
import { openProductModal } from './productModal.js';

export function renderGallery(container) {
  container.innerHTML = `
    <!-- Hero / heading -->
    <div class="px-6 md:px-12 pt-12 pb-8">
      <p class="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-3">New Collection — 2026</p>
      <h1 class="text-4xl md:text-5xl font-bold tracking-tight leading-tight max-w-xl">
        Every keystroke,<br />a statement.
      </h1>
    </div>

    <!-- Filter bar -->
    <div id="filter-bar-wrapper"></div>

    <!-- Product grid -->
    <div class="px-6 md:px-12 py-10">
      <div id="product-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"></div>
      <div id="no-results" class="hidden py-20 text-center">
        <p class="text-sm font-medium mb-1">No products found</p>
        <p class="text-[11px] text-gray-400">Try adjusting your filters.</p>
      </div>
    </div>
  `;

  // Render filter bar
  const filterWrapper = container.querySelector('#filter-bar-wrapper');
  renderFilterBar(filterWrapper, renderProducts);

  // Initial render
  renderProducts();

  // Re-render on state change (filters)
  subscribe(() => renderProducts());

  function renderProducts() {
    const { filters } = getState();
    const grid = container.querySelector('#product-grid');
    const noResults = container.querySelector('#no-results');
    if (!grid) return;

    const filtered = products.filter(p => {
      if (filters.type && p.type !== filters.type) return false;
      if (filters.mounting && p.mounting !== filters.mounting) return false;
      if (filters.layout && p.layout !== filters.layout) return false;
      return true;
    });

    // Also filter by search query if any
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
      displayed.forEach(product => {
        const card = renderProductCard(product, openProductModal);
        grid.appendChild(card);
      });
    }
  }

  // Live search
  document.addEventListener('input', (e) => {
    if (e.target.id === 'search-input') renderProducts();
  });
}
