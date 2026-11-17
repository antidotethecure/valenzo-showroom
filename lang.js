/* lang.js - English / Spanish for the whole showroom. Loaded in <head> before valenzo.js.
   window.T("English words") gives back the Spanish when Spanish is on, and the same words otherwise.
   To change a translation, edit the right-hand side below. A phrase that is missing here simply stays in English.
   The EN / ES switch in the top bar saves the choice on the visitor's device and reloads the page.
   shortcut: the switch reloads the page (scroll position is kept, the door film does not replay) instead of redrawing every
   label in place; redraw in place if the blink ever bothers anybody. */
(function () {
  "use strict";
  var ES = {
    /* top bar, opening, hero */
    "Site": "Sitio", "Skip intro": "Saltar intro", "Collection": "Colección", "Fitting Room": "Probador", "Studio": "Estudio", "Wholesale": "Mayoreo",
    "Shop on TikTok": "Compra en TikTok", "Western style, elevated.": "Estilo vaquero, a otro nivel.",
    "Choose a mannequin to see its outfit": "Elige un maniquí para ver su atuendo",
    "Swipe to walk the floor · tap a mannequin to see its outfit": "Desliza para recorrer la tienda · toca un maniquí para ver su atuendo",
    "Enter the collection": "Entra a la colección", "Step into the fitting room": "Pasa al probador",
    /* collection */
    "The Collection": "La Colección", "Every piece lit like the only one in the room.": "Cada pieza iluminada como si fuera la única en la sala.",
    "Filter the collection": "Filtrar la colección", "All": "Todo", "Crystal": "Cristal", "Prints": "Estampados", "Denim": "Mezclilla", "Polos": "Polos",
    " in ": " en ", " with ": " con ", " on a display mannequin": " en un maniquí de exhibición",
    "See this shirt in the collection.": "Ve esta camisa en la colección.", "Try this outfit on.": "Pruébate este atuendo.",
    /* garment names and colours */
    "Crystal Key Shirt": "Camisa Greca de Cristal", "Painted Print Shirt": "Camisa Estampado Pintado", "Marble Print Shirt": "Camisa Estampado Mármol",
    "Boot Cut": "Corte Bota", "Signature V Boot Cut": "Corte Bota V Insignia", "Polo Shirt": "Camisa Polo", "Long Sleeve Shirt": "Camisa Manga Larga", "Denim Jeans": "Jeans de Mezclilla",
    "White": "Blanco", "Black": "Negro", "Midnight": "Medianoche", "Ivory": "Marfil", "Sage": "Salvia", "Sky": "Cielo", "Dark Indigo": "Índigo Oscuro",
    "Faded Blue": "Azul Deslavado", "Ice Wash": "Deslavado Hielo", "Grey": "Gris", "Blue": "Azul", "Khaki": "Caqui", "Navy": "Azul Marino", "Brown": "Café",
    "Red": "Rojo", "Beige": "Beige", "Green": "Verde", "Burgundy": "Vino", "Light Blue": "Azul Claro", "Front": "Frente", "Back": "Atrás",
    "A crystal and stud key pattern across the whole body, with a matching band at the collar and cuffs.": "Un patrón de grecas con cristales y estoperoles en todo el cuerpo, con una franja a juego en el cuello y los puños.",
    "The same crystal key pattern on black, with the band repeated at the collar and cuffs.": "El mismo patrón de grecas con cristales sobre negro, con la franja repetida en el cuello y los puños.",
    "A deep navy ground with rust and cream brushwork from edge to edge.": "Un fondo azul marino profundo con pinceladas en óxido y crema de orilla a orilla.",
    "An ivory ground veined in navy, grey and gold, finished with dark gold-rimmed buttons.": "Un fondo marfil con vetas en azul marino, gris y dorado, rematado con botones oscuros de borde dorado.",
    "A soft sage ground with olive and cream brushwork.": "Un fondo salvia suave con pinceladas en olivo y crema.",
    "A pale blue ground with navy and grey brushwork.": "Un fondo azul pálido con pinceladas en azul marino y gris.",
    "Dark indigo denim with the signature V embroidered on both back pockets and a leather Valenzo patch at the waist.": "Mezclilla índigo oscuro con la V insignia bordada en los dos bolsillos traseros y un parche de piel Valenzo en la cintura.",
    "A mid-blue fade with heavy white contrast stitching and the signature V on the back pockets.": "Un azul medio deslavado con costura gruesa en blanco de contraste y la V insignia en los bolsillos traseros.",
    "Black denim with the signature V stitched in grey.": "Mezclilla negra con la V insignia cosida en gris.",
    "Ice wash denim with the signature V stitched in dark thread.": "Mezclilla deslavado hielo con la V insignia cosida en hilo oscuro.",
    /* fitting room */
    "3D mannequin": "Maniquí en 3D", "Zoom in": "Acercar", "Zoom out": "Alejar", "Dressing the mannequin…": "Vistiendo al maniquí…",
    "The 3D view could not load on this device.": "La vista 3D no pudo cargarse en este dispositivo.",
    "Drag to turn · scroll or pinch to zoom": "Arrastra para girar · desplaza o pellizca para acercar",
    "The Fitting Room": "El Probador", "Build the look.": "Arma tu look.",
    "Put any shirt with any denim, pick your size, then move in close on the collar, the buttons and the stitching.": "Combina cualquier camisa con cualquier mezclilla, elige tu talla y acércate al cuello, los botones y las costuras.",
    "View": "Vista", "Spin": "Girar", "Collar": "Cuello", "Buttons": "Botones", "Back pocket": "Bolsillo trasero",
    "Shirt": "Camisa", "Choose the shirt": "Elige la camisa", "Choose the denim": "Elige la mezclilla", "Shirt size": "Talla de camisa", "Denim size": "Talla de mezclilla",
    "Price on TikTok Shop": "Precio en la TikTok Shop", "Outfit total $": "Total del atuendo $",
    "Mannequin shown in shirt size {0} and waist {1}.": "Maniquí mostrado en talla de camisa {0} y cintura {1}.",
    "3D mannequin wearing": "Maniquí en 3D vestido con", "Drag to turn it.": "Arrastra para girarlo.",
    "Sample size run for this preview. Final sizes and prices are on the TikTok Shop.": "Tallas de muestra para esta vista previa. Las tallas y los precios finales están en la TikTok Shop.",
    "Ask about wholesale": "Pregunta por mayoreo",
    /* the house, videos, wholesale, footer */
    "The House": "La Casa", "Where modern fashion meets western attitude.": "Donde la moda moderna se encuentra con la actitud vaquera.",
    "Close view of the crystal key pattern on a black Valenzo shirt": "Acercamiento al patrón de grecas con cristales en una camisa Valenzo negra",
    "Close view of the ivory marble print shirt": "Acercamiento a la camisa con estampado de mármol color marfil",
    "Close view of the V embroidery on Valenzo boot cut jeans": "Acercamiento al bordado de la V en los jeans corte bota Valenzo",
    "Bold geometric patterns. Clean details. A statement look in every color.": "Patrones geométricos atrevidos. Detalles limpios. Un look que impone en cada color.",
    "Premium details, bold patterns, and a fit made to stand out.": "Detalles premium, patrones atrevidos y un corte hecho para destacar.",
    "Signature embroidery. Premium denim. Made to stand out from every angle.": "Bordado insignia. Mezclilla premium. Hecho para destacar desde cualquier ángulo.",
    "From the Studio": "Desde el Estudio", "Straight from @valenzostudio.": "Directo de @valenzostudio.",
    "Valenzo Studio video: crystal shirts": "Video de Valenzo Studio: camisas de cristal", "Valenzo Studio video: VDM07 jeans": "Video de Valenzo Studio: jeans VDM07",
    "Valenzo Studio video: print shirts": "Video de Valenzo Studio: camisas estampadas", "Valenzo Studio video: boot cut jeans": "Video de Valenzo Studio: jeans corte bota",
    "Wholesale & Retail": "Mayoreo y Menudeo",
    "Stocking a store, or just want one piece? Message the studio directly.": "¿Surtes una tienda o solo quieres una pieza? Escríbele directo al estudio.",
    "Preview site. Garments are shown as digital renderings made from Valenzo Studio's own videos and photos. Final names, sizes and prices are on the TikTok Shop.": "Sitio de vista previa. Las prendas se muestran como renders digitales hechos a partir de los videos y las fotos de Valenzo Studio. Los nombres, tallas y precios finales están en la TikTok Shop.",
    /* "May I help you?" (faqbot.js); its questions and answers live in faq.json */
    "May I help you?": "¿Te puedo ayudar?", "Answers right away": "Respuestas al instante", "Close": "Cerrar", "Ask me anything…": "Pregúntame lo que sea…",
    "Question": "Pregunta", "Ask": "Preguntar",
    "Hi! May I help you? Ask about ordering, shipping, sizes, hours or how to reach the studio.": "¡Hola! ¿Te puedo ayudar? Pregunta sobre cómo ordenar, envíos, tallas, horarios o cómo contactar al estudio.",
    "I don't have that one yet. The studio can answer you directly:": "Esa todavía no la tengo. El estudio te puede contestar directo:"
  };
  var saved = null;
  try { saved = localStorage.getItem("vz_lang"); } catch (e) {}
  var es = saved === "es";
  document.documentElement.lang = es ? "es" : "en";
  window.T = function (s) { return es && ES.hasOwnProperty(s) ? ES[s] : s; };

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("lang"), tip = document.getElementById("lang-tip");
    function flip() {
      try { localStorage.setItem("vz_lang", es ? "en" : "es"); sessionStorage.setItem("vz_back", "1"); } catch (e) { return; }   // storage switched off: the page stays as it is
      location.reload();
    }
    btn.children[es ? 1 : 0].className = "on";
    btn.setAttribute("aria-label", es ? "Switch to English" : "Cambiar a español");
    btn.addEventListener("click", flip); tip.addEventListener("click", flip);
    tip.hidden = !!saved;                                  // the bubble points at the switch until somebody has used it
    if (!es) return;
    /* the words written straight into index.html; everything valenzo.js and faqbot.js build asks T() itself */
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), n;
    while ((n = w.nextNode())) (function (k) {
      if (ES.hasOwnProperty(k)) n.nodeValue = n.nodeValue.replace(/\S[\s\S]*\S|\S/, function () { return ES[k]; });
    })(n.nodeValue.replace(/\s+/g, " ").trim());
    ["aria-label", "alt"].forEach(function (a) {
      [].forEach.call(document.querySelectorAll("[" + a + "]"), function (e) { var v = e.getAttribute(a); if (ES.hasOwnProperty(v)) e.setAttribute(a, ES[v]); });
    });
  });
})();
