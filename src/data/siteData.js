// ─────────────────────────────────────────────────────────────
// SITE CONFIG — everything brand-specific lives here.
// Items marked CONFIRM are placeholders to replace with TRAP's real details.
// ─────────────────────────────────────────────────────────────
export const SITE = {
  name: 'TRAP',
  tagline: 'PASSION FOR FASHION',
  concept: 'BUILT TO BREAK OUT',
  currency: '₦',
  whatsapp: '2340000000000', // CONFIRM: international format, no "+"
  email: 'hello@traplagos.com', // CONFIRM
  instagram: 'https://www.instagram.com/traplagos',
  tiktok: 'https://www.tiktok.com/@traplagos', // CONFIRM
}

// NEXT DROP — change `date` (ISO with offset) to re-point the countdown.
export const NEXT_DROP = {
  name: 'TRAP GENESIS',
  date: '2026-12-05T18:00:00+01:00',
  blurb: 'Limited pieces. Limited time. No restocks guaranteed.',
}

export const NAV_LINKS = [
  { label: 'SHOP', to: '/shop' },
  { label: 'DROPS', to: '/#drop' },
  { label: 'ABOUT', to: '/#about' },
  { label: 'LOOKBOOK', to: '/#lookbook' },
]

export const MENU_LINKS = [
  { label: 'SHOP ALL', to: '/shop' },
  { label: 'NEW DROP', to: '/#drop' },
  { label: 'TEES', to: '/shop?cat=tees' },
  { label: 'HOODIES', to: '/shop?cat=hoodies' },
  { label: 'BOTTOMS', to: '/shop?cat=bottoms' },
  { label: 'ACCESSORIES', to: '/shop?cat=accessories' },
  { label: 'ABOUT TRAP', to: '/#about' },
  { label: 'CONTACT', to: '/info/contact' },
]

export const CATEGORIES = [
  { id: 'all', label: 'ALL' },
  { id: 'tees', label: 'TEES' },
  { id: 'hoodies', label: 'HOODIES' },
  { id: 'bottoms', label: 'BOTTOMS' },
  { id: 'accessories', label: 'ACCESSORIES' },
]

export const SORTS = [
  { id: 'newest', label: 'NEWEST' },
  { id: 'price-asc', label: 'PRICE LOW → HIGH' },
  { id: 'price-desc', label: 'PRICE HIGH → LOW' },
]

export const SIZE_GUIDE = {
  // CONFIRM: replace with TRAP's real measurements (cm)
  head: ['SIZE', 'CHEST', 'LENGTH', 'SHOULDER'],
  rows: [
    ['S', '112', '70', '50'],
    ['M', '116', '72', '52'],
    ['L', '120', '74', '54'],
    ['XL', '124', '76', '56'],
    ['XXL', '128', '78', '58'],
  ],
  note: 'Cut oversized. Between sizes? Go down for a fitted look, stay true for the intended drop.',
}

export const POLICIES = {
  // CONFIRM: all policy copy below is placeholder
  shipping: {
    title: 'SHIPPING',
    body: [
      'Orders ship from Lagos. Lagos deliveries typically arrive in 1–3 working days; nationwide in 3–7.',
      'Delivery fees are confirmed on WhatsApp before you pay. International shipping on request.',
    ],
  },
  returns: {
    title: 'RETURNS',
    body: [
      'Wrong size? Message us within 7 days of delivery for an exchange. Pieces must be unworn, unwashed, with tags.',
      'Limited drops are final once sold out, so sizes can only be swapped for what is still in stock.',
    ],
  },
  privacy: {
    title: 'PRIVACY',
    body: [
      'We only collect what we need to deliver your order: name, phone number and delivery address.',
      'We never sell your details. Message us to have your information removed.',
    ],
  },
  contact: {
    title: 'CONTACT',
    body: ['Orders, sizing, collabs, press. The fastest way to reach TRAP is WhatsApp or Instagram.'],
  },
}

export const ACCORDIONS = (product) => [
  {
    id: 'details',
    title: 'PRODUCT DETAILS',
    body: [
      product.description,
      'Premium quality. 100% p.cotton, breathable fabric, everyday wear.', // from TRAP flyers — CONFIRM
      'Oversized, relaxed cut. Printed in Lagos.', // CONFIRM
    ],
  },
  { id: 'size', title: 'SIZE GUIDE', table: SIZE_GUIDE },
  { id: 'ship', title: 'SHIPPING & RETURNS', body: [...POLICIES.shipping.body, ...POLICIES.returns.body] },
]

export const LOOKBOOK = [
  { id: 'lb1', img: 'photo-railway', code: 'TRAP / 001', title: 'GENESIS', pos: '50% 30%' },
  { id: 'lb2', img: 'detail-skyline', code: 'TRAP / 002', title: 'THE ROAD OUT', pos: '50% 50%' },
  { id: 'lb3', img: 'photo-street', code: 'TRAP / 003', title: 'THE STREET', pos: '50% 30%' },
  { id: 'lb4', img: 'detail-bigdream', code: 'TRAP / 004', title: 'BIG DREAM', pos: '50% 50%' },
  { id: 'lb5', img: 'photo-airport', code: 'TRAP / 005', title: 'BUILT TO BREAK OUT', pos: '50% 40%' },
  { id: 'lb6', img: 'photo-polo-model', code: 'TRAP / 006', title: 'LIMITED EDITION', pos: '50% 35%' },
  { id: 'lb7', img: 'detail-mask', code: 'TRAP / 007', title: 'MADE IN NIGERIA', pos: '50% 50%' },
]
