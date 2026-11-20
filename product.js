/* product.js - one piece on its own page: product.html?id=<card id>, opened from a collection card.
   The piece comes from the list in valenzo.js (VZ.items); an id that is not in that list goes back to the collection.
   While the Shopify store is closed the page offers the studio's WhatsApp, with the piece (and size) already written in;
   once the store sells the piece, cart.js puts the live price, the sizes in stock and "Add to cart" into #pp-buy instead.
   Looks are in valenzo.css (.pp-*, .shots), words in lang.js. */
(function () {
  "use strict";
  var VZ = window.VZ, T = window.T, el = VZ.el, WA = "https://wa.me/13238473181?text=";
  function $(id) { return document.getElementById(id); }
  function style(it) { return it.id.split("_")[0]; }
  function page(it) { return "product.html?id=" + it.id; }
  try { sessionStorage.setItem("vz_back", "1"); } catch (e) {}   // going back to the showroom from here: the door film does not replay

  document.addEventListener("DOMContentLoaded", function () {
    var it = VZ.item(new URLSearchParams(location.search).get("id"));
    if (!it) { location.replace("index.html#collection"); return; }
    var fig = $("pp-fig"), n = el("span", "niche"), im = VZ.pic(it, "fig"), buy = $("pp-buy"), size = "";
    document.title = VZ.full(it) + " · Valenzo Studio";
    fig.className += it.photo ? " flat photo" : it.flat ? " flat" : "";
    im.loading = "eager"; im.alt = VZ.full(it) + (it.photo ? "" : T(" on a display mannequin"));
    n.appendChild(el("span", "beam")); n.appendChild(im); fig.appendChild(n);
    $("pp-cat").textContent = VZ.catName(it.cat); $("pp-name").textContent = it.name; $("pp-tone").textContent = it.tone;
    $("pp-price").textContent = it.price ? "$" + it.price.toFixed(2) : T("Price on TikTok Shop");
    $("pp-desc").textContent = it.desc;
    buy.dataset.key = it.id.replace(/_(front|back)$/, "");   // how cart.js finds this piece in the store

    /* the other colours (and, for jeans, the back) of the same style */
    var same = VZ.items.filter(function (o) { return style(o) === style(it); });
    same.forEach(function (o) {
      var a = el("a", o.photo ? "photo" : ""); a.href = page(o); a.setAttribute("aria-label", o.tone);
      if (o === it) a.setAttribute("aria-current", "true");
      a.appendChild(VZ.pic(o)); $("pp-shots").appendChild(a);
    });
    $("pp-shots").hidden = same.length < 2;

    /* ordering while the store is closed: a message to the studio with the piece already written in */
    var sizes = el("div", "sizes"), wa = el("a", "btn gold wide", T("Order on WhatsApp"));
    function ask() { wa.href = WA + encodeURIComponent(T("Hi Valenzo Studio, I would like to order: ") + VZ.full(it) + (size ? ", " + T("Size") + " " + size : "")); }
    sizes.setAttribute("role", "group"); sizes.setAttribute("aria-label", T("Size"));
    /* shortcut: sizes shown only for the pieces the studio confirmed a size run for (the photo set, S-3XL, 2026-11-20); the store's own sizes replace these when it opens */
    if (it.photo) VZ.sizes.forEach(function (s) {
      var b = el("button", "", s); b.type = "button"; b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", function () {
        size = s; ask();
        [].forEach.call(sizes.children, function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      });
      sizes.appendChild(b);
    });
    wa.target = "_blank"; wa.rel = "noopener noreferrer"; ask();
    if (sizes.children.length) buy.appendChild(sizes);
    buy.appendChild(wa);
    if (!it.flat) { var tr = el("a", "btn line wide", T("Try it on")); tr.href = "index.html?try=" + it.id + "#fitting-room"; buy.appendChild(tr); }   // the 3D pieces

    /* you may also like: the next four other styles of the same kind */
    var at = VZ.items.indexOf(it), seen = {}, more = $("more");
    seen[style(it)] = 1;
    VZ.items.slice(at).concat(VZ.items.slice(0, at)).forEach(function (o) {
      if (more.children.length > 3 || o.cat !== it.cat || seen[style(o)]) return;
      seen[style(o)] = 1;
      var li = VZ.card(o); li.firstChild.className += " lit"; more.appendChild(li);
    });
    $("also").hidden = !more.children.length;
  });
})();
