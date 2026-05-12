import { getState, removeFromCart, updateQty, toggleCart, getCartTotal, getCartCount, subscribe } from '../store.js';
import { formatCurrency } from '../utils.js';
import { navigate } from '../router.js';

export function initCart() {
  const backdrop = document.getElementById('cart-backdrop');
  const drawer = document.getElementById('cart-drawer');

  if (!backdrop || !drawer) return;

  // Close on backdrop click
  backdrop.addEventListener('click', () => toggleCart(false));

  // Subscribe to state changes
  subscribe((state) => {
    if (state.cartOpen) {
      backdrop.classList.add('open');
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      backdrop.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    }
    renderCartContents(drawer);
  });

  renderCartContents(drawer);
}

function renderCartContents(drawer) {
  const { cart } = getState();
  const total = getCartTotal();
  const count = getCartCount();

  drawer.innerHTML = `
    <div class="flex flex-col h-full">
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-5 border-b border-[#F5F5F5]">
        <div>
          <h2 class="text-sm font-bold uppercase tracking-widest">Cart</h2>
          ${count > 0 ? `<p class="text-[11px] text-gray-400 mt-0.5">${count} item${count > 1 ? 's' : ''}</p>` : ''}
        </div>
        <button id="cart-close" class="p-1 hover:opacity-50 transition-opacity" aria-label="Close cart">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      <!-- Items -->
      <div class="flex-1 overflow-y-auto">
        ${cart.length === 0 ? renderEmptyCart() : cart.map(renderCartItem).join('')}
      </div>

      <!-- Footer -->
      ${cart.length > 0 ? `
        <div class="border-t border-[#F5F5F5] px-6 py-6">
          <div class="flex justify-between items-baseline mb-6">
            <span class="text-xs uppercase tracking-widest text-gray-400">Subtotal</span>
            <span class="text-lg font-bold">${formatCurrency(total)}</span>
          </div>
          <p class="text-[11px] text-gray-400 mb-4">Shipping and taxes calculated at checkout.</p>
          <button id="cart-checkout" class="btn-primary w-full">Proceed to Checkout</button>
        </div>
      ` : ''}
    </div>
  `;

  drawer.querySelector('#cart-close').addEventListener('click', () => toggleCart(false));

  if (cart.length > 0) {
    // Qty buttons
    drawer.querySelectorAll('[data-qty-dec]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.qtyDec;
        const item = cart.find(i => i.product.id === id);
        if (item) {
          if (item.qty <= 1) removeFromCart(id);
          else updateQty(id, item.qty - 1);
        }
      });
    });

    drawer.querySelectorAll('[data-qty-inc]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.qtyInc;
        const item = cart.find(i => i.product.id === id);
        if (item) updateQty(id, item.qty + 1);
      });
    });

    drawer.querySelectorAll('[data-remove]').forEach(btn => {
      btn.addEventListener('click', () => removeFromCart(btn.dataset.remove));
    });

    drawer.querySelector('#cart-checkout').addEventListener('click', () => {
      toggleCart(false);
      navigate('/checkout');
    });
  }
}

function renderCartItem(item) {
  const { product, qty } = item;
  return `
    <div class="flex gap-4 px-6 py-5 border-b border-[#F5F5F5]">
      <div class="w-16 h-16 bg-[#F9F9F9] flex-shrink-0 flex items-center justify-center">
        <img src="${product.image}" alt="${product.name}"
          class="w-full h-full object-contain p-1"
          onerror="this.src='https://placehold.co/100x100/F5F5F5/CCCCCC?text=IMG'"
        />
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="text-sm font-medium truncate">${product.name}</h3>
        <p class="text-[11px] text-gray-400 mt-0.5">${product.type}</p>
        <div class="flex items-center justify-between mt-2">
          <div class="qty-stepper scale-90 origin-left">
            <button data-qty-dec="${product.id}" aria-label="Decrease qty">−</button>
            <span>${qty}</span>
            <button data-qty-inc="${product.id}" aria-label="Increase qty">+</button>
          </div>
          <span class="text-sm font-semibold">${formatCurrency(product.price * qty)}</span>
        </div>
      </div>
      <button data-remove="${product.id}" class="text-gray-300 hover:text-black transition-colors self-start mt-1" aria-label="Remove">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>
  `;
}

function renderEmptyCart() {
  return `
    <div class="flex flex-col items-center justify-center h-full px-6 text-center py-20">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E0E0E0" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="mb-4"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      <p class="text-sm font-medium mb-1">Your cart is empty</p>
      <p class="text-[11px] text-gray-400">Add something beautiful to it.</p>
    </div>
  `;
}
