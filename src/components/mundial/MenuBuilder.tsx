"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { MenuItem, MundialMenu, Pairing } from "@/types/mundial-menu";
import { t3 } from "@/lib/utils";

interface Props {
  menu: MundialMenu;
  locale: string;
}

const ML_BASE = "https://listado.mercadolibre.com.mx/";

function pick(lang: { es: string; en: string; fr: string }, locale: string) {
  if (locale === "fr") return lang.fr;
  if (locale === "en") return lang.en;
  return lang.es;
}

function findPairing(pairings: Pairing[], drinkId: string | null, foodId: string | null) {
  if (!drinkId || !foodId) return null;
  return pairings.find((p) => p.drink === drinkId && p.food === foodId) ?? null;
}

function defaultPairing(locale: string) {
  return {
    rating: 3 as const,
    note: pick(
      {
        es: "Buena combinación. Cualquier agua fresca va con cualquier antojito mexicano — no hay reglas estrictas, solo gusto.",
        en: "Good combination. Any agua fresca goes with any Mexican antojito — no strict rules, just preference.",
        fr: "Bonne combinaison. Toute agua fresca s'accorde avec n'importe quel antojito mexicain — pas de règles strictes, juste le goût.",
      },
      locale
    ),
  };
}

export default function MenuBuilder({ menu, locale }: Props) {
  const [drinkId, setDrinkId] = useState<string | null>(null);
  const [foodId, setFoodId] = useState<string | null>(null);

  const drink = useMemo(() => menu.drinks.find((d) => d.id === drinkId) ?? null, [menu.drinks, drinkId]);
  const food = useMemo(() => menu.foods.find((f) => f.id === foodId) ?? null, [menu.foods, foodId]);

  const pairing = findPairing(menu.pairings, drinkId, foodId);
  const fallback = defaultPairing(locale);
  const rating = pairing?.rating ?? (drink && food ? fallback.rating : 0);
  const pairingNote = pairing ? pick(pairing.note, locale) : drink && food ? fallback.note : null;

  const composedOrderEs = useMemo(() => {
    if (!drink && !food) return null;
    if (drink && food) return `${drink.orderPhrase.es}, y ${food.orderPhrase.es.replace(/^¡|^/, "").replace(/!$/, "")}`;
    if (drink) return drink.orderPhrase.es;
    return food!.orderPhrase.es;
  }, [drink, food]);

  const reset = () => {
    setDrinkId(null);
    setFoodId(null);
    setTimeout(() => document.getElementById("menu-builder")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  return (
    <div id="menu-builder" className="bg-gradient-to-br from-arena-50 via-amber-50 to-orange-50 rounded-3xl p-6 md:p-8 border border-arena-200 shadow-sm">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-jade-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
          🇲🇽 {t3(locale, "Interactivo", "Interactive", "Interactif")}
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-arena-800 mb-2">
          {t3(locale, "Arma tu menú mundialista", "Build your World Cup menu", "Compose ton menu Coupe du Monde")}
        </h3>
        <p className="text-arena-600 text-sm md:text-base max-w-xl mx-auto">
          {t3(
            locale,
            "Elige una bebida y un antojito mexicano. Te decimos cómo pedirlo en español, qué tan típica es la combinación y un poco de su historia.",
            "Pick a drink and a Mexican snack. We'll tell you how to order it in Spanish, how iconic the combo is, and a bit of its history.",
            "Choisis une boisson et un antojito mexicain. On te dit comment commander en espagnol, à quel point la combinaison est typique et un peu d'histoire."
          )}
        </p>
      </div>

      {/* Drinks */}
      <div className="mb-8">
        <SectionTitle
          emoji="🥤"
          label={t3(locale, "1. Elige tu bebida", "1. Pick your drink", "1. Choisis ta boisson")}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
          {menu.drinks.map((d) => (
            <ItemCard
              key={d.id}
              item={d}
              locale={locale}
              selected={drinkId === d.id}
              onClick={() => setDrinkId(drinkId === d.id ? null : d.id)}
            />
          ))}
        </div>
      </div>

      {/* Foods */}
      <div className="mb-8">
        <SectionTitle
          emoji="🌮"
          label={t3(locale, "2. Elige tu antojito", "2. Pick your bite", "2. Choisis ton antojito")}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
          {menu.foods.map((f) => (
            <ItemCard
              key={f.id}
              item={f}
              locale={locale}
              selected={foodId === f.id}
              onClick={() => setFoodId(foodId === f.id ? null : f.id)}
            />
          ))}
        </div>
      </div>

      {/* Order panel */}
      {(drink || food) && (
        <div className="bg-white rounded-2xl p-5 md:p-7 border-2 border-jade-600 shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex items-start justify-between gap-3 mb-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-jade-700 mb-1">
                📋 {t3(locale, "Tu pedido", "Your order", "Ta commande")}
              </div>
              <h4 className="font-display text-xl md:text-2xl font-bold text-arena-800">
                {drink && pick(drink.name, locale)}
                {drink && food && <span className="text-arena-400"> + </span>}
                {food && pick(food.name, locale)}
              </h4>
            </div>
            <button
              onClick={reset}
              className="text-xs text-arena-500 hover:text-arena-800 underline whitespace-nowrap"
            >
              ↻ {t3(locale, "Empezar de nuevo", "Start over", "Recommencer")}
            </button>
          </div>

          {/* Pairing rating */}
          {drink && food && (
            <div className="bg-gradient-to-r from-jade-50 to-emerald-50 border border-jade-200 rounded-xl p-4 mb-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">⭐</span>
                <span className="font-bold text-arena-800">
                  {t3(locale, "Calificación del maridaje", "Pairing rating", "Note d'accord")}:
                </span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < rating ? "text-oro-500" : "text-arena-200"}>★</span>
                  ))}
                </div>
                <span className="text-xs text-arena-500">
                  {rating === 5
                    ? t3(locale, "Combo clásico", "Classic combo", "Combo classique")
                    : rating === 4
                    ? t3(locale, "Excelente", "Excellent", "Excellent")
                    : t3(locale, "Funciona", "Works", "Ça marche")}
                </span>
              </div>
              {pairingNote && <p className="text-sm text-arena-700 leading-relaxed">{pairingNote}</p>}
            </div>
          )}

          {/* Order phrase */}
          <div className="bg-arena-900 text-white rounded-xl p-5 mb-5">
            <div className="text-xs font-bold uppercase tracking-wider text-oro-300 mb-2">
              🗣️ {t3(locale, "Cómo pedirlo en español", "How to order in Spanish", "Comment commander en espagnol")}
            </div>
            <p className="font-display text-lg md:text-xl text-white leading-snug">
              <span className="text-oro-300">"</span>
              {composedOrderEs}
              <span className="text-oro-300">"</span>
            </p>
            {locale !== "es" && (
              <div className="mt-3 pt-3 border-t border-arena-700">
                <div className="text-xs text-arena-400 mb-1">
                  {locale === "fr" ? "🔊 Prononciation phonétique" : "🔊 Phonetic pronunciation"}
                </div>
                <p className="text-sm text-arena-300 italic">
                  {drink && (locale === "fr" ? drink.orderPhrase.pronFr : drink.orderPhrase.pronEn)}
                  {drink && food && " · "}
                  {food && (locale === "fr" ? food.orderPhrase.pronFr : food.orderPhrase.pronEn)}
                </p>
              </div>
            )}
          </div>

          {/* Item details */}
          <div className="grid md:grid-cols-2 gap-4 mb-5">
            {drink && <DetailCard item={drink} locale={locale} />}
            {food && <DetailCard item={food} locale={locale} />}
          </div>

          {/* Mercado Libre CTA */}
          <div className="bg-gradient-to-r from-yellow-400 to-amber-400 rounded-xl p-5 text-center">
            <div className="text-sm font-semibold text-arena-800 mb-3">
              🛒 {t3(
                locale,
                "Prepáralo en casa: encuentra los ingredientes en Mercado Libre",
                "Make it at home: find the ingredients on Mercado Libre",
                "Fais-le chez toi : trouve les ingrédients sur Mercado Libre"
              )}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {drink && (
                <a
                  href={ML_BASE + encodeURIComponent(drink.mlSearch)}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-arena-800 font-semibold py-2 px-4 rounded-lg shadow hover:shadow-md transition-all hover:-translate-y-0.5 text-sm"
                >
                  {drink.emoji} {t3(locale, "Buscar", "Search", "Chercher")}: {drink.mlSearch}
                </a>
              )}
              {food && (
                <a
                  href={ML_BASE + encodeURIComponent(food.mlSearch)}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-arena-800 font-semibold py-2 px-4 rounded-lg shadow hover:shadow-md transition-all hover:-translate-y-0.5 text-sm"
                >
                  {food.emoji} {t3(locale, "Buscar", "Search", "Chercher")}: {food.mlSearch}
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {!drink && !food && (
        <div className="bg-white/60 border border-dashed border-arena-300 rounded-2xl p-6 text-center">
          <p className="text-arena-500 text-sm">
            👆 {t3(
              locale,
              "Selecciona arriba para armar tu orden",
              "Select above to build your order",
              "Sélectionne ci-dessus pour composer ta commande"
            )}
          </p>
        </div>
      )}
    </div>
  );
}

function SectionTitle({ emoji, label }: { emoji: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-2xl">{emoji}</span>
      <h4 className="font-display font-bold text-arena-800 text-lg">{label}</h4>
    </div>
  );
}

function ItemCard({
  item,
  locale,
  selected,
  onClick,
}: {
  item: MenuItem;
  locale: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-xl text-left transition-all duration-300 ${
        selected
          ? "ring-4 ring-jade-600 ring-offset-2 -translate-y-1 shadow-xl"
          : "ring-1 ring-arena-200 hover:-translate-y-1 hover:shadow-lg"
      }`}
    >
      {/* Image or gradient hero */}
      <div className={`relative h-24 bg-gradient-to-br ${item.gradient} overflow-hidden`}>
        {item.image ? (
          <Image
            src={item.image}
            alt={pick(item.name, locale)}
            fill
            sizes="(max-width: 768px) 50vw, 200px"
            className="object-cover opacity-90 group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl drop-shadow-lg">{item.emoji}</span>
          </div>
        )}
        {item.image && (
          <div className="absolute top-1 left-1 bg-white/90 backdrop-blur rounded-full w-8 h-8 flex items-center justify-center text-lg shadow">
            {item.emoji}
          </div>
        )}
        {selected && (
          <div className="absolute top-1 right-1 bg-jade-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow">
            ✓
          </div>
        )}
      </div>
      <div className="p-3 bg-white">
        <div className="font-bold text-arena-800 text-sm leading-tight line-clamp-2">{pick(item.name, locale)}</div>
        {item.region && (
          <div className="text-xs text-jade-700 mt-1">
            📍 {item.region.city}
          </div>
        )}
      </div>
    </button>
  );
}

function DetailCard({ item, locale }: { item: MenuItem; locale: string }) {
  return (
    <div className="bg-arena-50 rounded-xl p-4 border border-arena-200">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{item.emoji}</span>
        <h5 className="font-bold text-arena-800">{pick(item.name, locale)}</h5>
      </div>
      <p className="text-xs text-arena-600 leading-relaxed mb-3">{pick(item.description, locale)}</p>
      <details className="text-xs">
        <summary className="cursor-pointer font-semibold text-jade-700 hover:text-jade-800">
          {t3(locale, "Más detalles", "More details", "Plus de détails")} ▾
        </summary>
        <div className="mt-2 space-y-2 text-arena-700">
          <p>
            <span className="font-semibold">🥄 {t3(locale, "Lleva", "Contains", "Contient")}:</span> {pick(item.ingredients, locale)}
          </p>
          <p>
            <span className="font-semibold">💡 {t3(locale, "Tip", "Tip", "Astuce")}:</span> {pick(item.servingTip, locale)}
          </p>
          <p>
            <span className="font-semibold">🔄 {t3(locale, "Variantes", "Variants", "Variantes")}:</span> {pick(item.variants, locale)}
          </p>
          <p className="text-arena-500 italic">
            ✨ {pick(item.funFact, locale)}
          </p>
        </div>
      </details>
    </div>
  );
}
