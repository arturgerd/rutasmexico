import { t3 } from "@/lib/utils";
import Icon from "@/components/ui/Icon";

interface Props {
  locale: string;
}

export default function WhyMexicoSection({ locale }: Props) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-terracotta-50 text-terracotta-600 mb-4">
              <Icon name="compass" className="w-7 h-7" />
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-arena-900 mb-4">
              {t3(locale,
                "Por qué viajar por México",
                "Why travel Mexico",
                "Pourquoi voyager au Mexique"
              )}
            </h2>
            <p className="text-lg text-arena-600 max-w-2xl mx-auto">
              {t3(locale,
                "México no es un destino: son decenas. Y la diversidad de experiencias entre cada uno te sorprenderá.",
                "Mexico isn't one destination: it's dozens. And the diversity of experiences between them will surprise you.",
                "Le Mexique n'est pas une destination : c'est des dizaines. Et la diversité des expériences vous surprendra."
              )}
            </p>
          </div>

          <div className="prose prose-arena prose-lg max-w-none">
            <p className="text-arena-700 leading-relaxed">
              {t3(locale,
                "Con 32 estados, dos océanos, 11 sitios Patrimonio Mundial de la UNESCO, 177 Pueblos Mágicos y una gastronomía reconocida como Patrimonio Cultural Inmaterial de la Humanidad, México es uno de los destinos más diversos del planeta. Aquí puedes esquiar en un volcán por la mañana, bucear en un cenote al mediodía y ver luciérnagas en un bosque al anochecer, todo en la misma semana.",
                "With 32 states, two oceans, 11 UNESCO World Heritage sites, 177 Pueblos Magicos and a cuisine recognized as Intangible Cultural Heritage of Humanity, Mexico is one of the world's most diverse destinations. You can ski down a volcano in the morning, dive a cenote at noon and watch fireflies in a forest at dusk, all in the same week.",
                "Avec 32 états, deux océans, 11 sites UNESCO et 177 Pueblos Magicos, le Mexique est l'une des destinations les plus diverses au monde."
              )}
            </p>

            <p className="text-arena-700 leading-relaxed">
              {t3(locale,
                "Lo que hace especial a México no son solo sus playas del Caribe o sus pirámides, sino la combinación inigualable de culturas vivas (más de 68 pueblos indígenas con lenguas propias), historia milenaria (civilizaciones olmeca, maya, azteca, zapoteca, purépecha), paisajes extremos (del desierto de Sonora a la selva de Chiapas) y una calidez humana que los visitantes recuerdan por años.",
                "What makes Mexico special isn't just its Caribbean beaches or pyramids, but the unmatched combination of living cultures (over 68 indigenous peoples with their own languages), millennia-old history (Olmec, Maya, Aztec, Zapotec, Purepecha civilizations), extreme landscapes (from the Sonora desert to the Chiapas jungle) and a warmth that visitors remember for years.",
                "Ce qui rend le Mexique spécial, c'est la combinaison unique de cultures vivantes, d'histoire millénaire et de paysages extrêmes."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="p-6 bg-gradient-to-br from-terracotta-50 to-terracotta-100 rounded-2xl border border-terracotta-200">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/70 text-terracotta-700 mb-3">
                <Icon name="landmark" />
              </div>
              <h3 className="font-display font-bold text-arena-900 text-xl mb-2">
                {t3(locale, "Historia viva", "Living history", "Histoire vivante")}
              </h3>
              <p className="text-sm text-arena-700 leading-relaxed">
                {t3(locale,
                  "Teotihuacán, Chichén Itzá, Palenque, Monte Albán y más de 200 zonas arqueológicas abiertas al público. Civilizaciones que construyeron pirámides más altas que las egipcias.",
                  "Teotihuacan, Chichen Itza, Palenque, Monte Alban and over 200 archaeological sites open to the public. Civilizations that built pyramids taller than Egyptian ones.",
                  "Plus de 200 sites archéologiques ouverts au public."
                )}
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-azul-50 to-azul-100 rounded-2xl border border-azul-200">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/70 text-azul-700 mb-3">
                <Icon name="waves" />
              </div>
              <h3 className="font-display font-bold text-arena-900 text-xl mb-2">
                {t3(locale, "Dos océanos, miles de playas", "Two oceans, thousands of beaches", "Deux océans, des milliers de plages")}
              </h3>
              <p className="text-sm text-arena-700 leading-relaxed">
                {t3(locale,
                  "El Caribe turquesa de Cancún y Tulum, el Pacífico turquesa de Los Cabos y Puerto Vallarta, y el Mar de Cortés que Jacques Cousteau llamó 'el acuario del mundo'.",
                  "The turquoise Caribbean of Cancun and Tulum, the Pacific of Los Cabos and Puerto Vallarta, and the Sea of Cortez that Jacques Cousteau called 'the aquarium of the world'.",
                  "La mer des Caraïbes, le Pacifique et la Mer de Cortez."
                )}
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-jade-50 to-jade-100 rounded-2xl border border-jade-200">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/70 text-jade-600 mb-3">
                <Icon name="utensils" />
              </div>
              <h3 className="font-display font-bold text-arena-900 text-xl mb-2">
                {t3(locale, "Gastronomía Patrimonio UNESCO", "UNESCO Heritage cuisine", "Gastronomie UNESCO")}
              </h3>
              <p className="text-sm text-arena-700 leading-relaxed">
                {t3(locale,
                  "Mole oaxaqueño, cochinita pibil yucateca, birria jalisciense, tacos al pastor, chiles en nogada, tamales... Cada región tiene su propia culinaria reconocida mundialmente.",
                  "Oaxacan mole, Yucatecan cochinita pibil, Jalisco birria, al pastor tacos, chiles en nogada, tamales... Each region has its own world-recognized cuisine.",
                  "Mole, cochinita pibil, birria, tacos al pastor... Chaque région a sa cuisine unique."
                )}
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-oro-50 to-oro-100 rounded-2xl border border-oro-200">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/70 text-oro-700 mb-3">
                <Icon name="wallet" />
              </div>
              <h3 className="font-display font-bold text-arena-900 text-xl mb-2">
                {t3(locale, "Destino accesible", "Affordable destination", "Destination abordable")}
              </h3>
              <p className="text-sm text-arena-700 leading-relaxed">
                {t3(locale,
                  "Un viaje de 7 días a México cuesta la mitad que a Europa. Hospedaje, comida, transporte y actividades son considerablemente más económicos sin sacrificar calidad.",
                  "A 7-day Mexico trip costs half of Europe. Lodging, food, transport and activities are significantly cheaper without sacrificing quality.",
                  "Un voyage de 7 jours coûte la moitié de l'Europe."
                )}
              </p>
            </div>
          </div>

          <div className="mt-12 p-8 bg-arena-50 rounded-2xl border border-arena-100">
            <h3 className="font-display text-2xl font-bold text-arena-900 mb-4 text-center">
              {t3(locale,
                "Experiencias únicas de México",
                "Mexico's unique experiences",
                "Expériences uniques du Mexique"
              )}
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-arena-700">
              <li className="flex items-start gap-2">
                <span className="text-terracotta-500 font-bold mt-0.5">•</span>
                <span className="text-sm">{t3(locale, "Nadar con tiburones ballena en Holbox (mayo-septiembre)", "Swim with whale sharks in Holbox (May-September)", "Nager avec des requins-baleines à Holbox")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-terracotta-500 font-bold mt-0.5">•</span>
                <span className="text-sm">{t3(locale, "Ver monarcas en los santuarios de Michoacán (noviembre-marzo)", "See monarch butterflies in Michoacan sanctuaries (Nov-March)", "Voir les papillons monarques au Michoacan")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-terracotta-500 font-bold mt-0.5">•</span>
                <span className="text-sm">{t3(locale, "Vivir el Día de Muertos en Oaxaca o Pátzcuaro (1-2 noviembre)", "Experience Day of the Dead in Oaxaca or Patzcuaro (Nov 1-2)", "Vivre le Jour des Morts à Oaxaca")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-terracotta-500 font-bold mt-0.5">•</span>
                <span className="text-sm">{t3(locale, "Bucear en cenotes sagrados mayas de Yucatán", "Dive in sacred Mayan cenotes of Yucatan", "Plonger dans les cenotes mayas")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-terracotta-500 font-bold mt-0.5">•</span>
                <span className="text-sm">{t3(locale, "Ver ballenas grises en Baja California Sur (enero-marzo)", "Gray whale watching in Baja California Sur (Jan-March)", "Baleines grises en Basse-Californie")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-terracotta-500 font-bold mt-0.5">•</span>
                <span className="text-sm">{t3(locale, "Tomar un mezcal en palenque con el maestro mezcalero en Oaxaca", "Have a mezcal with a master mezcalero in Oaxaca", "Prendre un mezcal avec un maître à Oaxaca")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-terracotta-500 font-bold mt-0.5">•</span>
                <span className="text-sm">{t3(locale, "Subir la pirámide del sol en Teotihuacán al amanecer", "Climb the Pyramid of the Sun at Teotihuacan at sunrise", "Monter la pyramide du soleil à Teotihuacan")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-terracotta-500 font-bold mt-0.5">•</span>
                <span className="text-sm">{t3(locale, "Navegar las trajineras de Xochimilco en CDMX", "Navigate Xochimilco's trajineras in CDMX", "Naviguer les trajineras de Xochimilco")}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
