import { createServer } from 'vite'
import React from 'react'
import { renderToString } from 'react-dom/server'
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error', ssr: { noExternal: ['react-router-dom'] } })
const { StaticRouter } = await server.ssrLoadModule('react-router-dom/server')
const { Routes, Route } = await server.ssrLoadModule('react-router-dom')
const { CartProvider } = await server.ssrLoadModule('/src/context/CartContext.jsx')
const Shop = (await server.ssrLoadModule('/src/pages/Shop.jsx')).default
const Product = (await server.ssrLoadModule('/src/pages/Product.jsx')).default
const Info = (await server.ssrLoadModule('/src/pages/Info.jsx')).default
const Cart = (await server.ssrLoadModule('/src/components/CartDrawer.jsx')).default
const el = (url) => React.createElement(StaticRouter, { location: url }, React.createElement(CartProvider, null,
  React.createElement(Routes, null,
    React.createElement(Route, { path: '/shop', element: React.createElement(Shop) }),
    React.createElement(Route, { path: '/product/:slug', element: React.createElement(Product) }),
    React.createElement(Route, { path: '/info/:slug', element: React.createElement(Info) })),
  React.createElement(Cart)))
for (const u of ['/shop', '/shop?cat=accessories', '/shop?cat=bottoms&sort=price-asc', '/product/stay-strong-hoodie', '/product/trapgenesis-zip-polo', '/product/street-cargo-pants', '/product/bucket-hat', '/product/nope', '/info/shipping']) {
  try { const h = renderToString(el(u)); console.log('OK  ', u, h.length, (h.match(/<article/g) || []).length + ' cards') }
  catch (e) { console.log('FAIL', u, e.message.slice(0, 300)) }
}
await server.close()
