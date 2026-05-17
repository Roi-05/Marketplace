import { getState, removeFromCart, updateQty, toggleCart, getCartTotal, getCartCount, subscribe } from '../store.js';
import { formatCurrency } from '../utils.js';
import { navigate } from '../router.js';

export function initCart() {
  const backdrop = document.getElementById('cart-backdrop');
  const drawer = document.getElementById('cart-drawer');

  if (!backdrop || !drawer) return;

  backdrop.addEventListener('click', () => toggleCart(false));

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
        <div class="flex items-center gap-3">
          <h2 class="text-sm font-bold uppercase tracking-widest">Cart</h2>
          ${count > 0 ? `<span class="bg-black text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">${count}</span>` : ''}
        </div>
        <button id="cart-close" class="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Close cart">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      <!-- Items -->
      <div class="flex-1 overflow-y-auto">
        ${cart.length === 0 ? renderEmptyCart() : cart.map(renderCartItem).join('')}
      </div>

      <!-- Footer -->
      ${cart.length > 0 ? `
        <div class="border-t border-[#F5F5F5] px-6 py-6 space-y-4 bg-[#FAFAFA]">
          <div class="flex justify-between items-center">
            <span class="text-[11px] uppercase tracking-widest text-gray-500 font-medium">Subtotal</span>
            <span class="text-xl font-black">${formatCurrency(total)}</span>
          </div>
          <p class="text-[10px] text-gray-400">Shipping & taxes calculated at checkout.</p>
          <button id="cart-checkout" class="btn-primary w-full py-4">
            Checkout — ${formatCurrency(total)}
          </button>
          <button id="cart-continue" class="w-full text-center text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors font-medium py-1">
            Continue Shopping
          </button>
        </div>
      ` : ''}
    </div>
  `;

  drawer.querySelector('#cart-close').addEventListener('click', () => toggleCart(false));
  drawer.querySelector('#cart-continue')?.addEventListener('click', () => toggleCart(false));

  if (cart.length > 0) {
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
    <div class="flex gap-4 px-6 py-5 border-b border-[#F5F5F5] hover:bg-[#FAFAFA] transition-colors group">
      <div class="w-18 h-18 w-[72px] h-[72px] bg-[#F5F5F5] flex-shrink-0 flex items-center justify-center rounded-lg overflow-hidden">
        <img src="${product.image}" alt="${product.name}"
          class="w-full h-full object-contain p-1.5"
          onerror="this.src='https://placehold.co/100x100/F5F5F5/CCCCCC?text=IMG'"
        />
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex justify-between items-start gap-2">
          <div class="min-w-0">
            <h3 class="text-xs font-semibold truncate leading-snug">${product.name}</h3>
            <p class="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wider">${product.type}</p>
          </div>
          <button data-remove="${product.id}" class="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0 p-1 -mr-1" aria-label="Remove">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        <div class="flex items-center justify-between mt-3">
          <div class="qty-stepper scale-90 origin-left">
            <button data-qty-dec="${product.id}" aria-label="Decrease qty">−</button>
            <span>${qty}</span>
            <button data-qty-inc="${product.id}" aria-label="Increase qty">+</button>
          </div>
          <span class="text-sm font-bold">${formatCurrency(product.price * qty)}</span>
        </div>
      </div>
    </div>
  `;
}

function renderEmptyCart() {
  return `
    <div class="flex flex-col items-center justify-center h-full px-6 text-center py-20">
      <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      </div>
      <p class="text-sm font-bold mb-1">Your cart is empty</p>
      <p class="text-[11px] text-gray-400 mb-6">Add something beautiful to it.</p>
      <a href="#/" onclick="document.getElementById('cart-close').click()" class="btn-secondary text-[10px] px-6 py-3">Start Shopping</a>
    </div>
  `;
}
