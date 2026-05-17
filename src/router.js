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

function resolve() {
  const hash = window.location.hash.slice(1) || '/';
  const app = document.getElementById('page-content');
  if (!app) return;

  if (currentCleanup) {
    currentCleanup();
    currentCleanup = null;
  }

  // Try exact match first
  if (routes[hash]) {
    app.innerHTML = '';
    currentCleanup = routes[hash](app) || null;
    app.classList.remove('page-enter');
    void app.offsetWidth;
    app.classList.add('page-enter');
    window.scrollTo(0, 0);
    return;
  }

  // Try parameterized routes like /product/:id
  for (const [pattern, handler] of Object.entries(routes)) {
    const paramMatch = pattern.match(/^(.+)\/:(\w+)$/);
    if (paramMatch) {
      const [, base, paramName] = paramMatch;
      if (hash.startsWith(base + '/')) {
        const paramValue = hash.slice(base.length + 1);
        app.innerHTML = '';
        currentCleanup = handler(app, { [paramName]: paramValue }) || null;
        app.classList.remove('page-enter');
        void app.offsetWidth;
        app.classList.add('page-enter');
        window.scrollTo(0, 0);
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
