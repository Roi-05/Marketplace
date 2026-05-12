import { orders } from '../data/products.js';
import { formatCurrency } from '../utils.js';

export function renderOrderTracking(container) {
  container.innerHTML = `
    <div class="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-16">
      <div class="mb-10 text-center">
        <h1 class="text-3xl font-bold tracking-tight mb-3">Track Your Order</h1>
        <p class="text-sm text-gray-400">Enter your order ID to see real-time updates on your delivery.</p>
      </div>

      <!-- Success message (shown after checkout) -->
      <div id="order-success-msg" class="hidden mb-8 p-6 bg-black text-white rounded-lg shadow-xl animate-fadeIn">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 6 9 17l-5-5"/></svg>
          </div>
          <div>
            <p class="text-sm font-bold uppercase tracking-widest">Order Placed Successfully</p>
            <p class="text-[11px] text-gray-300 mt-1">Copy the ID below to track your package.</p>
          </div>
        </div>
      </div>

      <!-- Input -->
      <div class="bg-white border border-[#F5F5F5] p-2 rounded-xl shadow-sm flex gap-2 mb-12 focus-within:border-black transition-colors">
        <div class="flex-1 px-4 py-3 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" id="tracking-input" class="w-full outline-none text-sm font-mono placeholder:text-gray-300" placeholder="NMT-20260412-001" />
        </div>
        <button id="tracking-search" class="btn-primary rounded-lg px-8">Track</button>
      </div>

      <!-- Demo order IDs hint -->
      <div class="mb-12">
        <p class="text-[10px] uppercase tracking-widest text-gray-400 mb-4 font-bold">Recent Demo Orders</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${orders.map(o => `
            <button class="demo-order-id flex items-center justify-between p-4 border border-[#F5F5F5] rounded-xl hover:border-black transition-all group" data-id="${o.id}">
              <div class="text-left">
                <p class="text-[10px] text-gray-400 font-mono">${o.id}</p>
                <p class="text-xs font-bold">${o.items[0]}${o.items.length > 1 ? ` +${o.items.length-1}` : ''}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="opacity-0 group-hover:opacity-100 transition-opacity"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Result Area -->
      <div id="tracking-result" class="space-y-8"></div>
    </div>
  `;

  const input = container.querySelector('#tracking-input');
  const searchBtn = container.querySelector('#tracking-search');
  const result = container.querySelector('#tracking-result');

  function doSearch() {
    const id = input.value.trim().toUpperCase();
    const order = orders.find(o => o.id === id);
    if (!order) {
      result.innerHTML = `
        <div class="p-12 border border-[#F5F5F5] rounded-2xl text-center bg-[#FAFAFA]">
          <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="1.5"><path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
          </div>
          <p class="text-sm font-bold mb-1">Order Not Found</p>
          <p class="text-xs text-gray-400">Please check your order ID and try again.</p>
        </div>
      `;
      return;
    }
    renderDetailedTracking(result, order);
  }

  searchBtn.addEventListener('click', doSearch);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

  container.querySelectorAll('.demo-order-id').forEach(btn => {
    btn.addEventListener('click', () => {
      input.value = btn.dataset.id;
      doSearch();
    });
  });
}

function renderDetailedTracking(container, order) {
  const currentStep = [...order.timeline].reverse().find(s => s.done);
  
  container.innerHTML = `
    <!-- Summary Card -->
    <div class="bg-white border border-[#F5F5F5] rounded-2xl overflow-hidden shadow-sm">
      <div class="p-6 md:p-8 border-b border-[#F5F5F5] flex flex-wrap justify-between items-center gap-6">
        <div class="space-y-1">
          <p class="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Status</p>
          <p class="text-lg font-bold text-black">${currentStep ? currentStep.step : 'Processing'}</p>
        </div>
        <div class="space-y-1 md:text-right">
          <p class="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Estimated Delivery</p>
          <p class="text-lg font-bold text-black">May 15 - May 18, 2026</p>
        </div>
      </div>
      
      <div class="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p class="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Courier</p>
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-[10px] text-white font-black italic">J&T</div>
            <p class="text-sm font-medium">J&T Express Philippines</p>
          </div>
        </div>
        <div>
          <p class="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Tracking No.</p>
          <p class="text-sm font-mono font-medium">PH-293847502-AK</p>
        </div>
        <div>
          <p class="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Items</p>
          <p class="text-sm font-medium">${order.items.join(', ')}</p>
        </div>
      </div>
    </div>

    <!-- Visual Map / Route -->
    <div class="relative h-48 bg-[#F9F9F9] border border-[#F5F5F5] rounded-2xl overflow-hidden">
       <!-- Simplified Map Background -->
       <div class="absolute inset-0 opacity-20 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
             <path d="M50 350 Q 200 300, 400 200 T 750 50" fill="none" stroke="black" stroke-width="2" stroke-dasharray="8 8" />
             <circle cx="50" cy="350" r="10" fill="black" />
             <circle cx="750" cy="50" r="10" fill="black" />
          </svg>
       </div>
       <div class="absolute inset-0 flex items-center justify-center">
          <div class="bg-white px-4 py-2 rounded-full shadow-lg border border-[#F5F5F5] flex items-center gap-3">
             <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <p class="text-[11px] font-bold uppercase tracking-widest">In Transit to Manila Hub</p>
          </div>
       </div>
    </div>

    <!-- Detailed Timeline -->
    <div class="space-y-6 pt-4">
      <h3 class="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Shipping History</h3>
      <div class="space-y-8 pl-4 border-l-2 border-[#F5F5F5]">
        ${order.timeline.map((step, i) => `
          <div class="relative">
            <div class="absolute -left-[21px] top-0 w-4 h-4 rounded-full border-2 bg-white ${step.done ? 'border-black' : 'border-[#F5F5F5]'} flex items-center justify-center">
              ${step.done ? '<div class="w-1.5 h-1.5 rounded-full bg-black"></div>' : ''}
            </div>
            <div class="space-y-1">
              <div class="flex items-center justify-between">
                <p class="text-sm font-bold ${step.done ? 'text-black' : 'text-gray-300'}">${step.step}</p>
                ${step.date ? `<span class="text-[10px] text-gray-400 uppercase tracking-widest font-bold">${step.date}</span>` : ''}
              </div>
              ${step.done ? `<p class="text-xs text-gray-500">Package has been processed and is moving towards destination.</p>` : ''}
            </div>
          </div>
        `).reverse().join('')}
      </div>
    </div>
  `;
}
