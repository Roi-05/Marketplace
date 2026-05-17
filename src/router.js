/** Minimal hash-based SPA router */
const routes = {};
let currentCleanup = null;

export function route(path, handler) {
  routes[path] = handler;
}

export function navigate(path) {
  window.location.hash = path;
}

export function start() {
  window.addEventListener('hashchange', resolve);
  resolve();
}

const scrollPositions = {};
let currentPath = window.location.hash.slice(1) || '/';

function resolve() {
  const hash = window.location.hash.slice(1) || '/';
  
  // Save scroll position for the page we are leaving
  scrollPositions[currentPath] = window.scrollY;
  currentPath = hash;

  const app = document.getElementById('page-content');
  if (!app) return;

  if (currentCleanup) {
    currentCleanup();
    currentCleanup = null;
  }

  const handleRoute = (handler, params = null) => {
    app.innerHTML = '';
    currentCleanup = handler(app, params) || null;
    app.classList.remove('page-enter');
    void app.offsetWidth;
    app.classList.add('page-enter');
    
    // Restore saved scroll position or scroll to top
    const savedPos = scrollPositions[hash] || 0;
    setTimeout(() => {
      window.scrollTo(0, savedPos);
    }, 0); // Brief delay for DOM to calculate height
  };

  // Try exact match first
  if (routes[hash]) {
    handleRoute(routes[hash]);
    return;
  }

  // Try parameterized routes like /product/:id
  for (const [pattern, handler] of Object.entries(routes)) {
    const paramMatch = pattern.match(/^(.+)\/:(\w+)$/);
    if (paramMatch) {
      const [, base, paramName] = paramMatch;
      if (hash.startsWith(base + '/')) {
        const paramValue = hash.slice(base.length + 1);
        handleRoute(handler, { [paramName]: paramValue });
        return;
      }
    }
  }

  // 404 fallback
  app.innerHTML = `<div class="flex items-center justify-center min-h-[60vh]">
    <div class="text-center">
      <h1 class="text-6xl font-bold tracking-tight mb-4">404</h1>
      <p class="text-sm text-gray-400 uppercase tracking-widest">Page not found</p>
    </div>
  </div>`;
}
