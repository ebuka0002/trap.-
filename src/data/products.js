// ─────────────────────────────────────────────────────────────
// PRODUCT DATA — PLACEHOLDER. Names, prices, sizes and copy are
// concept values, NOT real TRAP prices. Replace freely; the UI reads only this file.
// `images[].key` maps to /src/assets/img/<key>-<width>.webp (see utils/images.js).
// ─────────────────────────────────────────────────────────────
const S = ['S', 'M', 'L', 'XL']
const SX = ['S', 'M', 'L', 'XL', 'XXL']

export const products = [
  {
    slug: 'stay-strong-hoodie', name: 'STAY STRONG HOODIE', price: 65000, category: 'hoodies', sizes: SX, soldOut: ['XXL'],
    tags: ['limited'], drop: 1, added: 22,
    description: 'Heavyweight hoodie carrying the broken-heart flag. Stay strong.',
    colors: [{ name: 'Olive', image: 0 }, { name: 'Black', image: 0 }],
    images: [{ key: 'staystrong-hoodie', alt: 'Stay Strong hoodie in olive and black' }, { key: 'photo-airport', alt: 'Models in Stay Strong hoodies at a Lagos airport', pos: '50% 40%' }],
  },
  {
    slug: 'lagos-nigeria-tee', name: 'LAGOS NIGERIA TEE', price: 38000, category: 'tees', sizes: SX, soldOut: [],
    tags: ['limited'], drop: 2, added: 21,
    description: 'Danfo, Lekki bridge, the National Theatre. Lagos no dey sleep.',
    colors: [{ name: 'Black', image: 0 }, { name: 'White', image: 1 }],
    images: [{ key: 'lagos-nigeria-tee-black', alt: 'Black Lagos Nigeria tee with collage print' }, { key: 'lagos-nigeria-tee-white', alt: 'White Lagos Nigeria tee with collage print' }],
  },
  {
    slug: 'trapgenesis-zip-polo', name: 'TRAPGENESIS ZIP POLO', price: 45000, category: 'tees', sizes: S, soldOut: ['S'],
    tags: ['limited'], drop: 3, added: 20,
    description: 'Quarter-zip polo, colour-blocked. Limited Edition. Built to break out.',
    colors: [{ name: 'White', image: 0 }, { name: 'Black', image: 2 }],
    images: [{ key: 'zip-polo-white', alt: 'White TRAPGENESIS zip polo' }, { key: 'photo-polo-model', alt: 'Model wearing the white TRAPGENESIS polo', pos: '50% 55%' }, { key: 'zip-polo-black', alt: 'Black TRAPGENESIS zip polo' }],
  },
  {
    slug: 'naija-stripe-jersey', name: 'NAIJA STRIPE JERSEY', price: 48000, category: 'tees', sizes: S, soldOut: [],
    tags: ['limited'], drop: 4, added: 19,
    description: 'Pitch-side stripes, street-side attitude. TRAPGENESIS script across the chest.',
    colors: [{ name: 'White / Green', image: 0 }, { name: 'Black / Green', image: 1 }],
    images: [{ key: 'stripe-jersey-white', alt: 'White and green striped TRAPGENESIS jersey' }, { key: 'stripe-jersey-black', alt: 'Black and green striped TRAPGENESIS jersey' }],
  },
  {
    slug: 'lagos-crewneck', name: 'LAGOS CREWNECK', price: 55000, category: 'hoodies', sizes: S, soldOut: [],
    tags: ['new'], drop: 5, added: 18,
    description: 'Heather grey crewneck with the full Lagos collage. E dey grind.',
    images: [{ key: 'lagos-crewneck', alt: 'Heather grey crewneck with Lagos Nigeria print' }],
  },
  {
    slug: 'lagos-skyline-tee', name: 'LAGOS SKYLINE TEE', price: 35000, category: 'tees', sizes: SX, soldOut: [],
    tags: ['new'], added: 17,
    description: 'Black oversized tee. The road out of Lagos runs across the hem.',
    images: [{ key: 'lagos-skyline-tee', alt: 'Black tee with Lagos skyline road print' }, { key: 'detail-skyline', alt: 'Close-up of the skyline print' }],
  },
  {
    slug: 'stay-strong-tee', name: 'STAY STRONG TEE', price: 35000, category: 'tees', sizes: SX, soldOut: [],
    tags: ['new'], added: 16,
    description: 'A flag, a bandage, a broken heart. Stay strong.',
    images: [{ key: 'staystrong-tee', alt: 'Black Stay Strong tee' }, { key: 'photo-railway', alt: 'Models in Stay Strong pieces at a derelict Nigerian railway', pos: '50% 50%' }],
  },
  {
    slug: 'stay-strong-tank', name: 'STAY STRONG TANK', price: 30000, category: 'tees', sizes: S, soldOut: [],
    tags: [], added: 15,
    description: 'Sleeveless cut of the Stay Strong graphic.',
    images: [{ key: 'staystrong-tank', alt: 'Black sleeveless Stay Strong tank' }, { key: 'photo-railway', alt: 'Model wearing the Stay Strong tank by a railway carriage', pos: '30% 45%' }],
  },
  {
    slug: 'the-street-tee', name: 'THE STREET TEE', price: 38000, category: 'tees', sizes: SX, soldOut: ['XXL'],
    tags: ['limited'], added: 14,
    description: 'Stone oversized tee. A soldier on the hem, a statement on the chest.',
    images: [{ key: 'street-military-tee', alt: 'Stone coloured tee with soldier print' }, { key: 'photo-street', alt: 'Model in the stone tee and camo cargos on a Lagos street', pos: '50% 28%' }],
  },
  {
    slug: 'big-dream-tee', name: 'BIG DREAM TEE', price: 40000, category: 'tees', sizes: S, soldOut: [],
    tags: ['limited'], added: 13,
    description: 'The Nigerian dream, printed big. Hope in the mirror.',
    images: [{ key: 'big-dream-tee', alt: 'Black tee with Big Dream Hope mirror print' }, { key: 'detail-bigdream', alt: 'Close-up of the Big Dream print' }],
  },
  {
    slug: 'nigeria-stitch-tee', name: 'NIGERIA STITCH TEE', price: 38000, category: 'tees', sizes: S, soldOut: [],
    tags: [], added: 12,
    description: 'Stitched-patch lettering. Heavy statement, clean fit.',
    colors: [{ name: 'White', image: 0 }, { name: 'Black', image: 1 }],
    images: [{ key: 'nigeria-stitch-tee', alt: 'White Nigeria stitched lettering tee' }, { key: 'nigeria-stitch-tee-black', alt: 'Black Nigeria stitched lettering tee' }],
  },
  {
    slug: 'chained-fist-tank', name: 'CHAINED FIST TANK', price: 32000, category: 'tees', sizes: S, soldOut: [],
    tags: [], added: 11,
    description: 'Sleeveless tank with shoulder eyelets and a fist wrapped in rusted chain.',
    images: [{ key: 'chained-fist-tank', alt: 'Black tank with fist and chain print' }, { key: 'detail-fist', alt: 'Close-up of the fist print' }],
  },
  {
    slug: 'benin-mask-set', name: 'BENIN MASK SET', price: 72000, category: 'tees', sizes: S, soldOut: [],
    tags: ['limited'], added: 10,
    description: 'Oversized tee and cargo shorts. Line-drawn Benin mask, TRAP repeat across the fabric.',
    images: [{ key: 'benin-mask-set', alt: 'Brown mask-print tee with sand cargo shorts' }, { key: 'detail-mask', alt: 'Close-up of the mask print' }],
  },
  {
    slug: 'floral-set', name: 'WORDS & FLOWERS SET', price: 60000, category: 'tees', sizes: S, soldOut: [],
    tags: [], added: 9,
    description: 'White tee with hand-drawn blooms, paired with piped black shorts.',
    images: [{ key: 'floral-set', alt: 'White floral tee with black piped shorts' }],
  },
  {
    slug: 'mudcloth-zip-polo', name: 'MUDCLOTH ZIP POLO', price: 46000, category: 'tees', sizes: S, soldOut: [],
    tags: [], added: 8,
    description: 'Black quarter-zip with a hand-drawn mudcloth panel across the shoulder.',
    images: [{ key: 'mudcloth-polo', alt: 'Black zip polo with white mudcloth pattern' }],
  },
  {
    slug: 'bloom-zip-polo', name: 'BLOOM ZIP POLO', price: 46000, category: 'tees', sizes: S, soldOut: [],
    tags: [], added: 7,
    description: 'Black quarter-zip, red botanical print over geometric stripes.',
    images: [{ key: 'floral-polo', alt: 'Black zip polo with red floral print' }],
  },
  {
    slug: 'zip-knit-polo', name: 'ZIP KNIT POLO', price: 50000, category: 'tees', sizes: S, soldOut: [],
    tags: [], added: 6,
    description: 'Short-sleeve knit, full zip, contrast stripe detailing.',
    colors: [{ name: 'Black', image: 0 }, { name: 'Navy', image: 1 }],
    images: [{ key: 'knit-polo-black', alt: 'Black zip knit polo with white stripes' }, { key: 'knit-polo-navy', alt: 'Navy zip knit polo with white stripes' }],
  },
  {
    slug: 'crochet-vest', name: 'CROCHET PANEL VEST', price: 58000, category: 'tees', sizes: ['S', 'M', 'L'], soldOut: [],
    tags: ['limited'], added: 5,
    description: 'Hand-crochet open-front vest. Two textures, mirrored pockets.',
    images: [{ key: 'crochet-vest', alt: 'Burgundy two-texture crochet vest' }],
  },
  {
    slug: 'piping-shorts', name: 'PIPING SHORTS', price: 28000, category: 'bottoms', sizes: S, soldOut: [],
    tags: ['new'], added: 4,
    description: 'Black track shorts, white side piping, embroidered TRAP mark.',
    images: [{ key: 'piping-shorts', alt: 'Black shorts with white piping' }],
  },
  {
    slug: 'cargo-shorts', name: 'STREET CARGO SHORTS', price: 30000, category: 'bottoms', sizes: S, soldOut: ['XL'],
    tags: ['new'], added: 3,
    description: 'Sand cargo shorts. Buckle pocket, drawcord, TRAP repeat print.',
    images: [{ key: 'cargo-shorts-sand', alt: 'Sand cargo shorts with TRAP print' }],
  },
  {
    slug: 'street-cargo-pants', name: 'TRAP STREET CARGO', price: 70000, category: 'bottoms', sizes: S, soldOut: [],
    tags: [], status: 'soon', added: 2,
    description: 'Full-length cargo. Next drop.',
    images: [],
  },
  {
    slug: 'bucket-hat', name: 'TRAP BUCKET HAT', price: 20000, category: 'accessories', sizes: ['ONE SIZE'], soldOut: [],
    tags: ['new'], added: 1,
    description: 'Black bucket with a mudcloth-print brim, chin strap and the gold TRAP mark.',
    images: [{ key: 'bucket-hat', alt: 'Black bucket hat with patterned brim' }],
  },
]

export const getProduct = (slug) => products.find((p) => p.slug === slug)
export const dropProducts = () => products.filter((p) => p.drop).sort((a, b) => a.drop - b.drop)
export const formatPrice = (n) => `₦${n.toLocaleString('en-NG')}`
