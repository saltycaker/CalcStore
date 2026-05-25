// src/lib/products.js
// Platform takes 5% of every sale

export const PLATFORM_FEE = 0.05;

export const products = [
  {
    id: 'ti84-custom-os',
    name: 'TI-84 Custom OS Flash',
    slug: 'ti84-custom-os',
    category: 'firmware',
    price: 29.99,
    description: 'Full custom OS for TI-84 Plus/CE. Unlocks hidden developer menus, extended memory access, faster processing, custom themes, and advanced scripting support. Includes lifetime updates.',
    longDescription: `Replace the stock TI-84 firmware with our community-built custom OS. This open-source alternative gives you:\n\n• Access to 8MB extended archive memory\n• Python 3.x scripting environment\n• Custom app loader with no restrictions\n• Overclocked CPU mode (up to 48MHz)\n• Dark mode + custom color themes\n• Full documentation and Discord community access`,
    images: ['/products/ti84-os.jpg'],
    badge: 'hot',
    inStock: true,
    digital: true,
    sellerCut: (29.99 * (1 - 0.05)).toFixed(2),
    platformFee: (29.99 * 0.05).toFixed(2),
    cryptoEnabled: true,
    tags: ['TI-84', 'firmware', 'custom OS', 'modding']
  },
  {
    id: 'nspire-mod-bundle',
    name: 'TI-Nspire Modding Bundle',
    slug: 'nspire-mod-bundle',
    category: 'bundle',
    price: 49.99,
    description: 'Complete modding toolkit for TI-Nspire CX II. Includes Ndless exploit, GameBoy emulator, custom app pack, and exclusive themes. Everything you need in one download.',
    longDescription: `The ultimate TI-Nspire CX II modification package:\n\n• Ndless jailbreak installer (latest version)\n• Full GameBoy / GameBoy Color emulator\n• Doom port + 10 WADs included\n• 50+ custom Nspire apps\n• Calculator skin editor\n• Video player support\n• Step-by-step install guide`,
    images: ['/products/nspire-bundle.jpg'],
    badge: 'new',
    inStock: true,
    digital: true,
    sellerCut: (49.99 * (1 - 0.05)).toFixed(2),
    platformFee: (49.99 * 0.05).toFixed(2),
    cryptoEnabled: true,
    tags: ['TI-Nspire', 'Ndless', 'bundle', 'games']
  },
  {
    id: 'casio-fx-python',
    name: 'Casio FX-CG50 Python Toolkit',
    slug: 'casio-fx-python',
    category: 'software',
    price: 19.99,
    description: 'Supercharge your Casio FX-CG50 with an extended Python library. Includes 200+ pre-built modules, graphing extensions, and a custom REPL interface.',
    longDescription: `Built by engineers, for engineers. This toolkit extends your Casio's built-in Python:\n\n• 200+ Python modules (math, physics, chemistry, finance)\n• Enhanced graphing with 3D plot support\n• Custom REPL with autocomplete\n• Unit conversion mega-library\n• Symbolic math (CAS-like functionality)\n• Regular updates with new modules`,
    images: ['/products/casio-python.jpg'],
    badge: null,
    inStock: true,
    digital: true,
    sellerCut: (19.99 * (1 - 0.05)).toFixed(2),
    platformFee: (19.99 * 0.05).toFixed(2),
    cryptoEnabled: true,
    tags: ['Casio', 'Python', 'programming', 'toolkit']
  },
  {
    id: 'hp-prime-scripts',
    name: 'HP Prime Script Collection',
    slug: 'hp-prime-scripts',
    category: 'scripts',
    price: 14.99,
    description: 'Library of 300+ HP Prime scripts covering calculus, linear algebra, statistics, physics, and engineering. Organized, documented, and ready to use.',
    longDescription: `The most comprehensive HP Prime script library available:\n\n• Calculus: derivatives, integrals, series, differential equations\n• Linear Algebra: eigenvalues, matrix ops, LU/QR decomposition\n• Statistics: regression, hypothesis testing, distributions\n• Physics: kinematics, thermodynamics, electromagnetism\n• Engineering: signal processing, control systems\n• Finance: NPV, IRR, bond pricing`,
    images: ['/products/hp-prime.jpg'],
    badge: null,
    inStock: true,
    digital: true,
    sellerCut: (14.99 * (1 - 0.05)).toFixed(2),
    platformFee: (14.99 * 0.05).toFixed(2),
    cryptoEnabled: true,
    tags: ['HP Prime', 'scripts', 'math', 'engineering']
  },
  {
    id: 'ti84-skin-pack',
    name: 'TI-84 CE Custom Skin Pack',
    slug: 'ti84-skin-pack',
    category: 'cosmetic',
    price: 9.99,
    description: '25 premium custom faceplate designs for the TI-84 Plus CE. High-res SVG/PNG files ready to print on vinyl or order from our partner print shop.',
    longDescription: `Make your calculator uniquely yours:\n\n• 25 original designs (cyberpunk, minimal, retro, nature, abstract)\n• High-resolution SVG + PNG files\n• Print guide for exact sizing\n• Compatible with standard TI-84 Plus CE\n• Partner print shop discount code included\n• New designs added quarterly`,
    images: ['/products/ti84-skins.jpg'],
    badge: 'new',
    inStock: true,
    digital: true,
    sellerCut: (9.99 * (1 - 0.05)).toFixed(2),
    platformFee: (9.99 * 0.05).toFixed(2),
    cryptoEnabled: true,
    tags: ['TI-84', 'skins', 'cosmetic', 'design']
  },
  {
    id: 'universal-calc-toolkit',
    name: 'Universal Calc Dev Toolkit',
    slug: 'universal-calc-toolkit',
    category: 'bundle',
    price: 79.99,
    description: 'The everything bundle. Dev tools, scripts, and mods for TI-84, TI-Nspire, HP Prime, and Casio FX series. One license, all calculators.',
    longDescription: `Every tool we sell, in one bundle, for one price:\n\n• TI-84 Custom OS Flash\n• TI-Nspire Modding Bundle\n• Casio FX-CG50 Python Toolkit\n• HP Prime Script Collection\n• TI-84 CE Custom Skin Pack\n• Priority Discord support\n• All future updates included\n• Commercial use license`,
    images: ['/products/universal-bundle.jpg'],
    badge: 'hot',
    inStock: true,
    digital: true,
    sellerCut: (79.99 * (1 - 0.05)).toFixed(2),
    platformFee: (79.99 * 0.05).toFixed(2),
    cryptoEnabled: true,
    tags: ['bundle', 'all-in-one', 'best value']
  }
];

export function getProduct(id) {
  return products.find(p => p.id === id || p.slug === id);
}

export function getProductsByCategory(category) {
  return products.filter(p => p.category === category);
}

export const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'firmware', label: 'Firmware / OS' },
  { id: 'scripts', label: 'Scripts' },
  { id: 'software', label: 'Software' },
  { id: 'bundle', label: 'Bundles' },
  { id: 'cosmetic', label: 'Cosmetics' }
];
