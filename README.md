# TRAP — Passion For Fashion · Built To Break Out.
Concept e-commerce site. React + Vite + Tailwind + Framer Motion + Lucide.

## Run
```
npm install
npm run dev      # local
npm run build    # production → dist/ (Netlify/Vercel ready: _redirects + vercel.json included)
```

## Replace these first (all marked CONFIRM)
- `src/data/siteData.js` → WhatsApp number (checkout sends the order there), email, TikTok URL, **NEXT_DROP.date** (countdown), size chart, shipping/returns/privacy copy.
- `src/data/products.js` → names, prices, sizes, sold-out sizes, descriptions. **All prices are placeholders.**
  Add an item = add an object. `images[].key` = file prefix in `src/assets/img` (`name-640.webp`, `name-1200.webp`; srcSet is automatic).
- `scripts/images.py`, `scripts/images2.py` show how the Instagram flyers were cropped (title, footer and "ORDER NOW" removed).

## Structure
```
src/components  Navbar, Button (magnetic), ProductCard, ProductGrid, Countdown, CartDrawer, Modal, Accordion, Footer, Cursor, Loader…
src/sections    Hero, DropSection, BreakOut (signature scroll piece), NextDrop, Genesis, BrandStory, Lookbook
src/pages       Home, Shop, Product, Info (shipping/returns/privacy/contact), NotFound
src/data        siteData.js, products.js     src/context CartContext (localStorage)
```
Shop + Product + Info are code-split. Reduced-motion is respected everywhere.
