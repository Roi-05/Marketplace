export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
}

export function uid() {
  return Math.random().toString(36).substring(2, 10);
}

export function el(tag, attrs = {}, ...children) {
  const element = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === 'className') element.className = value;
    else if (key.startsWith('on')) element.addEventListener(key.slice(2).toLowerCase(), value);
    else if (key === 'innerHTML') element.innerHTML = value;
    else element.setAttribute(key, value);
  }
  for (const child of children) {
    if (typeof child === 'string') element.appendChild(document.createTextNode(child));
    else if (child instanceof Node) element.appendChild(child);
  }
  return element;
}

export function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

export function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-[11px] uppercase tracking-widest px-8 py-4 z-[100] shadow-2xl animate-toast-in';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.replace('animate-toast-in', 'animate-toast-out');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}
