import { createServer } from 'vite'
import React from 'react'
import { renderToString } from 'react-dom/server'
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error', ssr: { noExternal: ['react-router-dom'] } })
const { StaticRouter } = await server.ssrLoadModule('react-router-dom/server')
const { CartProvider } = await server.ssrLoadModule('/src/context/CartContext.jsx')
const App = (await server.ssrLoadModule('/src/App.jsx')).default
for (const url of ['/', '/shop?cat=bottoms', '/shop?sort=price-desc', '/product/stay-strong-hoodie', '/product/street-cargo-pants', '/product/nope', '/info/contact', '/zzz']) {
  try {
    const html = renderToString(React.createElement(StaticRouter, { location: url }, React.createElement(CartProvider, null, React.createElement(App))))
    console.log('OK  ', url, html.length, (html.match(/<img/g) || []).length + ' imgs')
  } catch (e) { console.log('FAIL', url, e.message.slice(0, 400)) }
}
await server.close()
