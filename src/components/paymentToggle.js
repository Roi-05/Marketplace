export function renderPaymentToggle(container) {
  let activeMethod = 'wallet';

  const methods = [
    { id: 'wallet', label: 'Digital Wallet' },
    { id: 'cod', label: 'Cash on Delivery' },
  ];

  function render() {
    container.innerHTML = `
      <!-- Segment control -->
      <div class="payment-segment mb-6">
        ${methods.map(m => `
          <button class="${activeMethod === m.id ? 'active' : ''}" data-method="${m.id}">${m.label}</button>
        `).join('')}
      </div>

      <!-- Dynamic fields -->
      <div id="payment-fields">
        ${renderFields(activeMethod)}
      </div>
    `;

    container.querySelectorAll('[data-method]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeMethod = btn.dataset.method;
        render();
      });
    });
  }

  render();
}

function renderFields(method) {
  if (method === 'wallet') {
    return `
      <div class="space-y-4">
        <p class="text-[11px] uppercase tracking-widest text-gray-400 mb-3">Select Wallet</p>
        ${[
          { id: 'gcash', label: 'GCash', icon: '💙', color: 'text-blue-500' },
          { id: 'maya', label: 'Maya', icon: '💚', color: 'text-green-500' },
          { id: 'grabpay', label: 'GrabPay', icon: '🟢', color: 'text-green-600' },
          { id: 'shopeepay', label: 'ShopeePay', icon: '🧡', color: 'text-orange-500' },
        ].map(w => `
          <label class="flex items-center gap-4 p-4 border border-[#E0E0E0] cursor-pointer hover:border-black transition-colors has-[:checked]:border-black group relative overflow-hidden">
            <input type="radio" name="wallet-type" value="${w.id}" class="sr-only" ${w.id === 'gcash' ? 'checked' : ''} />
            <span class="text-lg">${w.icon}</span>
            <span class="text-sm font-medium">${w.label}</span>
            <div class="ml-auto w-4 h-4 rounded-full border border-[#E0E0E0] flex items-center justify-center wallet-radio-indicator group-hover:border-black">
              <div class="w-2 h-2 rounded-full bg-transparent wallet-dot"></div>
            </div>
            
            <style>
              label:has(input:checked) .wallet-radio-indicator { border-color: black; }
              label:has(input:checked) .wallet-dot { background-color: black; }
            </style>
          </label>
        `).join('')}
        <p class="text-[11px] text-gray-400 pt-2 leading-relaxed">After clicking 'Place Order', you'll be redirected to your chosen wallet to authorize the transaction.</p>
      </div>
    `;
  }

  if (method === 'cod') {
    return `
      <div class="p-5 bg-[#F9F9F9] border border-[#E0E0E0]">
        <div class="flex gap-4 items-start">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="mt-0.5 flex-shrink-0"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
          <div>
            <p class="text-sm font-medium mb-1">Cash on Delivery Selected</p>
            <p class="text-[11px] text-gray-500 leading-relaxed">Please have the exact amount ready upon delivery. Our courier will collect payment at your doorstep. Available nationwide.</p>
          </div>
        </div>
      </div>
    `;
  }

  return '';
}
