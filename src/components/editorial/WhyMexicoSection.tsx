import { t3 } from "@/lib/utils";

interface Props {
  locale: string;
}

export default function WhyMexicoSection({ locale }: Props) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-4xl mb-3 block">🌮</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-arena-900 mb-4">
              {t3(locale,
                "Por que viajar por Mexico",
                "Why travel Mexico",
                "Pourquoi voyager au Mexique"
              )}
            </h2>
            <p className="text-lg text-arena-600 max-w-2xl mx-auto">
              {t3(locale,
                "Mexico no es un destino: son decenas. Y la diversidad de experiencias entre cada uno te sorprendera.",
                "Mexico isn't one destination: it's dozens. And the diversity of experiences between them will surprise you.",
                "Le Mexique n'est pas une destination : c'est des dizaines. Et la diversité des expériences vous surprendra."
              )}
            </p>
          </div>

          <div className="prose prose-arena prose-lg max-w-none">
            <p className="text-arena-700 leading-relaxed">
              {t3(locale,
                "Con 32 estados, dos oceanos, 11 sitios Patrimonio Mundial de la UNESCO, 177 Pueblos Magicos y una gastronomia reconocida como Patrimonio Cultural Inmaterial de la Humanidad, Mexico es uno de los destinos mas diversos del planeta. Aqui puedes esquiar en un volcan por la manana, bucear en un cenote al mediodia y ver luciernagas en un bosque al anochecer, todo en la misma semana.",
                "With 32 states, two oceans, 11 UNESCO World Heritage sites, 177 Pueblos Magicos and a cuisine recognized as Intangible Cultural Heritage of Humanity, Mexico is one of the world's most diverse destinations. You can ski down a volcano in the morning, dive a cenote at noon and watch fireflies in a forest at dusk, all in the same week.",
                "Avec 32 états, deux océans, 11 sites UNESCO et 177 Pueblos Magicos, le Mexique est l'une des destinations les plus diverses au monde."
              )}
            </p>

            <p className="text-arena-700 leading-relaxed">
              {t3(locale,
                "Lo que hace especial a Mexico no son solo sus playas del Caribe o sus piramides, sino la combinacion inigualable de culturas vivas (mas de 68 pueblos indigenas con lenguas propias), historia milenaria (civilizaciones olmeca, maya, azteca, zapoteca, purepecha), paisajes extremos (del desierto de Sonora a la selva de Chiapas) y una calidez humana que los visitantes recuerdan por anos.",
                "What makes Mexico special isn't just its Caribbean beaches or pyramids, but the unmatched combination of living cultures (over 68 indigenous peoples with their own languages), millennia-old history (Olmec, Maya, Aztec, Zapotec, Purepecha civilizations), extreme landscapes (from the Sonora desert to the Chiapas jungle) and a warmth that visitors remember for years.",
                "Ce qui rend le Mexique spécial, c'est la combinaison unique de cultures vivantes, d'histoire millénaire et de paysages extrêmes."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="p-6 bg-gradient-to-br from-terracotta-50 to-terracotta-100 rounded-2xl border border-terracotta-200">
              <span className="text-3xl block mb-3">🏛️</span>
              <h3 className="font-display font-bold text-arena-900 text-xl mb-2">
                {t3(locale, "Historia viva", "Living history", "Histoire vivante")}
              </h3>
              <p className="text-sm text-arena-700 leading-relaxed">
                {t3(locale,
                  "Teotihuacan, Chichen Itza, Palenque, Monte Alban y mas de 200 zonas arqueologicas abiertas al publico. Civilizaciones que construyeron piramides mas altas que las egipcias.",
                  "Teotihuacan, Chichen Itza, Palenque, Monte Alban and over 200 archaeological sites open to the public. Civilizations that built pyramids taller than Egyptian ones.",
                  "Plus de 200 sites archéologiques ouverts au public."
                )}
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-azul-50 to-azul-100 rounded-2xl border border-azul-200">
              <span className="text-3xl block mb-3">🏖️</span>
              <h3 className="font-display font-bold text-arena-900 text-xl mb-2">
                {t3(locale, "Dos oceanos, miles de playas", "Two oceans, thousands of beaches", "Deux océans, des milliers de plages")}
              </h3>
              <p className="text-sm text-arena-700 leading-relaxed">
                {t3(locale,
                  "El Caribe turquesa de Cancun y Tulum, el Pacifico turquesa de Los Cabos y Puerto Vallarta, y la Mar de Cortes que Jacques Cousteau llamo 'el acuario del mundo'.",
                  "The turquoise Caribbean of Cancun and Tulum, the Pacific of Los Cabos and Puerto Vallarta, and the Sea of Cortez that Jacques Cousteau called 'the aquarium of the world'.",
                  "La mer des Caraïbes, le Pacifique et la Mer de Cortez."
                )}
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-jade-50 to-jade-100 rounded-2xl border border-jade-200">
              <span className="text-3xl block mb-3">🌮</span>
              <h3 className="font-display font-bold text-arena-900 text-xl mb-2">
                {t3(locale, "Gastronomia Patrimonio UNESCO", "UNESCO Heritage cuisine", "Gastronomie UNESCO")}
              </h3>
              <p className="text-sm text-arena-700 leading-relaxed">
                {t3(locale,
                  "Mole oaxaqueno, cochinita pibil yucateca, birria jalisciense, tacos al pastor, chiles en nogada, tamales... Cada region tiene su propia culinaria reconocida mundialmente.",
                  "Oaxacan mole, Yucatecan cochinita pibil, Jalisco birria, al pastor tacos, chiles en nogada, tamales... Each region has its own world-recognized cuisine.",
                  "Mole, cochinita pibil, birria, tacos al pastor... Chaque région a sa cuisine unique."
                )}
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-oro-50 to-oro-100 rounded-2xl border border-oro-200">
              <span className="text-3xl block mb-3">💰</span>
              <h3 className="font-display font-bold text-arena-900 text-xl mb-2">
                {t3(locale, "Destino accesible", "Affordable destination", "Destination abordable")}
              </h3>
              <p className="text-sm text-arena-700 leading-relaxed">
                {t3(locale,
                  "Un viaje de 7 dias a Mexico cuesta la mitad que a Europa. Hospedaje, comida, transporte y actividades son considerablemente mas economicos sin sacrificar calidad.",
                  "A 7-day Mexico trip costs half of Europe. Lodging, food, transport and activities are significantly cheaper without sacrificing quality.",
                  "Un voyage de 7 jours coûte la moitié de l'Europe."
                )}
              </p>
            </div>
          </div>

          <div className="mt-12 p-8 bg-arena-50 rounded-2xl border border-arena-100">
            <h3 className="font-display text-2xl font-bold text-arena-900 mb-4 text-center">
              {t3(locale,
                "Experiencias unicas de Mexico",
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
                <span className="text-sm">{t3(locale, "Ver monarcas en los santuarios de Michoacan (noviembre-marzo)", "See monarch butterflies in Michoacan sanctuaries (Nov-March)", "Voir les papillons monarques au Michoacan")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-terracotta-500 font-bold mt-0.5">•</span>
                <span className="text-sm">{t3(locale, "Vivir el Dia de Muertos en Oaxaca o Patzcuaro (1-2 noviembre)", "Experience Day of the Dead in Oaxaca or Patzcuaro (Nov 1-2)", "Vivre le Jour des Morts à Oaxaca")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-terracotta-500 font-bold mt-0.5">•</span>
                <span className="text-sm">{t3(locale, "Bucear en cenotes sagrados mayas de Yucatan", "Dive in sacred Mayan cenotes of Yucatan", "Plonger dans les cenotes mayas")}</span>
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
                <span className="text-sm">{t3(locale, "Subir la piramide del sol en Teotihuacan al amanecer", "Climb the Pyramid of the Sun at Teotihuacan at sunrise", "Monter la pyramide du soleil à Teotihuacan")}</span>
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
