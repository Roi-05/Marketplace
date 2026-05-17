import { orders } from '../data/products.js';
import { formatCurrency } from '../utils.js';

export function renderOrderTracking(container) {
  function render() {
    container.innerHTML = `
      <div class="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <!-- Page header -->
        <div class="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p class="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-bold mb-2">Account</p>
            <h1 class="text-3xl font-black tracking-tight">My Orders</h1>
          </div>
          ${orders.length > 0 ? `<p class="text-[11px] text-gray-400">${orders.length} order${orders.length > 1 ? 's' : ''} placed</p>` : ''}
        </div>

        <div id="order-list" class="space-y-4">
          ${orders.length === 0
            ? `
              <div class="py-24 text-center">
                <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" stroke-width="1.25"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                </div>
                <p class="text-base font-bold mb-2">No orders yet</p>
                <p class="text-sm text-gray-400 mb-8 max-w-xs mx-auto">Place your first order and it will appear here for easy tracking.</p>
                <a href="#/" class="btn-primary">Explore Products</a>
              </div>
            `
            : orders.map(order => renderOrderCard(order)).join('')
          }
        </div>
      </div>
    `;

    container.querySelectorAll('.view-tracking-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const timeline = container.querySelector(`#timeline-${id}`);
        const icon = btn.querySelector('.chevron-icon');
        const isHidden = timeline.classList.contains('hidden');

        timeline.classList.toggle('hidden');
        if (icon) {
          icon.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      });
    });
  }

  render();
}

function renderOrderCard(order) {
  const currentStep = [...order.timeline].reverse().find(s => s.done);
  const isDelivered = currentStep?.step === 'Delivered';
  const progress = order.timeline.filter(s => s.done).length;
  const total = order.timeline.length;
  const progressPct = Math.round((progress / total) * 100);

  return `
    <div class="order-card">
      <!-- Card header -->
      <div class="p-6 flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="w-11 h-11 bg-[#F5F5F5] rounded-xl flex items-center justify-center flex-shrink-0 text-lg">📦</div>
          <div>
            <p class="text-[10px] text-gray-400 font-mono font-bold uppercase tracking-widest mb-0.5">${order.id}</p>
            <p class="text-sm font-bold leading-snug">${order.items.join(', ')}</p>
          </div>
        </div>

        <div class="flex items-center gap-6">
          <div class="hidden sm:block">
            <p class="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">Status</p>
            <span class="inline-flex items-center gap-1.5 text-xs font-bold ${isDelivered ? 'text-green-600' : 'text-black'}">
              <span class="w-1.5 h-1.5 rounded-full ${isDelivered ? 'bg-green-500' : 'bg-orange-400 animate-pulse'}"></span>
              ${currentStep?.step || 'Processing'}
            </span>
          </div>
          <div>
            <p class="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">Total</p>
            <p class="text-sm font-bold">${formatCurrency(order.total)}</p>
          </div>
          <button class="view-tracking-btn p-2 hover:bg-gray-100 rounded-full transition-colors" data-id="${order.id}" title="View details">
            <svg class="chevron-icon transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
          </button>
        </div>
      </div>

      <!-- Progress bar -->
      <div class="px-6 pb-4">
        <div class="flex items-center justify-between mb-1.5">
          <p class="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Shipping Progress</p>
          <p class="text-[9px] text-gray-400">${progress}/${total} steps</p>
        </div>
        <div class="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div class="h-full ${isDelivered ? 'bg-green-500' : 'bg-black'} rounded-full transition-all duration-700" style="width: ${progressPct}%"></div>
        </div>
      </div>

      <!-- Expandable Timeline -->
      <div id="timeline-${order.id}" class="hidden border-t border-[#F5F5F5] bg-[#FAFAFA]">
        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div class="space-y-3">
            <h4 class="text-[9px] uppercase tracking-widest font-bold text-gray-400">Order Details</h4>
            ${[
              ['Placed on', order.timeline[0].date],
              ['Courier', 'J&T Express Philippines'],
              ['Tracking No.', `PH-${order.id.split('-')[1]}`],
            ].map(([label, val]) => `
              <div class="flex justify-between text-xs gap-4">
                <span class="text-gray-500">${label}</span>
                <span class="font-semibold font-mono text-right">${val}</span>
              </div>
            `).join('')}
          </div>

          <div class="space-y-3">
            <h4 class="text-[9px] uppercase tracking-widest font-bold text-gray-400">Current Status</h4>
            <div class="bg-white border border-[#EFEFEF] rounded-xl p-3 flex items-center gap-3">
              <div class="w-2.5 h-2.5 rounded-full flex-shrink-0 ${isDelivered ? 'bg-green-500' : 'bg-orange-400 animate-pulse'}"></div>
              <p class="text-xs font-bold uppercase tracking-widest">${currentStep?.step || 'Processing'}</p>
            </div>
            ${!isDelivered ? `
              <p class="text-[10px] text-gray-400 leading-relaxed">
                Estimated delivery: <span class="font-semibold text-black">3–5 business days</span>
              </p>
            ` : ''}
          </div>
        </div>

        <div class="px-6 pb-6 space-y-1">
          <h4 class="text-[9px] uppercase tracking-widest font-bold text-gray-400 mb-4">Shipping History</h4>
          <div class="space-y-1">
            ${order.timeline.map((step, i) => `
              <div class="flex items-start gap-4 py-2 ${i < order.timeline.length - 1 ? 'border-b border-[#F5F5F5]' : ''}">
                <div class="mt-0.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center ${step.done ? 'bg-black' : 'bg-[#F0F0F0]'}">
                  ${step.done ? `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg>` : ''}
                </div>
                <div class="flex-1 flex justify-between items-baseline gap-4">
                  <p class="text-xs font-semibold ${step.done ? 'text-black' : 'text-gray-300'}">${step.step}</p>
                  ${step.date ? `<span class="text-[10px] text-gray-400 font-medium flex-shrink-0">${step.date}</span>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}
