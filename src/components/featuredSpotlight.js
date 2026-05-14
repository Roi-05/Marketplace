import { navigate } from '../router.js';

export function renderFeaturedSpotlight(container) {
  const section = document.createElement('section');
  section.className = 'max-w-7xl mx-auto px-6 md:px-12 py-12';
  section.innerHTML = `
    <div class="relative group bg-[#0A0A0A] rounded-3xl overflow-hidden cursor-pointer h-[500px] md:h-[600px]" id="spotlight-dragon">
      <img src="/Dragon_main.jpg" class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" />
      <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      <div class="absolute bottom-10 left-10 right-10 text-center md:text-left">
        <span class="inline-block px-3 py-1 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest mb-4 rounded-full">Limited Edition Spotlight — 10% OFF</span>
        <h2 class="text-4xl md:text-7xl font-black text-white tracking-tighter mb-4 leading-none uppercase">MOD007 HE<br/><span class="text-red-500 italic">YEAR OF DRAGON</span></h2>
        <p class="text-gray-300 text-sm max-w-xl mb-8 mx-auto md:mx-0 font-bold underline underline-offset-4 decoration-red-500">NOW ₱9,152 — LIMITED TIME OFFER</p>
        <button class="bg-white text-black px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-colors">Experience the Power</button>
      </div>
    </div>
  `;

  section.querySelector('#spotlight-dragon').addEventListener('click', () => navigate('/product/kbd-001'));

  container.appendChild(section);
}
