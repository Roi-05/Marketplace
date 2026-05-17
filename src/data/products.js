const defaultProducts = [
  // --- Keyboards ---
  {
    id: 'kbd-001',
    name: 'MOD007 HE Year of Dragon',
    type: 'Keyboards',
    layout: 'ANSI',
    mounting: 'Gasket',
    price: 9152.00,
    originalPrice: 10169.00,
    image: 'Dragon_main.jpg',
    images: ['Dragon_main.jpg', 'Dragon_2.jpg', 'Dragon_3.png', 'Dragon_4.jpg'],
    description: 'Year of Dragon Keyboard. As V1 discontinued for months, V2 is here! Features 8K Hz Polling Rate Wired USB-C Solution, Cyan Chinese Dragon Theme with Cherry Profile Dye-Sub Keycaps, and a Three Tone Anodized Aluminum Case.',
    specs: {
      pollingRate: '8K Hz Wired',
      keycaps: 'Cherry Profile Dye-Sub',
      case: 'Anodized Aluminum',
      actuation: '0.1mm~3.3mm (Customizable)',
      rapidTrigger: '0.01mm~2mm',
      features: 'Snap Key (SOCD), Mod-Tap, RT Stabilizer'
    },
    reviews: [
      { id: 'r1', author: 'Zen L.', rating: 5, date: 'May 10, 2026', text: 'The 8K polling is noticeable in competitive games. The dragon theme is stunning.' }
    ]
  },
  {
    id: 'kbd-002',
    name: 'Lord of the Mysteries 5108 V5',
    type: 'Keyboards',
    layout: 'ANSI',
    mounting: 'Gasket',
    price: 6214.00,
    image: 'LOTM_1.avif',
    images: ['LOTM_1.avif', 'LOTM_2.avif'],
    description: 'Lord of Mysteries Limited Edition. Official upgrade to the 5108B Plus, now featuring our latest Creamy Yellow U1 switches for an even softer and creamier typing experience. Full-size structure with 10,000mAh battery.',
    specs: {
      pollingRate: '8K Hz (Wired + 2.4G)',
      structure: 'Full-Size Gasket-Mounted',
      switches: 'Creamy Yellow U1',
      keycaps: 'PBT Dye-sub Cherry Profile',
      battery: '10,000mAh',
      connection: 'Tri-mode'
    },
    reviews: [
      { id: 'r2', author: 'Sora H.', rating: 5, date: 'May 05, 2026', text: 'The LOTM artwork is beautiful. The creamy yellow switches feel amazing.' }
    ]
  },
  {
    id: 'kbd-003',
    name: 'Spy x Family 5108B Plus',
    type: 'Keyboards',
    layout: 'ANSI',
    mounting: 'Tray Mount',
    price: 6214.00,
    image: 'SxF_main.avif',
    images: ['SxF_main.avif', 'SxF_details1.avif', 'SxF_details2.avif'],
    description: 'Spy x Family Limited Edition. Featuring MOA Profile PBT Dye-Sub Keycaps and programmable RGB backlight. Includes an ergonomic tilting stand with 3 levels of height adjustment.',
    specs: {
      keycaps: 'MOA Profile PBT Dye-Sub',
      backlight: 'Programmable RGB',
      connection: 'Tri-mode (2.4G, BT5.0, Wired)',
      stand: '3-level Ergonomic'
    },
    reviews: [
      { id: 'r3', author: 'Anya F.', rating: 5, date: 'May 02, 2026', text: 'Waku waku! The keycaps are so cute and high quality.' }
    ]
  },

  // --- Keycaps ---
  {
    id: 'kc-001',
    name: 'Capybara Pudding Keycap Set (140-key)',
    type: 'Keycaps',
    layout: 'Universal',
    mounting: null,
    price: 2599.00,
    image: 'CapyMain.jpg',
    images: ['CapyMain.jpg', 'Capy1.png', 'Capy2.png'],
    description: 'An original design by Akko team, inspired by the spirit and graceful manner of the Capybara, known for its self-soothing and caring nature. Features a unique 4-side translucent pudding design made of PC.',
    specs: {
      profile: 'MOA Profile',
      material: 'PBT Dye-Sub (Top) + Translucent PC (Sides)',
      keys: '140 keys',
      compatibility: '60%, 64, 65, TKL, 75, 96, 1800, Full-size',
      backlight: 'Translucent Pudding'
    },
    reviews: []
  },
  {
    id: 'kc-002',
    name: 'Panda MAO Keycap Set (142-Key)',
    type: 'Keycaps',
    layout: 'Universal',
    mounting: null,
    price: 2599.00,
    image: 'PandaMain.jpg',
    images: ['PandaMain.jpg', 'Panda1.jpg', 'Panda2.jpg'],
    description: 'MAO Profile Dye-sublimation Keycaps. Design inspired by the giant panda. High-quality PBT material ensures a durable and premium feel for your custom build.',
    specs: {
      profile: 'MAO Profile',
      material: 'PBT Dye-Sub',
      keys: '142 keys',
      compatibility: '60%, 64, 65, TKL, 75, 96, 1800, Full-size'
    },
    reviews: []
  },
  {
    id: 'kc-003',
    name: 'Christmas Fantasy Keycap Set (137-key)',
    type: 'Keycaps',
    layout: 'Universal',
    mounting: null,
    price: 2599.00,
    image: 'ChirstmasMain.png',
    images: ['ChirstmasMain.png', 'Christmas1.png', 'Christmas2.png', 'Christmas3.png'],
    description: "Akko's 2024 Christmas limited edition keycaps featuring festive icons and emojis. The new MOG profile brings character to life with unique rounded edges and raised facial expression zones.",
    specs: {
      profile: 'MOG Profile',
      material: '5-Sided PBT Dye-Sub',
      keys: '137 keys',
      compatibility: '60%, 64, 65, TKL, 75, 96, 1800, Full-size',
      limited: '2024 Christmas Edition'
    },
    reviews: []
  },

  // --- Switches ---
  {
    id: 'sw-001',
    name: 'Akko Rosewood Switch',
    type: 'Switches',
    layout: null,
    mounting: '5-pin',
    price: 790.00,
    image: 'Akko-Rosewood-Switch_Main.jpg',
    images: ['Akko-Rosewood-Switch_Main.jpg', 'Akko-Rosewood-Switch1.png'],
    description: 'Rosewood is born with the resolution of making a nice low-pitch switch for our MU01 wooden case keyboard. Provides a pleasant thocky sound out of box with factory lubrication.',
    specs: {
      type: 'Linear',
      materials: 'Nylon (Pro) stem, PA12 top cover, PA6 bottom',
      spring: '22mm Responsive',
      travel: '4.0mm',
      pins: '5-pin',
      quantity: '45 pcs'
    },
    reviews: []
  },
  {
    id: 'sw-002',
    name: 'Akko Astrolink Magnetic Switch',
    type: 'Switches',
    layout: null,
    mounting: 'HE (Downward N-pole)',
    price: 282.00,
    image: 'Akko-Astrolink-Magnetic-Switch-XQ-Q-SP_Main.jpg',
    images: ['Akko-Astrolink-Magnetic-Switch-XQ-Q-SP_Main.jpg', 'Akko-Astrolink-Magnetic-Switch1.png', 'Astrolink-Magnetic-Switch2.jpg'],
    description: 'Designed for stable and wobble-free key presses. Featuring a light 36gf initial force, these are perfect for gamers preferring higher-pitched mechanical style feedback.',
    specs: {
      type: 'Magnetic (HE)',
      force: '36gf Initial',
      magnet: 'Downward-facing N-pole',
      sound: 'Clean / High-pitched',
      compatibility: 'Compatible with most HE keyboards (Verify N-pole orientation)'
    },
    reviews: []
  },
  {
    id: 'sw-003',
    name: 'Akko AstroAim Magnetic Switch',
    type: 'Switches',
    layout: null,
    mounting: 'HE (Downward N-pole)',
    price: 790.00,
    image: 'Akko-AstroAim-Magnetic-Switch-XQ-Q_Main.webp',
    images: ['Akko-AstroAim-Magnetic-Switch-XQ-Q_Main.webp', 'Akko-AstroAim-Magnetic-Switch-1.webp', 'Akko-AstroAim-Magnetic-Switch-2.webp'],
    description: 'AstroAim switches deliver stable, wobble-free keystrokes for precise control. Lower-pitched sound profile compared to Astrolink, perfect for gamers who prefer gamers who prefer quieter acoustics.',
    specs: {
      type: 'Magnetic (HE)',
      sound: 'Low-pitched / Quiet',
      magnet: 'Downward-facing N-pole',
      stability: 'Wobble-free design',
      compatibility: 'Compatible with most HE keyboards (Verify N-pole orientation)'
    },
    reviews: []
  }
];

const savedProducts = localStorage.getItem('nmt_products');
export const products = savedProducts ? JSON.parse(savedProducts) : defaultProducts;

export function saveProducts() {
  localStorage.setItem('nmt_products', JSON.stringify(products));
}

const savedOrders = localStorage.getItem('nmt_orders');
export const orders = savedOrders ? JSON.parse(savedOrders) : [];

export function saveOrders() {
  localStorage.setItem('nmt_orders', JSON.stringify(orders));
}

export const filterOptions = {
  type: ['Keyboards', 'Keycaps', 'Switches'],
};
