// Idempotent script: adds affiliate disclaimer + internal-link block + author
// to every blog post. Safe to run multiple times — uses sentinels to detect
// already-enriched content.

const fs = require("fs");
const path = require("path");

const POSTS_PATH = path.join(__dirname, "..", "src", "data", "blog-posts.json");
const NEW_AUTHOR = "Gerardo Álvarez";

const DISCLAIMER_SENTINEL = "data-affiliate-disclaimer";
const RELATED_SENTINEL = "data-related-links";

const DISCLAIMER = {
  es: `<aside ${DISCLAIMER_SENTINEL}="true" style="background:#fef6f0;border-left:4px solid #C8553D;padding:12px 16px;margin:0 0 24px;font-size:0.9em;color:#742918;border-radius:6px"><strong>Aviso de afiliados:</strong> este artículo contiene enlaces a Travelpayouts, Booking y otras plataformas. Si reservas a través de ellos recibimos una pequeña comisión sin costo adicional para ti — así mantenemos el sitio gratuito y sin paywalls. Solo recomendamos servicios que usaríamos nosotros.</aside>`,
  en: `<aside ${DISCLAIMER_SENTINEL}="true" style="background:#fef6f0;border-left:4px solid #C8553D;padding:12px 16px;margin:0 0 24px;font-size:0.9em;color:#742918;border-radius:6px"><strong>Affiliate disclosure:</strong> this article contains links to Travelpayouts, Booking and other platforms. If you book through them we earn a small commission at no extra cost to you — that keeps this site free and paywall-free. We only recommend services we would use ourselves.</aside>`,
  fr: `<aside ${DISCLAIMER_SENTINEL}="true" style="background:#fef6f0;border-left:4px solid #C8553D;padding:12px 16px;margin:0 0 24px;font-size:0.9em;color:#742918;border-radius:6px"><strong>Divulgation d'affiliation :</strong> cet article contient des liens Travelpayouts, Booking et autres plateformes. Si vous réservez via ces liens, nous percevons une petite commission sans coût supplémentaire — c'est ce qui nous permet de garder ce site gratuit. Nous ne recommandons que des services que nous utiliserions nous-mêmes.</aside>`,
};

// Map of tag/keyword -> internal links to suggest as related
// Order matters: more specific first
const TAG_TO_LINKS = [
  { match: ["cancun", "riviera-maya", "playa-del-carmen", "tulum"], link: { path: "/destinos/cancun", es: "Guía completa de Cancún", en: "Complete Cancún guide", fr: "Guide complet de Cancún" } },
  { match: ["cdmx", "ciudad-de-mexico", "estadio-azteca", "metro"], link: { path: "/destinos/ciudad-de-mexico", es: "Guía de Ciudad de México", en: "Mexico City guide", fr: "Guide de Mexico" } },
  { match: ["oaxaca", "dia-de-muertos", "mezcal"], link: { path: "/destinos/oaxaca", es: "Guía completa de Oaxaca", en: "Complete Oaxaca guide", fr: "Guide complet d'Oaxaca" } },
  { match: ["san-miguel-de-allende", "pueblo-magico"], link: { path: "/destinos/san-miguel-de-allende", es: "Guía de San Miguel de Allende", en: "San Miguel de Allende guide", fr: "Guide de San Miguel de Allende" } },
  { match: ["guanajuato"], link: { path: "/destinos/guanajuato", es: "Guía de Guanajuato", en: "Guanajuato guide", fr: "Guide de Guanajuato" } },
  { match: ["riviera-nayarit", "puerto-vallarta", "sayulita"], link: { path: "/destinos/puerto-vallarta", es: "Guía de Puerto Vallarta", en: "Puerto Vallarta guide", fr: "Guide de Puerto Vallarta" } },
  { match: ["yucatan", "cenotes", "merida"], link: { path: "/destinos/merida", es: "Guía de Mérida", en: "Mérida guide", fr: "Guide de Mérida" } },
  { match: ["monterrey", "estadio-bbva"], link: { path: "/destinos/monterrey", es: "Guía de Monterrey", en: "Monterrey guide", fr: "Guide de Monterrey" } },
  { match: ["guadalajara", "tequila"], link: { path: "/destinos/guadalajara", es: "Guía de Guadalajara", en: "Guadalajara guide", fr: "Guide de Guadalajara" } },
  { match: ["los-cabos", "baja-california"], link: { path: "/destinos/los-cabos", es: "Guía de Los Cabos", en: "Los Cabos guide", fr: "Guide de Los Cabos" } },
  { match: ["mundial-2026", "fifa"], link: { path: "/mundial", es: "Las 16 sedes del Mundial 2026", en: "All 16 World Cup 2026 venues", fr: "Les 16 stades de la Coupe du Monde 2026" } },
];

const SERVICE_LINKS_BY_TAG = [
  { match: ["vuelos", "volaris", "aeromexico", "vivaaerobus", "vuelos-internacionales"], link: { path: "/vuelos", es: "Comparar vuelos a México", en: "Compare flights to Mexico", fr: "Comparer les vols vers le Mexique" } },
  { match: ["autobuses", "ado", "etn", "transporte"], link: { path: "/autobuses", es: "Comparar boletos de autobús", en: "Compare bus tickets", fr: "Comparer les billets de bus" } },
  { match: ["hoteles", "todo-incluido"], link: { path: "/hoteles", es: "Comparar hoteles en México", en: "Compare hotels in Mexico", fr: "Comparer les hôtels au Mexique" } },
];

function pickRelatedLinks(post) {
  const tags = (post.tags || []).map((t) => t.toLowerCase());
  const slug = (post.slug || "").toLowerCase();
  const haystack = [...tags, slug];
  const hits = [];

  for (const rule of TAG_TO_LINKS) {
    if (rule.match.some((m) => haystack.some((h) => h.includes(m)))) {
      if (!hits.find((h) => h.path === rule.link.path)) hits.push(rule.link);
    }
  }
  for (const rule of SERVICE_LINKS_BY_TAG) {
    if (rule.match.some((m) => haystack.some((h) => h.includes(m)))) {
      if (!hits.find((h) => h.path === rule.link.path)) hits.push(rule.link);
    }
  }

  // Always include /rutas as a generic fallback if we have fewer than 3
  if (hits.length < 3) {
    hits.push({ path: "/rutas", es: "Rutas entre ciudades de México", en: "Routes between Mexican cities", fr: "Itinéraires entre les villes mexicaines" });
  }

  return hits.slice(0, 4);
}

function buildRelatedBlock(locale, links) {
  const heading = { es: "📌 Lecturas relacionadas", en: "📌 Related reading", fr: "📌 Lectures liées" }[locale];
  const items = links
    .map((l) => `<li><a href="/${locale}${l.path}">${l[locale]}</a></li>`)
    .join("");
  return `<aside ${RELATED_SENTINEL}="true" style="background:#f3efe8;border-radius:10px;padding:16px 20px;margin:32px 0 0"><h3 style="margin:0 0 8px;font-size:1.05em">${heading}</h3><ul style="margin:0;padding-left:20px">${items}</ul></aside>`;
}

function ensureDisclaimerPrefix(content, locale) {
  if (typeof content !== "string") return content;
  if (content.includes(DISCLAIMER_SENTINEL)) return content;
  return DISCLAIMER[locale] + content;
}

function ensureRelatedSuffix(content, locale, links) {
  if (typeof content !== "string") return content;
  if (content.includes(RELATED_SENTINEL)) return content;
  return content + buildRelatedBlock(locale, links);
}

function main() {
  const raw = fs.readFileSync(POSTS_PATH, "utf8");
  const posts = JSON.parse(raw);
  let changed = 0;

  for (const post of posts) {
    let mut = false;
    if (post.author !== NEW_AUTHOR) {
      post.author = NEW_AUTHOR;
      mut = true;
    }
    const links = pickRelatedLinks(post);
    for (const locale of ["es", "en", "fr"]) {
      if (!post.content || !post.content[locale]) continue;
      const before = post.content[locale];
      let after = ensureDisclaimerPrefix(before, locale);
      after = ensureRelatedSuffix(after, locale, links);
      if (after !== before) {
        post.content[locale] = after;
        mut = true;
      }
    }
    if (mut) changed++;
  }

  fs.writeFileSync(POSTS_PATH, JSON.stringify(posts, null, 2) + "\n");
  console.log(`Enriched ${changed} of ${posts.length} posts (idempotent — re-running won't duplicate).`);
}

main();
