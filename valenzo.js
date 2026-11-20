/* Valenzo Studio showroom: the floor of dressed mannequins, collection cards that light up, the mix-and-match fitting room (3D in fit.js), opening sequence.
   No network calls beyond this folder's own images/models. Every word shown goes through T() (lang.js), so the page reads in English or Spanish. */
(function () {
  "use strict";
  var root = document.documentElement, T = window.T;
  var calm = matchMedia("(prefers-reduced-motion: reduce)").matches, back = false;
  try { back = sessionStorage.getItem("vz_back"); sessionStorage.removeItem("vz_back"); } catch (e) {}   // left by the language switch, which reloads the page: the doors do not replay
  if (!calm && !back) root.classList.add("intro-on");  // set before first paint so the door film covers the store

  var CATS = [["all", "All"], ["crystal", "Crystal"], ["print", "Prints"], ["denim", "Denim"], ["polo", "Polos"]];
  var ITEMS = [
    { id: "rh_white", cat: "crystal", name: "Crystal Key Shirt", tone: "White", desc: "A crystal and stud key pattern across the whole body, with a matching band at the collar and cuffs." },
    { id: "rh_black", cat: "crystal", name: "Crystal Key Shirt", tone: "Black", desc: "The same crystal key pattern on black, with the band repeated at the collar and cuffs." },
    { id: "pr_navy", cat: "print", name: "Painted Print Shirt", tone: "Midnight", desc: "A deep navy ground with rust and cream brushwork from edge to edge." },
    { id: "pr_cream", cat: "print", name: "Marble Print Shirt", tone: "Ivory", desc: "An ivory ground veined in navy, grey and gold, finished with dark gold-rimmed buttons." },
    { id: "pr_sage", cat: "print", name: "Painted Print Shirt", tone: "Sage", desc: "A soft sage ground with olive and cream brushwork." },
    { id: "pr_blue", cat: "print", name: "Painted Print Shirt", tone: "Sky", desc: "A pale blue ground with navy and grey brushwork." },
    { id: "vdm07", cat: "denim", name: "VDM07 Boot Cut", tone: "Dark Indigo", desc: "Dark indigo denim with the signature V embroidered on both back pockets and a leather Valenzo patch at the waist." },
    { id: "bc_blue", cat: "denim", name: "Signature V Boot Cut", tone: "Faded Blue", desc: "A mid-blue fade with heavy white contrast stitching and the signature V on the back pockets." },
    { id: "bc_black", cat: "denim", name: "Signature V Boot Cut", tone: "Black", desc: "Black denim with the signature V stitched in grey." },
    { id: "bc_ice", cat: "denim", name: "Signature V Boot Cut", tone: "Ice Wash", desc: "Ice wash denim with the signature V stitched in dark thread." }
  ];
  /* the polo colours listed in the Shopify store: mannequin-picture cards only (class "flat"), no 3D model yet, so they stay out of the fitting room */
  [["01", "White Black"], ["05", "Black White"], ["06", "Black Grey White"], ["07", "Black Blue Khaki White"], ["08", "Black Navy White"], ["09", "Black Grey White"],
   ["10", "Black Blue White"], ["11", "Black Brown White"], ["12", "Black Navy White"], ["13", "Black Navy White"], ["14", "Black White"]].forEach(function (p) {
    p[1].split(" ").forEach(function (c) { ITEMS.push({ id: "vps" + p[0] + "_" + c.toLowerCase(), cat: "polo", name: "VPS" + p[0] + " Polo Shirt", tone: c, flat: true }); });
  });
  /* long sleeve shirts and jeans from the studio's 11-16 photo sets: mannequin-picture cards only, one card per photo */
  [["crystal", "VPL15 Long Sleeve Shirt", "Black,Red,White"], ["crystal", "VPL16 Long Sleeve Shirt", "Black,White"], ["crystal", "VPL18 Long Sleeve Shirt", "Black,Navy,White"],
   ["crystal", "VPL19 Long Sleeve Shirt", "Black,White"], ["print", "VPL20 Long Sleeve Shirt", "Black,Blue,White"], ["print", "VPL21 Long Sleeve Shirt", "Beige,Black,Blue,White"],
   ["print", "VPL22 Long Sleeve Shirt", "Beige,Black,Green,White"], ["print", "VPL23 Long Sleeve Shirt", "Black,Red,White"], ["print", "VPL24 Long Sleeve Shirt", "Black,Brown"],
   ["print", "VPL25 Long Sleeve Shirt", "Beige,Black,Green,White"], ["print", "VPL26 Long Sleeve Shirt", "Brown,Navy,Red,White"], ["print", "VPL27 Long Sleeve Shirt", "Black,Brown,Burgundy,Grey"],
   ["print", "VPL28 Long Sleeve Shirt", "Blue,Brown,Green,White"],
   ["denim", "VDM03 Denim Jeans", "Black \u00b7 Front,Black \u00b7 Back,Light Blue \u00b7 Front,Light Blue \u00b7 Back"], ["denim", "VDM05 Denim Jeans", "Black \u00b7 Back,Dark Indigo \u00b7 Front,Dark Indigo \u00b7 Back"],
   ["denim", "VDM06 Denim Jeans", "Black \u00b7 Front,Blue \u00b7 Front,Blue \u00b7 Back,Light Blue \u00b7 Back"], ["denim", "VDM08 Denim Jeans", "Light Blue \u00b7 Front"],
   ["denim", "VMD05 Denim Jeans", "Black \u00b7 Front,Black \u00b7 Back"]].forEach(function (p) {
    p[2].split(",").forEach(function (c) { ITEMS.push({ id: (p[1].split(" ")[0] + "_" + c).toLowerCase().replace(/[^a-z0-9]+/g, "_"), cat: p[0], name: p[1], tone: c, flat: true }); });
  });
  /* long sleeve shirts from the studio's 11-20 photo set.
     shortcut: photo: true = the card shows the studio photo (img/<id>.webp), the piece stays off the showroom floor and has no price,
     because its mannequin picture is not made and the studio has not sent a price; add the piece to the list above when both exist */
  [["VPL29", "Beige,Grey,Navy"], ["VPL30", "Beige,Black,Blue,Red"], ["VPL31", "Brown,Navy,Red,White"], ["VPL33", "Black,Green,Khaki,White"],
   ["VPL34", "Beige,Blue,Burgundy,Grey"], ["VPL35", "Beige,Black"], ["VPL36", "Beige,Black,Khaki"], ["VPL37", "Black,Blue,Red,White"],
   ["VPL38", "Beige,Black,Burgundy,Navy"], ["VPL39", "Black,Blue,Burgundy"], ["VPL40", "Black,Burgundy"]].forEach(function (p) {
    p[1].split(",").forEach(function (c) { ITEMS.push({ id: (p[0] + "_" + c).toLowerCase(), cat: "print", name: p[0] + " Long Sleeve Shirt", tone: c, flat: true, photo: true }); });
  });
  /* what each photo-set style looks like, by style number; every colour of a style shares it. The Spanish is in lang.js */
  var DESC = {
    vps01: "A clean polo with an embroidered crest on the chest, contrast buttons and a patterned collar.",
    vps05: "A polo with a band of scrolls and key squares down one side, dotted sleeves and a patterned collar.",
    vps06: "A polo with a wide key-pattern panel across the chest and a tipped collar and cuffs.",
    vps07: "A polo crossed by a large tonal plaid.",
    vps08: "A polo with studs scattered across the shoulders and chest, a studded collar and patterned cuffs.",
    vps09: "A polo with a textured geometric panel across the shoulders and fine lines crossing the body.",
    vps10: "A polo with stud diamonds across the body, a key-pattern stripe down the front and key-pattern collar and cuffs.",
    vps11: "A polo with a patterned knit panel across the chest, a plaid accent and a striped collar.",
    vps12: "A plain polo with a small embroidered bee on the chest and stripes at the collar and cuffs.",
    vps13: "A polo with fine stripes that cross into a plaid on the front.",
    vps14: "A polo with a windowpane line pattern and a striped band across the chest and cuffs.",
    vpl15: "Baroque scrollwork and a key border across the chest, finished with studs.",
    vpl16: "A maze pattern outlined in studs over the whole shirt, with key-pattern collar and cuffs.",
    vpl18: "Two bold key-pattern stripes down the front with lines of studs between them, and a key-pattern collar.",
    vpl19: "Stud diamonds across the chest with lines of studs running down the body.",
    vpl20: "A small all-over geometric print with a brushed, worn-in finish.",
    vpl21: "An all-over geometric tile print set in rows.",
    vpl22: "A small all-over floral print in soft tones.",
    vpl23: "Key-pattern stripes alternating with baroque scrollwork from collar to hem.",
    vpl24: "An all-over floral and scroll print.",
    vpl25: "An all-over painted print with a brushed marble look.",
    vpl26: "A tonal all-over print of key squares and paisley.",
    vpl27: "Bold baroque leaves over a small key-pattern ground.",
    vpl28: "A diamond lattice print with brushed streaks across it.",
    vpl29: "A plaid of bold crossing bands with fine coloured lines.",
    vpl30: "A wavy tiger-stripe print with silver streaks through it.",
    vpl31: "Vertical brushed streaks in mixed tones from collar to hem.",
    vpl33: "A small flower motif repeated in a grid, edge to edge.",
    vpl34: "Round lion medallions and diagonal chain bands over a key-pattern ground.",
    vpl35: "Baroque scrolls and chain links over a key-pattern ground.",
    vpl36: "Bold striped panels over a small flower-dot ground.",
    vpl37: "Small circles, diamonds and four-point stars repeated in a grid.",
    vpl38: "A large, bold check plaid.",
    vpl39: "Vertical rows of small diamond motifs, with a chest pocket.",
    vpl40: "A small all-over medallion print, with a chest pocket.",
    vdm03: "Boot cut jeans with a V stitched on each back pocket under a studded band.",
    vdm05: "Boot cut jeans with layered V embroidery on the back pockets and heavy contrast stitching.",
    vdm06: "Boot cut jeans with a wide flare and bold geometric V embroidery on the back pockets.",
    vdm08: "Light wash boot cut jeans with heavy contrast stitching and whiskered fading.",
    vmd05: "Boot cut jeans with tonal V stitching on the back pockets."
  };
  /* shortcut: these prices were copied by hand from the Shopify store on 2026-11-18 and are shown while that store is still closed;
     once it opens, cart.js puts Shopify's live price on the card and in the details sheet, and this list can go */
  ITEMS.forEach(function (it) {
    if (!it.flat) return;
    var code = it.id.split("_")[0];
    it.desc = DESC[code];
    if (!it.photo) it.price = /^(vdm|vmd)/.test(code) ? 79.99 : /^(vpl1[5689]|vps08|vps10)$/.test(code) ? 69.99 : 49.99;
  });
  console.assert(ITEMS.every(function (it) { return !it.flat || (it.desc && (it.photo ? !it.price : it.price > 0)); }) && item("vpl15_red").price === 69.99 && item("vps12_navy").price === 49.99 && item("vmd05_black_back").price === 79.99 && item("vpl29_grey").photo, "photo-set piece without a description or with the wrong price");
  /* shortcut: sample size run, and no prices on the ten 3D pieces, because the studio has not sent them; put the real sizes here and a price (a number, in dollars) on each of those items when they do */
  var SIZES = {   // [label, how much wider the mannequin stands than at the middle size]
    top: [["S", 0.96], ["M", 1], ["L", 1.04], ["XL", 1.08], ["2XL", 1.12], ["3XL", 1.16]],
    bottom: [["28", 0.94], ["30", 0.97], ["32", 1], ["34", 1.03], ["36", 1.06], ["38", 1.09], ["40", 1.12], ["42", 1.15]]
  };
  var KIND = { top: "Shirt", bottom: "Denim" };
  /* one dressed mannequin per plinth of img/hall.webp: [shirt, jeans, feet x %, feet y %, height %] */
  var HALL = [
    ["rh_white", "vdm07", 17.2, 73.4, 43.6], ["pr_navy", "bc_blue", 28.7, 64.8, 23.4], ["pr_sage", "vdm07", 34.1, 60.7, 17.2], ["rh_black", "bc_blue", 37.9, 58.7, 12.2],
    ["rh_white", "bc_ice", 62.1, 58.7, 12.2], ["pr_blue", "bc_black", 65.9, 60.7, 17.2], ["pr_cream", "bc_black", 71.4, 64.8, 23.4], ["rh_black", "bc_ice", 82.7, 73.4, 43.6]
  ];
  /* the floor shows every shirt in turn: the 8 opening outfits, then each long sleeve and each polo, in the jeans its mannequin picture (img/on-<shirt>-<jeans>.webp) was made with */
  var LOOKS = HALL.map(function (h) { return [h[0], h[1]]; });
  ["vpl", "vps"].forEach(function (k) {
    ITEMS.filter(function (it) { return !it.photo; }).map(function (it) { return it.id; }).filter(function (id) { return id.indexOf(k) === 0; }).sort()
      .forEach(function (id, i) { LOOKS.push([id, ["vdm07", "bc_blue", "bc_black", "bc_ice"][i % 4]]); });
  });
  /* a photo-set piece is shown on a mannequin too: a shirt in the picture the floor uses, jeans in their own img/on-<id>.webp */
  var WORN = {};
  LOOKS.forEach(function (l) { WORN[l[0]] = "on-" + l[0] + "-" + l[1]; });
  /* names, colours and descriptions in the visitor's language; a style number (VPL15) stays as it is */
  ITEMS.forEach(function (it) {
    it.name = it.name.replace(/^(V[A-Z]+\d+ )?(.+)$/, function (all, code, words) { return (code || "") + T(words); });
    it.tone = it.tone.split(" · ").map(T).join(" · ");
    if (it.desc) it.desc = T(it.desc);
  });
  /* shared with fit.js, the 3D fitting room, which is only fetched once somebody heads for it */
  var VZ = window.VZ = { calm: calm, look: { top: "rh_white", bottom: "vdm07" }, girth: 1 };

  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; }
  function catName(c) { for (var i = 0; i < CATS.length; i++) if (CATS[i][0] === c) return T(CATS[i][1]); return ""; }
  function full(it) { return it.name + T(" in ") + it.tone; }
  function item(id) { for (var i = 0; i < ITEMS.length; i++) if (ITEMS[i].id === id) return ITEMS[i]; }
  function kind(it) { return it.cat === "denim" ? "bottom" : "top"; }
  function pic(it, cls) { var im = el("img", cls); im.src = "img/" + (it.flat && !it.photo ? WORN[it.id] || "on-" + it.id : it.id) + ".webp"; im.alt = ""; im.decoding = "async"; if (it.flat) im.loading = "lazy"; return im; }

  document.addEventListener("DOMContentLoaded", function () {
    var grid = $("grid"), cats = $("cats"), floor = $("floor"), hall = $("hall"), ui = {}, size = { top: "M", bottom: "32" }, booted = false;
    var touch = matchMedia("(hover: none)").matches;

    /* ---- fitting room: a shirt and a pair of jeans, each with its own picker, sizes and price ---- */
    function boot() {
      if (booted) return;
      booted = true;
      var s = el("script"); s.type = "module"; s.src = "fit.js?v=4"; document.head.appendChild(s);
    }
    function mark(box, attr, hit) {
      [].forEach.call(box.children, function (b) { if (hit(b)) b.setAttribute(attr, "true"); else if (attr === "aria-pressed") b.setAttribute(attr, "false"); else b.removeAttribute(attr); });
    }
    function paint() {
      var girth = 0, total = 0, priced = true, worn = [];
      ["top", "bottom"].forEach(function (k) {
        var it = item(VZ.look[k]), u = ui[k];
        u.name.textContent = it.name; u.tone.textContent = it.tone; u.desc.textContent = it.desc;
        u.price.textContent = it.price ? "$" + it.price.toFixed(2) : T("Price on TikTok Shop");
        priced = priced && !!it.price; total += it.price || 0;
        mark(u.rail, "aria-current", function (b) { return b.dataset.id === it.id; });
        mark(u.sizes, "aria-pressed", function (b) { return b.textContent === size[k]; });
        SIZES[k].forEach(function (s) { if (s[0] === size[k]) girth += s[1] / 2; });
        worn.push(full(it));
      });
      VZ.girth = girth;                                                  // fit.js grows or slims the mannequin to match
      $("p-total").textContent = priced ? T("Outfit total $") + total.toFixed(2) : "";
      $("p-fit").textContent = T("Mannequin shown in shirt size {0} and waist {1}.").replace("{0}", size.top).replace("{1}", size.bottom);
      $("fit").setAttribute("aria-label", T("3D mannequin wearing") + ": " + worn.join(", ") + ". " + T("Drag to turn it."));
    }
    function wear(look, reset, go) {
      for (var k in look) VZ.look[k] = look[k];
      paint();
      if (VZ.fit) VZ.fit.show(reset); else boot();
      if (go) $("fitting-room").scrollIntoView({ behavior: calm ? "auto" : "smooth" });
    }
    function one(it) { var look = {}; look[kind(it)] = it.id; return look; }

    /* ---- details: picking a card or a floor mannequin opens one sheet with its picture and, for each piece it shows, the price and the description ---- */
    var pd = el("dialog", "ct pd"), pdHd = el("div", "fq-hd"), pdX = el("button", "fq-x", "\u00d7"), pdIm = el("img"), pdBody = el("div"), pdTry = el("button", "btn gold", T("Try it on")), pdLook;
    pd.setAttribute("aria-label", T("Details")); pdX.type = pdTry.type = "button"; pdX.setAttribute("aria-label", T("Close"));
    pdX.addEventListener("click", function () { pd.close(); });
    pdTry.addEventListener("click", function () { pd.close(); wear(pdLook, true, true); });
    pdHd.appendChild(el("b", "", T("Details"))); pdHd.appendChild(pdX);
    [pdHd, pdIm, pdBody, pdTry].forEach(function (n) { pd.appendChild(n); });
    document.body.appendChild(pd);
    function detail(its, src) {
      pdBody.textContent = ""; pdLook = {};
      its.forEach(function (it) {
        var live = $("c-" + it.id).querySelector(".buy .price"), head = el("p", "what");   // the store's own price, once cart.js has it
        head.appendChild(el("span", "name", it.name)); head.appendChild(el("span", "tone", it.tone));
        [el("p", "cat", catName(it.cat)), head, el("p", "price", live ? live.textContent : it.price ? "$" + it.price.toFixed(2) : ""), el("p", "desc", it.desc)].forEach(function (n) { pdBody.appendChild(n); });
        pdLook[kind(it)] = it.id;
      });
      pdTry.hidden = its.some(function (it) { return it.flat; });   // only the 3D pieces can go to the fitting room
      pdIm.src = src; pdIm.alt = its.map(full).join(T(" with "));
      pd.showModal();
    }

    ["top", "bottom"].forEach(function (k) {
      var box = el("div", "piece"), head = el("p", "what"), u = ui[k] = { name: el("span", "name"), tone: el("span", "tone"), desc: el("p", "desc"), price: el("p", "price"), rail: el("div", "rail " + k), sizes: el("div", "sizes") };
      head.appendChild(u.name); head.appendChild(u.tone);
      u.rail.setAttribute("role", "group"); u.rail.setAttribute("aria-label", T("Choose the " + KIND[k].toLowerCase()));
      u.sizes.setAttribute("role", "group"); u.sizes.setAttribute("aria-label", T(KIND[k] + " size"));
      SIZES[k].forEach(function (s) {
        var b = el("button", "", s[0]); b.type = "button";
        b.addEventListener("click", function () { size[k] = s[0]; paint(); });
        u.sizes.appendChild(b);
      });
      [el("p", "cat", T(KIND[k])), head, u.price, u.desc, u.rail, u.sizes].forEach(function (n) { box.appendChild(n); });
      $("pieces").appendChild(box);
    });

    /* ---- collection ---- */
    ITEMS.forEach(function (it) {
      var li = el("li"), b = el("button", it.photo ? "card flat photo" : it.flat ? "card flat" : "card"), n = el("span", "niche"), im = pic(it, "fig"), m = el("span", "meta");
      b.type = "button"; im.loading = "lazy";
      im.alt = full(it) + (it.photo ? "" : T(" on a display mannequin"));
      n.appendChild(el("span", "beam")); n.appendChild(im);   // the light falls on the wall and plinth behind the mannequin
      m.appendChild(el("span", "cat", catName(it.cat))); m.appendChild(el("span", "name", it.name)); m.appendChild(el("span", "tone", it.tone));
      if (it.price) m.appendChild(el("span", "price", "$" + it.price.toFixed(2)));
      b.appendChild(n); b.appendChild(m); li.appendChild(b); li.dataset.cat = it.cat; li.id = "c-" + it.id; grid.appendChild(li);
      b.addEventListener("click", function () { detail([it], im.src); });
      if (it.flat) return;

      var t = el("button"); t.type = "button"; t.dataset.id = it.id; t.setAttribute("aria-label", it.name + ", " + it.tone); t.appendChild(pic(it));
      t.addEventListener("click", function () { wear(one(it), false, false); }); ui[kind(it)].rail.appendChild(t);
    });
    paint();

    CATS.forEach(function (c, i) {
      var b = el("button", "", T(c[1])); b.type = "button"; b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
      b.addEventListener("click", function () {
        [].forEach.call(cats.children, function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        [].forEach.call(grid.children, function (li) { li.hidden = c[0] !== "all" && li.dataset.cat !== c[0]; });
      });
      cats.appendChild(b);
    });

    /* ---- the floor: a dressed mannequin on every plinth; picking one opens the details of the shirt and jeans it wears ---- */
    var men = [], turn = 0;
    function due(m, n) { return LOOKS[(m.at + (turn + n) * HALL.length) % LOOKS.length]; }   // each change brings on the next 8 outfits
    function src(o) { return "img/on-" + o[0] + "-" + o[1] + ".webp"; }
    function dress(m) {
      var o = due(m, 0);
      m.look = { top: o[0], bottom: o[1] };
      m.im.src = src(o);
      m.im.alt = full(item(o[0])) + T(" with ") + full(item(o[1])) + ". " + T("See the details.");
    }
    function ahead() { men.forEach(function (m) { new Image().src = src(due(m, 1)); }); }   // fetch the next outfits early, so the fade lands on a finished picture
    HALL.forEach(function (h, i) {
      var b = el("button", "man"), m = { b: b, im: el("img"), at: i };
      b.type = "button"; b.style.left = h[2] + "%"; b.style.top = (h[3] - h[4]) + "%"; b.style.height = h[4] + "%";
      m.im.decoding = "async"; dress(m);
      b.appendChild(m.im); hall.appendChild(b); men.push(m);
      b.addEventListener("click", function () { detail([item(m.look.top), item(m.look.bottom)], m.im.src); });
    });
    /* the floor changes clothes: every 10 s each mannequin steps into the next outfit. The one under a pointer or
       keyboard focus waits, so an outfit never changes as somebody picks it. Started by the doors opening (never for reduced motion). */
    function change() {
      if (document.hidden) return;
      turn++;
      men.forEach(function (m) {
        if (m.b.matches(":hover, :focus-visible")) return;
        m.b.classList.add("swap");
        setTimeout(function () { dress(m); m.b.classList.remove("swap"); }, 450);
      });
      ahead();
    }
    /* narrow screens walk the floor sideways */
    var strip = matchMedia("(max-aspect-ratio: 13/10)");
    if (strip.addEventListener) strip.addEventListener("change", function () { floor.scrollLeft = 0; });
    if (strip.matches) floor.scrollLeft = (floor.scrollWidth - floor.clientWidth) / 2;   // start in front of the doors, facing the sign   // back on a wide screen the floor is fixed again

    if ("IntersectionObserver" in window) {
      /* phones have no hover: the light comes up on whatever is in the middle of the screen */
      if (touch) {
        var lamp = new IntersectionObserver(function (es) {
          es.forEach(function (e) { e.target.classList.toggle("lit", e.isIntersecting); });
        }, { rootMargin: "-36% 0px -36% 0px" });
        [].forEach.call(grid.querySelectorAll(".card"), function (c) { lamp.observe(c); });
        var spot = new IntersectionObserver(function (es) {
          es.forEach(function (e) { e.target.classList.toggle("lit", e.isIntersecting); });
        }, { root: floor, rootMargin: "0px -28% 0px -28%" });
        [].forEach.call(hall.querySelectorAll(".man"), function (m) { spot.observe(m); });
      }
      var near = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { boot(); near.disconnect(); } }, { rootMargin: "500px" });
      near.observe($("fitting-room"));
    } else boot();

    /* ---- studio videos: play only while on screen, always silent ---- */
    var vids = document.querySelectorAll(".reels video");
    if (calm || !("IntersectionObserver" in window)) [].forEach.call(vids, function (v) { v.controls = true; });
    else {
      var watch = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { var p = e.target.play(); if (p && p.catch) p.catch(function () {}); } else e.target.pause(); });
      }, { threshold: 0.5 });
      [].forEach.call(vids, function (v) { v.muted = true; watch.observe(v); });
    }

    /* ---- opening sequence: the glass doors swing open, then the film fades into the same view of the floor ---- */
    var intro = $("intro");
    function open() {
      if (root.classList.contains("open")) return;
      root.classList.add("open");
      setInterval(change, 10000); ahead(); hush();
      setTimeout(function () { if (intro.parentNode) intro.parentNode.removeChild(intro); }, 1100);
    }
    function hush() { setTimeout(function () { $("lang-tip").hidden = true; }, 15000); }   // the "change the language here" bubble steps aside after 15 s in the store
    if (calm) { intro.parentNode.removeChild(intro); hush(); }
    else if (back) open();
    else {
      var doors = $("doors"), play;
      $("skip").addEventListener("click", open);
      doors.addEventListener("ended", open);
      doors.addEventListener("error", open);
      play = doors.play();
      if (play && play.catch) play.catch(open);          // autoplay refused (low power mode): straight into the store
      setTimeout(open, 12000);                           // a film that never arrives must not lock the door
    }
  });
})();
