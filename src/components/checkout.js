import { getState, getCartTotal, clearCart } from '../store.js';
import { formatCurrency, uid, showToast } from '../utils.js';
import { navigate } from '../router.js';
import { orders, saveOrders } from '../data/products.js';

export function renderCheckout(container) {
  container.innerHTML = `
    <div class="max-w-2xl mx-auto px-6 md:px-12 py-12 md:py-16">
      <div class="mb-10">
        <a href="#/" class="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="m15 18-6-6 6-6"/></svg>
          Back to Shop
        </a>
        <h1 class="text-2xl font-bold tracking-tight">Checkout</h1>
      </div>

      <div id="checkout-accordion">
        <!-- Step 1: Shipping -->
        <div class="accordion-section" id="step-shipping">
          <div class="accordion-header" data-step="shipping">
            <div class="flex items-center gap-4">
              <span class="w-7 h-7 rounded-full border border-black flex items-center justify-center text-xs font-bold step-num" data-num="1">1</span>
              <h3>Shipping Information</h3>
            </div>
            <svg class="accordion-arrow transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
          <div class="accordion-body open" id="body-shipping">
            <form id="shipping-form" class="space-y-6" novalidate>
              <button type="button" id="autofill-demo" class="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-4 block underline underline-offset-4">Auto-fill for Demo</button>
              <div class="grid grid-cols-2 gap-6">
                <div>
                  <label class="block text-[11px] uppercase tracking-widest text-gray-400 mb-1">First Name</label>
                  <input type="text" id="ship-fname" class="input-minimal" placeholder="Juan" required />
                </div>
                <div>
                  <label class="block text-[11px] uppercase tracking-widest text-gray-400 mb-1">Last Name</label>
                  <input type="text" id="ship-lname" class="input-minimal" placeholder="Dela Cruz" required />
                </div>
              </div>
              <div>
                <label class="block text-[11px] uppercase tracking-widest text-gray-400 mb-1">Email</label>
                <input type="email" id="ship-email" class="input-minimal" placeholder="juan@email.com" required />
              </div>
              <div>
                <label class="block text-[11px] uppercase tracking-widest text-gray-400 mb-1">Phone</label>
                <input type="tel" id="ship-phone" class="input-minimal" placeholder="+63 912 345 6789" required />
              </div>
              <div>
                <label class="block text-[11px] uppercase tracking-widest text-gray-400 mb-1">Street Address</label>
                <input type="text" id="ship-street" class="input-minimal" placeholder="123 Rizal Street" required />
              </div>
              <div class="grid grid-cols-2 gap-6">
                <div>
                  <label class="block text-[11px] uppercase tracking-widest text-gray-400 mb-1">City</label>
                  <input type="text" id="ship-city" class="input-minimal" placeholder="Manila" required />
                </div>
                <div>
                  <label class="block text-[11px] uppercase tracking-widest text-gray-400 mb-1">Postal Code</label>
                  <input type="text" id="ship-postal" class="input-minimal" placeholder="1000" required />
                </div>
              </div>
              <div id="ship-error" class="text-xs text-red-500 hidden">Please fill in all required fields.</div>
              <button type="button" id="shipping-next" class="btn-primary w-full mt-4">Continue to Payment</button>
            </form>
          </div>
        </div>

        <!-- Step 2: Payment -->
        <div class="accordion-section" id="step-payment">
          <div class="accordion-header" data-step="payment">
            <div class="flex items-center gap-4">
              <span class="w-7 h-7 rounded-full border border-[#E0E0E0] flex items-center justify-center text-xs font-bold step-num text-gray-300" data-num="2">2</span>
              <h3 class="text-gray-300">Payment Method</h3>
            </div>
            <svg class="accordion-arrow transition-transform duration-300 rotate-180" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
          <div class="accordion-body" id="body-payment">
            <div id="payment-toggle-container"></div>
            <div id="payment-error" class="text-xs text-red-500 hidden mt-4">Please complete your payment information.</div>
            <button type="button" id="payment-next" class="btn-primary w-full mt-6">Review Order</button>
          </div>
        </div>

        <!-- Step 3: Review -->
        <div class="accordion-section" id="step-review">
          <div class="accordion-header" data-step="review">
            <div class="flex items-center gap-4">
              <span class="w-7 h-7 rounded-full border border-[#E0E0E0] flex items-center justify-center text-xs font-bold step-num text-gray-300" data-num="3">3</span>
              <h3 class="text-gray-300">Review & Place Order</h3>
            </div>
            <svg class="accordion-arrow transition-transform duration-300 rotate-180" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
          <div class="accordion-body" id="body-review">
            <div id="review-content"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Init payment toggle
  import('./paymentToggle.js').then(({ renderPaymentToggle }) => {
    const ptContainer = container.querySelector('#payment-toggle-container');
    if (ptContainer) renderPaymentToggle(ptContainer);
  });

  // Accordion state
  let unlockedSteps = ['shipping'];

  function openStep(step) {
    ['shipping', 'payment', 'review'].forEach(s => {
      const body = container.querySelector(`#body-${s}`);
      const header = container.querySelector(`[data-step="${s}"]`);
      const arrow = header?.querySelector('.accordion-arrow');
      const num = header?.querySelector('.step-num');
      const h3 = header?.querySelector('h3');

      if (s === step && unlockedSteps.includes(s)) {
        body?.classList.add('open');
        arrow?.classList.remove('rotate-180');
        num?.classList.remove('text-gray-300', 'border-[#E0E0E0]');
        num?.classList.add('border-black');
        h3?.classList.remove('text-gray-300');
      } else {
        body?.classList.remove('open');
        arrow?.classList.add('rotate-180');
        if (!unlockedSteps.includes(s)) {
          num?.classList.add('text-gray-300', 'border-[#E0E0E0]');
          num?.classList.remove('border-black');
          h3?.classList.add('text-gray-300');
        }
      }
    });
  }

  // Accordion header clicks
  container.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const step = header.dataset.step;
      if (unlockedSteps.includes(step)) openStep(step);
    });
  });

  // Autofill demo logic
  container.querySelector('#autofill-demo')?.addEventListener('click', () => {
    const demoData = {
      'ship-fname': 'Juan',
      'ship-lname': 'Dela Cruz',
      'ship-email': 'juan.delacruz@example.com',
      'ship-phone': '+63 912 345 6789',
      'ship-street': '123 Rizal Avenue',
      'ship-city': 'Quezon City',
      'ship-postal': '1100'
    };
    Object.entries(demoData).forEach(([id, val]) => {
      const input = container.querySelector(`#${id}`);
      if (input) input.value = val;
    });
  });

  // Shipping → Payment
  container.querySelector('#shipping-next').addEventListener('click', () => {
    const required = ['ship-fname', 'ship-lname', 'ship-email', 'ship-phone', 'ship-street', 'ship-city', 'ship-postal'];
    const allFilled = required.every(id => container.querySelector(`#${id}`)?.value.trim());
    if (!allFilled) {
      container.querySelector('#ship-error').classList.remove('hidden');
      return;
    }
    container.querySelector('#ship-error').classList.add('hidden');
    unlockedSteps.push('payment');
    openStep('payment');
    // Scroll to payment
    container.querySelector('#step-payment')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Payment → Review
  container.querySelector('#payment-next').addEventListener('click', () => {
    unlockedSteps.push('review');
    renderReview(container);
    openStep('review');
    container.querySelector('#step-review')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  openStep('shipping');
}

function renderReview(container) {
  const { cart } = getState();
  const total = getCartTotal();
  const shipping = container.querySelector('#ship-fname')?.value + ' ' + container.querySelector('#ship-lname')?.value;
  const email = container.querySelector('#ship-email')?.value;
  const address = [
    container.querySelector('#ship-street')?.value,
    container.querySelector('#ship-city')?.value,
    container.querySelector('#ship-postal')?.value
  ].filter(Boolean).join(', ');

  const reviewEl = container.querySelector('#review-content');
  if (!reviewEl) return;

  reviewEl.innerHTML = `
    <div class="space-y-6">
      <!-- Order items -->
      <div>
        <h4 class="text-[11px] uppercase tracking-widest text-gray-400 mb-3">Items</h4>
        <div class="space-y-3">
          ${cart.map(item => `
            <div class="flex justify-between text-sm">
              <span>${item.product.name} <span class="text-gray-400">×${item.qty}</span></span>
              <span class="font-medium">${formatCurrency(item.product.price * item.qty)}</span>
            </div>
          `).join('')}
        </div>
        <div class="flex justify-between text-sm font-bold pt-4 border-t border-[#F5F5F5] mt-4">
          <span>Total</span>
          <span>${formatCurrency(total)}</span>
        </div>
      </div>

      <!-- Shipping to -->
      <div>
        <h4 class="text-[11px] uppercase tracking-widest text-gray-400 mb-2">Ship To</h4>
        <p class="text-sm font-medium">${shipping}</p>
        <p class="text-sm text-gray-500">${email}</p>
        <p class="text-sm text-gray-500">${address}</p>
      </div>

      <button id="place-order" class="btn-primary w-full">Place Order</button>
    </div>
  `;

  reviewEl.querySelector('#place-order').addEventListener('click', () => {
    const orderId = 'NMT-' + Date.now().toString().slice(-8);
    const { cart } = getState();
    
    const newOrder = {
      id: orderId,
      items: cart.map(item => item.product.name),
      total: getCartTotal(),
      status: 'processing',
      timeline: [
        { step: 'Order Placed', date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), done: true },
        { step: 'Processing', date: null, done: false },
        { step: 'Shipped', date: null, done: false },
        { step: 'Out for Delivery', date: null, done: false },
        { step: 'Delivered', date: null, done: false },
      ],
    };

    orders.unshift(newOrder); // Add to memory
    saveOrders();
    clearCart();
    showToast('Order placed successfully');
    navigate('/tracking');
    setTimeout(() => {
      const input = document.querySelector('#tracking-input');
      if (input) input.value = orderId;
      const successMsg = document.getElementById('order-success-msg');
      if (successMsg) successMsg.classList.remove('hidden');
    }, 400);
  });
}
