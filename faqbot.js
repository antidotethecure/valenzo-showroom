/* faqbot.js - the "May I help you?" helper at the bottom right. Answers on the spot from faq.json (English and Spanish):
   that is the one file to edit when the studio's phone, hours, links or policies change. No AI and no network beyond that
   file; nothing a visitor types leaves the page. Looks are in valenzo.css (.fq-*), button words in lang.js. */
(function () {
  "use strict";
  var T = window.T, es = document.documentElement.lang === "es";
  var KB = { qa: [], suggested: [], labels: {} }, LINKS = {}, loading = null;
  function load() {
    if (!loading) loading = fetch("faq.json", { cache: "no-cache" }).then(function (r) { return r.json(); })
      .then(function (j) { KB = j[es ? "es" : "en"]; LINKS = j.links; index(); }).catch(function () {});   // no file: every question gets the "ask the studio" reply
    return loading;
  }

  /* ---------- matching: words that mean the same thing count as the same word, in both languages ---------- */
  var SYN = [
    ["phone", "call", "number", "telephone", "whatsapp", "contact", "text", "reach", "message", "telefono", "numero", "llamar", "llamo", "contacto", "contactar", "mensaje"],
    ["hours", "hour", "open", "opens", "close", "closes", "closing", "closed", "time", "when", "schedule", "horario", "horarios", "hora", "horas", "abren", "abre", "abierto", "cierran", "cierra", "cuando"],
    ["address", "location", "where", "located", "directions", "visit", "map", "direccion", "ubicacion", "ubicados", "donde", "visitar", "mapa", "llegar"],
    ["website", "site", "web", "page", "online", "url", "link", "sitio", "pagina", "enlace", "internet"],
    ["email", "mail", "correo"],
    ["order", "ordering", "buy", "purchase", "checkout", "pay", "comprar", "compro", "compra", "pedir", "pedido", "ordenar", "orden", "pagar", "pago"],
    ["shipping", "ship", "ships", "delivery", "deliver", "envio", "envios", "envian", "enviar", "entrega", "entregan"],
    ["return", "returns", "refund", "exchange", "exchanges", "devolucion", "devoluciones", "devolver", "devuelvo", "regresar", "reembolso", "cambio", "cambios"],
    ["size", "sizes", "sizing", "waist", "talla", "tallas", "medida", "medidas", "cintura"],
    ["price", "prices", "cost", "costs", "pricing", "precio", "precios", "cuesta", "cuestan", "costo"],
    ["wholesale", "bulk", "retailer", "resell", "mayoreo", "mayorista", "mayoristas", "revender"],
    ["sell", "products", "clothes", "clothing", "venden", "vende", "ropa", "productos"],
    ["fitting", "mannequin", "probador", "maniqui", "probar"],
    ["language", "spanish", "english", "translate", "idioma", "espanol", "ingles", "traducir", "lenguaje"]
  ];
  var CANON = {};
  SYN.forEach(function (g) { g.forEach(function (w) { CANON[w] = g[0]; }); });
  var STOP = /^(a|an|the|is|are|do|does|did|i|you|your|my|me|we|to|of|in|on|for|and|or|it|can|how|what|whats|this|that|be|get|got|with|at|there|any|so|if|about|hey|hi|please|have|el|la|los|las|un|una|de|del|al|y|o|que|como|es|son|su|sus|mi|tu|se|te|le|lo|en|para|por|con|hay|hola|favor|cual|cuales|esta|estan|tienen|tiene|puedo|hago)$/;
  function plain(s) { return String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9$ ]+/g, " ").split(/\s+/); }   // "envío" and "envio" are one word
  function stem(w) { return w.length > 4 ? w.replace(/(ings|ing|ies|es|s)$/, function (m) { return m === "ies" ? "y" : ""; }) : w; }
  function toks(s) {
    var out = [];
    plain(s).forEach(function (w) {
      w = w.replace(/([aei]r)(l[oa]s?|[mts]e)$/, "$1");            // Spanish: "devolverlo" and "comprarlas" are "devolver" and "comprar"
      if (!w || STOP.test(w)) return; out.push(stem(w)); if (CANON[w]) out.push("~" + CANON[w]); });
    return out;
  }
  function raw(s) { return plain(s).filter(function (w) { return w.length > 1; }); }
  function set(a) { var o = {}; a.forEach(function (w) { o[w] = 1; }); return o; }
  var IDX = [];
  function index() {
    IDX = KB.qa.map(function (x) { return { x: x, q: set(toks(x.q)), t: set(toks((x.tags || []).join(" "))), a: set(toks(x.a)), raw: set(raw(x.q)) }; });
  }
  function search(text) {
    var qt = toks(text), rw = raw(text);
    if (!qt.length) return [];
    return IDX.map(function (r) {
      var s = 0, hit = 0, same = 0, cov = 0, mine = set(qt);
      qt.forEach(function (w) { var k = (r.q[w] ? 3 : 0) + (r.t[w] ? 2.5 : 0) + (r.a[w] ? .6 : 0); if (k) hit++; s += w[0] === "~" ? k * .55 : k; });
      rw.forEach(function (w) { if (r.raw[w]) same++; });
      var phrase = rw.length ? same / Math.max(rw.length, Object.keys(r.raw).length) : 0;     // how alike the two whole questions are
      var own = Object.keys(r.q).filter(function (w) { return w[0] !== "~"; });
      own.forEach(function (w) { if (mine[w]) cov++; });
      return { x: r.x, s: s * (0.5 + hit / qt.length) * (0.35 + (own.length ? cov / own.length : 0)) * (1 + phrase) };
    }).filter(function (m) { return m.s > 1.6; }).sort(function (a, b) { return b.s - a.s; }).map(function (m) { return m.x; });
  }
  function reply(q) { var hits = search(q); return hits.length ? { a: hits[0].a, go: hits[0].go || [], rel: hits.slice(1, 3).map(function (x) { return x.q; }) } : null; }

  /* ---------- the button and the chat sheet ---------- */
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  var pill = document.createElement("button"), sh = document.createElement("div");
  pill.type = "button"; pill.className = "fq-pill";
  pill.innerHTML = "<i aria-hidden='true'>💬</i><span>" + esc(T("May I help you?")) + "</span>";
  sh.className = "fq-sheet"; sh.setAttribute("role", "dialog"); sh.setAttribute("aria-label", T("May I help you?"));
  sh.innerHTML = "<div class='fq-hd'><span class='fq-av' aria-hidden='true'>💬</span><b>Valenzo Studio<small>" + esc(T("Answers right away")) + "</small></b>" +
    "<button type='button' class='fq-x' aria-label='" + esc(T("Close")) + "'>×</button></div><div class='fq-body' aria-live='polite'></div>" +
    "<form class='fq-in'><input placeholder='" + esc(T("Ask me anything…")) + "' aria-label='" + esc(T("Question")) + "' enterkeyhint='send' autocomplete='off'><button>" + esc(T("Ask")) + "</button></form>";
  var body = sh.querySelector(".fq-body"), inp = sh.querySelector("input");
  function add(html, me) { var m = document.createElement("div"); m.className = "fq-m" + (me ? " me" : ""); m[me ? "textContent" : "innerHTML"] = html; body.appendChild(m); body.scrollTop = 1e6; }
  function chips(list) {
    if (!list.length) return;
    var c = document.createElement("div"); c.className = "fq-chips";
    list.forEach(function (q) { var b = document.createElement("button"); b.type = "button"; b.textContent = q; b.onclick = function () { ask(q); }; c.appendChild(b); });
    body.appendChild(c); body.scrollTop = 1e6;
  }
  function acts(keys) {
    var h = keys.map(function (k) {
      var u = String(LINKS[k]);
      if (!/^(https:\/\/|mailto:|tel:|#)/.test(u)) return "";      // faq.json is edited by hand: only a real link becomes a button
      return "<a href='" + esc(u) + "'" + (u[0] === "h" ? " target='_blank' rel='noopener noreferrer'" : "") + ">" + esc(KB.labels[k] || k) + "</a>";
    }).join("");
    return h && "<div class='fq-act'>" + h + "</div>";
  }
  function greet() {
    if (body.children.length) return;
    add(esc(T("Hi! May I help you? Ask about ordering, shipping, sizes, hours or how to reach the studio.")));
    chips(KB.suggested);
  }
  function ask(q) {
    q = String(q || "").trim();
    if (!q) return;
    load().then(function () {
      greet(); add(q, true);
      var r = reply(q);
      if (r) { add(esc(r.a) + acts(r.go)); chips(r.rel); }
      else add(esc(T("I don't have that one yet. The studio can answer you directly:")) + acts(["wa", "tiktok", "mail"]));
    });
  }
  function open() {
    sh.classList.add("on"); pill.classList.add("fq-hide");
    load().then(greet);
    (matchMedia("(pointer: fine)").matches ? inp : sh.querySelector(".fq-x")).focus();   // on a phone the keyboard would cover the answers
  }
  function close() { sh.classList.remove("on"); pill.classList.remove("fq-hide"); pill.focus(); }
  pill.onclick = open; sh.querySelector(".fq-x").onclick = close;
  sh.querySelector("form").onsubmit = function (e) { e.preventDefault(); ask(inp.value); inp.value = ""; };
  sh.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  body.addEventListener("click", function (e) { if (e.target.closest("a[href^='#']")) close(); });   // a jump to a part of this page: step out of its way
  document.body.appendChild(pill); document.body.appendChild(sh);
  window.vzFaq = { open: open, ask: function (q) { open(); ask(q); }, reply: function (q) { return load().then(function () { return reply(q); }); } };
})();
