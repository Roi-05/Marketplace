/** Simple reactive store for cart & filter state */
const listeners = new Set();

const state = {
  cart: [],
  filters: { type: null, mounting: null, layout: null },
  cartOpen: false,
};

export function getState() {
  return state;
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function notify() {
  listeners.forEach((fn) => fn(state));
}

export function addToCart(product, qty = 1) {
  const existing = state.cart.find((i) => i.product.id === product.id);
  if (existing) {
    existing.qty += qty;
  } else {
    state.cart.push({ product, qty });
  }
  notify();
}

export function removeFromCart(productId) {
  state.cart = state.cart.filter((i) => i.product.id !== productId);
  notify();
}

export function updateQty(productId, qty) {
  const item = state.cart.find((i) => i.product.id === productId);
  if (item) {
    item.qty = Math.max(1, qty);
    notify();
  }
}

export function clearCart() {
  state.cart = [];
  notify();
}

export function getCartTotal() {
  return state.cart.reduce((sum, i) => sum + i.product.price * i.qty, 0);
}

export function getCartCount() {
  return state.cart.reduce((sum, i) => sum + i.qty, 0);
}

export function toggleCart(open) {
  state.cartOpen = typeof open === 'boolean' ? open : !state.cartOpen;
  notify();
}

export function setFilter(key, value) {
  state.filters[key] = state.filters[key] === value ? null : value;
  notify();
}

export function clearFilters() {
  state.filters = { type: null, mounting: null, layout: null };
  notify();
}
