# Valenzo Studio showroom

The 3D showroom served at https://valenzoclothing.com (GitHub Pages). Static files only, no build step.
The online store is the client's Shopify store at shop.valenzoclothing.com.

## Where things are edited

- `faq.json`: every answer the "May I help you?" helper gives (phone, hours, email, links, shipping, returns), in English and Spanish. Change the studio's details here.
- `lang.js`: the Spanish wording for the rest of the page. A phrase missing from it stays in English.
- `img/on-<shirt>-<jeans>.webp`: the mannequin pictures the floor changes through every 10 seconds (list built in `valenzo.js`, `LOOKS`).

## The cart

`cart.js` reads the Shopify store's product list each time the page opens. A card shows a price and "Add to cart" only when
its style is for sale in Shopify: product Active and on the Online Store, price above $0, in stock, and the store's password
page off. Prices, sizes (a "Size" option on the product) and stock are changed in Shopify only; this site follows on the next page load.

- A card is matched by style number and colour: Shopify product "VPL15 Long Sleeve Shirt" with Color "Black" is the card `vpl15_black`.
  A new colour or style needs its card in `valenzo.js` (and its mannequin picture in `img/`: `on-<shirt>-<jeans>.webp`, or `on-<id>.webp` for jeans) to be sold here.
- Checkout is a Shopify cart link on `shop.valenzoclothing.com`. If the store's main address ever changes, change `SHOP` in
  `cart.js` and the same address in the `Content-Security-Policy` line of `index.html`.
