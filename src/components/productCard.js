import { formatCurrency } from '../utils.js';

export function renderProductCard(product, onQuickView) {
  const card = document.createElement('article');
  card.className = 'product-card group cursor-pointer';
  card.setAttribute('data-product-id', product.id);

  const stars = renderStarDisplay(product.rating);

  card.innerHTML = `
    <div class="relative overflow-hidden bg-[#F9F9F9] aspect-square mb-4">
      <img
        src="${product.image}"
        alt="${product.name}"
        class="w-full h-full object-contain p-6 transition-transform duration-500"
        onerror="this.src='https://placehold.co/600x600/F5F5F5/CCCCCC?text=${encodeURIComponent(product.name)}'"
        loading="lazy"
      />
      <button class="quick-view-btn" aria-label="View ${product.name}">
        View Details
      </button>
    </div>

    <div class="space-y-1 px-1">
      <div class="flex items-start justify-between gap-2">
        <h2 class="text-sm font-semibold tracking-tight leading-snug">${product.name}</h2>
        <span class="text-sm font-medium whitespace-nowrap">${formatCurrency(product.price)}</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="flex gap-0.5">${stars}</div>
        <span class="text-[11px] text-gray-400">(${product.reviewCount})</span>
      </div>
      <div class="flex flex-wrap gap-1 pt-1">
        <span class="text-[10px] uppercase tracking-wider text-gray-400 border border-[#E0E0E0] px-2 py-0.5">${product.type}</span>
        ${product.layout ? `<span class="text-[10px] uppercase tracking-wider text-gray-400 border border-[#E0E0E0] px-2 py-0.5">${product.layout}</span>` : ''}
        ${product.mounting ? `<span class="text-[10px] uppercase tracking-wider text-gray-400 border border-[#E0E0E0] px-2 py-0.5">${product.mounting}</span>` : ''}
      </div>
    </div>
  `;

  card.querySelector('.quick-view-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    window.location.hash = `/product/${product.id}`;
  });

  card.addEventListener('click', () => {
    window.location.hash = `/product/${product.id}`;
  });

  return card;
}

export function renderStarDisplay(rating) {
  return Array.from({ length: 5 }, (_, i) => {
    const filled = i + 1 <= Math.floor(rating);
    const half = !filled && i < rating;
    const color = (filled || half) ? '#000' : '#E0E0E0';
    return `<svg width="12" height="12" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>`;
  }).join('');
}
