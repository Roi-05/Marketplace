import { formatCurrency } from '../utils.js';
import { filterOptions } from '../data/products.js';
import { getState, setFilter, clearFilters, subscribe } from '../store.js';

export function renderFilterBar(container, onFilter) {
  const bar = document.createElement('div');
  bar.id = 'filter-bar';
  bar.className = 'px-6 md:px-12 py-6 border-b border-[#F5F5F5]';

  function render() {
    const { filters } = getState();
    bar.innerHTML = `
      <div class="flex flex-wrap items-center gap-3">
        <span class="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mr-2">Filter</span>

        <div class="flex flex-wrap gap-2" id="filter-pills">
          ${filterOptions.type.map(t => `
            <button class="filter-pill ${filters.type === t ? 'active' : ''}" data-key="type" data-value="${t}">${t}</button>
          `).join('')}
        </div>

        <button id="clear-filters" class="ml-auto text-[11px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors ${Object.values(filters).every(v => !v) ? 'opacity-0 pointer-events-none' : ''}">
          Clear All
        </button>
      </div>
    `;

    bar.querySelectorAll('[data-key]').forEach(btn => {
      btn.addEventListener('click', () => {
        setFilter(btn.dataset.key, btn.dataset.value);
        if (onFilter) onFilter();
      });
    });

    const clearBtn = bar.querySelector('#clear-filters');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        clearFilters();
        if (onFilter) onFilter();
      });
    }
  }

  subscribe(render);
  render();
  container.appendChild(bar);

  return bar;
}
