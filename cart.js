/* cart.js - the shopping cart. Prices, sizes and stock are read live from the studio's Shopify store, so they are changed in
   Shopify and nowhere else. A card gets a price and "Add to cart" only while its style is open for sale there at more than $0;
   until then (store behind its password page, no price yet, sold out) the page stays exactly as it was.
   A card is matched to Shopify by style number + colour: the product "VPL15 Long Sleeve Shirt", Color "Black" is card c-vpl15_black.
   Paying happens on Shopify: the Checkout button is a Shopify cart link. Looks are in valenzo.css (.buy, .ct), words in lang.js.
   shortcut: reads the store's public product list (one request, first 250 products, US dollars assumed); move to Shopify's
   Storefront API if the catalogue outgrows 250 styles or the store sells in another currency.
   shortcut: Shopify cannot tell this page that an order was paid, so the cart keeps its pieces after checkout until they are taken out. */
(function () {
  "use strict";
  var SHOP = "https://shop.valenzoclothing.com", T = window.T;   // the same address is allowed in index.html's Content-Security-Policy (connect-src)
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; }
  function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "_"); }
  function usd(n) { return "$" + n.toFixed(2); }
  function link(lines) { return SHOP + "/cart/" + lines.map(function (l) { return l.v + ":" + l.q; }).join(","); }
  console.assert(link([{ v: "1", q: 2 }, { v: "3", q: 1 }]) === SHOP + "/cart/1:2,3:1", "cart link");

  function start(products) {
    var STYLE = {}, BY = {}, NAME = {}, cart = [];
    products.forEach(function (p) {
      var at = {};                                          // which of option1..3 holds the colour and which the size
      (p.options || []).forEach(function (o) { at[/colou?r/i.test(o.name) ? "c" : /size|talla/i.test(o.name) ? "s" : "x"] = "option" + o.position; });
      p.variants.forEach(function (v) {
        var id = String(v.id), price = Number(v.price), key = slug(p.title.split(" ")[0] + "_" + (v[at.c] || ""));
        if (!v.available || !(price > 0) || !/^\d+$/.test(id)) return;   // never offer a sold-out or $0 piece
        BY[id] = { key: key, size: at.s ? String(v[at.s]) : "", price: price };
        (STYLE[key] = STYLE[key] || []).push(id);
      });
    });

    /* ---- price, size and "Add to cart" under every card Shopify has for sale; the front and back photos of one pair of jeans are the same piece ---- */
    [].forEach.call(document.querySelectorAll("#grid > li"), function (li) {
      var key = li.id.slice(2).replace(/_(front|back)$/, ""), ids = STYLE[key];
      if (!ids) return;
      NAME[key] = NAME[key] || [li.querySelector(".name").textContent, li.querySelector(".tone").textContent.split(" · ")[0]];
      var box = el("div", "buy"), price = el("p", "price"), sel = el("select"), add = el("button", "btn line small", T("Add to cart"));
      ids.forEach(function (id) { var o = el("option", "", BY[id].size); o.value = id; sel.appendChild(o); });
      function show() { price.textContent = usd(BY[sel.value].price); }
      sel.setAttribute("aria-label", T("Size")); sel.hidden = !BY[ids[0]].size; sel.addEventListener("change", show);
      add.type = "button"; add.addEventListener("click", function () { put(sel.value, 1); dlg.showModal(); });
      show(); box.appendChild(price); box.appendChild(sel); box.appendChild(add); li.appendChild(box);
    });
    if (!Object.keys(NAME).length) return;                  // nothing for sale yet: no cart button either

    /* ---- the cart: a button in the top bar (in place of "Shop on TikTok") and a sheet with the pieces, the subtotal and Checkout ---- */
    var dlg = el("dialog", "ct"), hd = el("div", "fq-hd"), x = el("button", "fq-x", "×"), list = el("ul"), sum = el("p", "total"),
        go = el("a", "btn gold", T("Checkout")), open = el("button", "btn gold small"), tk = document.querySelector(".bar-end a.btn");
    dlg.setAttribute("aria-label", T("Cart")); x.type = open.type = "button"; x.setAttribute("aria-label", T("Close"));
    x.addEventListener("click", function () { dlg.close(); }); open.addEventListener("click", function () { dlg.showModal(); });
    hd.appendChild(el("b", "", T("Cart"))); hd.appendChild(x);
    [hd, list, sum, el("p", "fine", T("Shipping and taxes are worked out at checkout.")), go].forEach(function (n) { dlg.appendChild(n); });
    document.body.appendChild(dlg); tk.parentNode.replaceChild(open, tk);

    function draw() {
      var units = 0, total = 0, was = [].indexOf.call(list.querySelectorAll("button"), document.activeElement), bs;
      list.textContent = "";
      cart.forEach(function (l) {
        var b = BY[l.v], li = el("li"), what = el("span", "", NAME[b.key][0]), less = el("button", "", "−"), more = el("button", "", "+");
        what.appendChild(el("small", "", NAME[b.key][1] + (b.size ? " · " + b.size : "") + " · " + usd(b.price)));
        less.type = more.type = "button"; less.setAttribute("aria-label", T("One less")); more.setAttribute("aria-label", T("One more"));
        less.addEventListener("click", function () { put(l.v, -1); }); more.addEventListener("click", function () { put(l.v, 1); });
        [what, less, el("b", "", String(l.q)), more].forEach(function (n) { li.appendChild(n); });
        list.appendChild(li); units += l.q; total += b.price * l.q;
      });
      open.textContent = T("Cart") + " · " + units;
      sum.textContent = units ? T("Subtotal $") + total.toFixed(2) : T("Your cart is empty.");
      go.hidden = !units; go.href = link(cart);
      bs = list.querySelectorAll("button");                 // the list was rebuilt: keep a keyboard user where they were
      if (was >= 0) (bs[Math.min(was, bs.length - 1)] || x).focus();
    }
    function put(v, n) {
      var l = cart.filter(function (c) { return c.v === v; })[0];
      if (!l) cart.push(l = { v: v, q: 0 });
      l.q = Math.min(99, l.q + n);
      cart = cart.filter(function (c) { return c.q > 0; });
      try { localStorage.setItem("vz_cart", JSON.stringify(cart)); } catch (e) {}   // storage switched off: the cart lasts until the page closes
      draw();
    }
    try { cart = JSON.parse(localStorage.getItem("vz_cart")) || []; } catch (e) {}
    cart = (Array.isArray(cart) ? cart : []).filter(function (l) {   // saved on an earlier visit: keep only what is still for sale
      return l && BY[l.v] && NAME[BY[l.v].key] && l.q >= 1 && l.q <= 99 && l.q % 1 === 0;
    });
    draw();
  }

  document.addEventListener("DOMContentLoaded", function () {   // after valenzo.js has built the cards
    fetch(SHOP + "/products.json?limit=250", { credentials: "omit" })
      .then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .then(function (j) { return j.products; })
      .then(start, function () {});                         // store closed or unreachable: no cart, the page stays as it was
  });
})();
