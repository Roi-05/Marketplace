import { formatCurrency } from '../utils.js';

export function renderProductCard(product, onQuickView) {
  const card = document.createElement('article');
  card.className = 'product-card group cursor-pointer';
  card.setAttribute('data-product-id', product.id);

  const reviewCount = product.reviews ? product.reviews.length : 0;
  const rating = reviewCount > 0 ? (product.reviews.reduce((acc, r) => acc + r.rating, 0) / reviewCount) : 0;

  const starsDisplay = reviewCount > 0
    ? `<div class="flex gap-0.5">${renderStarDisplay(rating)}</div><span class="text-[10px] text-gray-400 ml-1">(${reviewCount})</span>`
    : `<span class="text-[10px] text-gray-400 italic">No reviews yet</span>`;

  const badgeHtml = product.originalPrice
    ? `<span class="absolute top-3 left-3 z-10 bg-red-500 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">SALE</span>`
    : '';

  card.innerHTML = `
    <div class="product-img-wrap">
      ${badgeHtml}
      <img
        src="${product.image}"
        alt="${product.name}"
        loading="lazy"
        onerror="this.src='https://placehold.co/600x600/F5F5F5/CCCCCC?text=${encodeURIComponent(product.name)}'"
      />
      <button class="quick-view-btn" aria-label="View ${product.name}">
        View Details →
      </button>
    </div>

    <div class="space-y-1.5 px-1">
      <div class="flex items-start justify-between gap-2">
        <h2 class="text-sm font-semibold tracking-tight leading-snug flex-1 min-w-0 truncate">${product.name}</h2>
        <div class="text-right flex-shrink-0">
          <p class="text-sm font-bold whitespace-nowrap">${formatCurrency(product.price)}</p>
          ${product.originalPrice ? `<p class="text-[10px] text-gray-400 line-through">${formatCurrency(product.originalPrice)}</p>` : ''}
        </div>
      </div>

      <div class="flex items-center gap-1">
        ${starsDisplay}
      </div>

      <div class="flex flex-wrap gap-1 pt-0.5">
        <span class="text-[9px] uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">${product.type}</span>
        ${product.layout ? `<span class="text-[9px] uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">${product.layout}</span>` : ''}
        ${product.mounting ? `<span class="text-[9px] uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">${product.mounting}</span>` : ''}
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
    const color = (filled || half) ? '#0A0A0A' : '#E5E7EB';
    return `<svg width="11" height="11" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>`;
  }).join('');
}
