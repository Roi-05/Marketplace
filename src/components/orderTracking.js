import { orders } from '../data/products.js';
import { formatCurrency } from '../utils.js';

export function renderOrderTracking(container) {
  function render() {
    container.innerHTML = `
      <div class="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div class="mb-12">
          <h1 class="text-3xl font-bold tracking-tight mb-2">My Orders</h1>
          <p class="text-sm text-gray-400">View and track your recently placed orders.</p>
        </div>

        <div id="order-list" class="space-y-8">
          ${orders.length === 0 
            ? `
              <div class="py-20 border border-[#F5F5F5] rounded-2xl text-center bg-[#FAFAFA]">
                <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                </div>
                <p class="text-sm font-bold mb-1">No orders found</p>
                <p class="text-xs text-gray-400 mb-6">You haven't placed any orders yet.</p>
                <a href="#/" class="btn-primary">Start Shopping</a>
              </div>
            `
            : orders.map(order => renderOrderCard(order)).join('')
          }
        </div>
      </div>
    `;

    // Add expansion logic
    container.querySelectorAll('.view-tracking-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const timeline = container.querySelector(`#timeline-${id}`);
        const icon = btn.querySelector('svg');
        
        timeline.classList.toggle('hidden');
        if (icon) {
          icon.style.transform = timeline.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
        }
      });
    });
  }

  render();
}

function renderOrderCard(order) {
  const currentStep = [...order.timeline].reverse().find(s => s.done);
  
  return `
    <div class="bg-white border border-[#F5F5F5] rounded-2xl overflow-hidden shadow-sm hover:border-black transition-colors">
      <div class="p-6 md:p-8 flex flex-wrap items-center justify-between gap-6">
        <div class="flex items-center gap-6">
          <div class="w-12 h-12 bg-[#F9F9F9] rounded-xl flex items-center justify-center text-xl">📦</div>
          <div>
            <p class="text-[10px] text-gray-400 font-mono font-bold uppercase tracking-widest mb-1">${order.id}</p>
            <p class="text-sm font-bold">${order.items.join(', ')}</p>
          </div>
        </div>
        
        <div class="flex items-center gap-8">
          <div class="hidden sm:block text-right">
            <p class="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Status</p>
            <p class="text-xs font-bold ${currentStep?.step === 'Delivered' ? 'text-green-600' : 'text-black'}">${currentStep?.step || 'Processing'}</p>
          </div>
          <div class="text-right">
            <p class="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Total</p>
            <p class="text-xs font-bold">${formatCurrency(order.total)}</p>
          </div>
          <button class="view-tracking-btn p-2 hover:bg-gray-100 rounded-full transition-colors" data-id="${order.id}">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="transition-transform duration-300"><path d="m6 9 6 6 6-6"/></svg>
          </button>
        </div>
      </div>

      <!-- Expandable Timeline -->
      <div id="timeline-${order.id}" class="hidden border-t border-[#F5F5F5] bg-[#FAFAFA] p-6 md:p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
           <div class="space-y-4">
              <h4 class="text-[10px] uppercase tracking-widest font-bold text-gray-400">Order Details</h4>
              <div class="space-y-2">
                 <div class="flex justify-between text-xs">
                    <span class="text-gray-500">Placed on</span>
                    <span class="font-bold">${order.timeline[0].date}</span>
                 </div>
                 <div class="flex justify-between text-xs">
                    <span class="text-gray-500">Courier</span>
                    <span class="font-bold">J&T Express Philippines</span>
                 </div>
                 <div class="flex justify-between text-xs">
                    <span class="text-gray-500">Tracking No.</span>
                    <span class="font-mono font-bold">PH-${order.id.split('-')[1]}</span>
                 </div>
              </div>
           </div>
           
           <div class="space-y-4">
              <h4 class="text-[10px] uppercase tracking-widest font-bold text-gray-400">Current Status</h4>
              <div class="bg-white p-3 rounded-xl border border-[#F0F0F0] flex items-center gap-3">
                 <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                 <p class="text-xs font-bold uppercase tracking-widest">${currentStep?.step || 'Processing'}</p>
              </div>
           </div>
        </div>

        <div class="space-y-6 pt-4">
          <h4 class="text-[10px] uppercase tracking-widest font-bold text-gray-400">Shipping History</h4>
          <div class="space-y-6 pl-3 border-l border-[#E0E0E0]">
            ${order.timeline.map(step => `
              <div class="relative">
                <div class="absolute -left-[17px] top-0.5 w-2 h-2 rounded-full ${step.done ? 'bg-black' : 'bg-[#E0E0E0]'}"></div>
                <div class="flex justify-between gap-4">
                  <p class="text-xs font-bold ${step.done ? 'text-black' : 'text-gray-300'}">${step.step}</p>
                  ${step.date ? `<span class="text-[10px] text-gray-400 font-bold">${step.date}</span>` : ''}
                </div>
              </div>
            `).reverse().join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}
