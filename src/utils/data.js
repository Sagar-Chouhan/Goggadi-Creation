// Constants & Data for Goggadi Creation

const navLinks = [
  { href: '#top', label: 'Home', icon: 'bag' },
  { href: '#products', label: 'Products', icon: 'bag' },
  { href: '#collection', label: 'Collection', icon: 'bag' },
  { href: '#craft', label: 'Craft', icon: 'leaf' },
  { href: '#stories', label: 'Stories', icon: 'spark' },
  { href: '#lookbook', label: 'Lookbook', icon: 'camera' },
]

const brandDetails = [
  'Stylish | Strong | Reliable',
  'Delivery Across India',
  'WhatsApp: +91 7982383793',
]

const imageTitles = [
  'Tree Art Sling',
  'Mountain Spirit Crossbody',
  'Dual Pocket Interior',
  'Craft Market Classic',
  'Hemp Leaf Statement',
  'Hamsa Heritage Print',
  'Elephant Motif Edition',
  'Urban Bazaar Style',
  'Om Mandala Sling',
  'Artisan Market Portrait',
  'Closeup Mandala Detail',
  'Everyday Tree Print',
  'Side Profile Minimal',
  'Studio Desk Product Shot',
  'Pocket Flap Variant',
  'Handwoven Neutral Finish',
]

// ─── Root-level images (existing catalog) ───
const imageCatalog = Object.entries(
  import.meta.glob('../assets/*.jpeg', { eager: true, import: 'default' }),
)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
  .map(([path, source], index) => ({
    id: index,
    src: source,
    title: imageTitles[index] ?? `Handbag Style ${index + 1}`,
  }))

// ─── Cotton Sling Bag — ₹199 ───
const cottonSlingImages = Object.entries(
  import.meta.glob('../assets/Coton Sling Bag - 199 price/*.jpeg', { eager: true, import: 'default' }),
)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
  .map(([path, source], index) => ({
    id: `cotton-sling-${index}`,
    src: source,
    title: `Cotton Sling Bag - View ${index + 1}`,
  }))

// ─── Cross Body Bag — ₹299 ───
const crossBodyImages = Object.entries(
  import.meta.glob('../assets/Cross body bag - price 299/*.jpeg', { eager: true, import: 'default' }),
)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
  .map(([path, source], index) => ({
    id: `cross-body-${index}`,
    src: source,
    title: `Cross Body Bag - View ${index + 1}`,
  }))

// ─── Products with real names, prices, and images from subfolders ───
const products = [
  {
    id: 'cotton-sling-bag',
    name: 'Cotton Sling Bag',
    price: 199,
    originalPrice: 399,
    description: 'Lightweight cotton sling bag with artisan print — perfect for casual outings and daily use.',
    tag: 'Best Seller',
    badgeType: 'new',
    images: cottonSlingImages,
    image: cottonSlingImages[0],
    rating: '4.6',
    reviews: 87,
  },
  {
    id: 'cross-body-bag',
    name: 'Cross Body Bag',
    price: 299,
    originalPrice: 549,
    description: 'Stylish cross body bag with adjustable strap and secure zip closure — ideal for travel and everyday carry.',
    tag: 'New Arrival',
    badgeType: 'reduced',
    images: crossBodyImages,
    image: crossBodyImages[0],
    rating: '4.8',
    reviews: 64,
  },
]

const heroImage = imageCatalog[0]
const lookbookImages = imageCatalog.slice(5)

const featuredBags = [
  {
    name: 'Noir Atelier Tote',
    price: '₹299',
    description: 'Structured carryall in espresso leather with brushed gold hardware.',
    tag: 'Best seller',
    image: imageCatalog[1],
  },
  {
    name: 'Luna Crescent Bag',
    price: '₹299',
    description: 'Soft crescent silhouette for evening edits and elevated daywear.',
    tag: 'New arrival',
    image: imageCatalog[2],
  },
  {
    name: 'Maison Mini Satchel',
    price: '₹299',
    description: 'Compact, polished, and designed for essentials with a sculpted shape.',
    tag: 'Limited run',
    image: imageCatalog[3],
  },
  {
    name: 'Studio Carry Shoulder',
    price: '₹299',
    description: 'Daily-use shoulder bag with an elegant frame and soft neutral tone.',
    tag: 'Editor pick',
    image: imageCatalog[4],
  },
]

const craftsmanshipPoints = [
  'Hand-finished edges and reinforced seams for everyday wear.',
  'Premium materials curated to layer with your seasonal wardrobes.',
  'Thoughtful interiors with secure pockets and easy-access storage.',
]

const testimonials = [
  {
    quote:
      'The silhouette is elegant but practical. It looks expensive without feeling fragile.',
    author: 'Maya R.',
    image: imageCatalog[4],
  },
  {
    quote:
      'Every detail feels considered, from the hardware to the lining. Perfect for client meetings.',
    author: 'Alicia N.',
    image: imageCatalog[5],
  },
]

export {
    navLinks,
    brandDetails,
    imageTitles,
    imageCatalog,
    heroImage,
    lookbookImages,
    featuredBags,
    craftsmanshipPoints,
    testimonials,
    products,
    cottonSlingImages,
    crossBodyImages,
};
