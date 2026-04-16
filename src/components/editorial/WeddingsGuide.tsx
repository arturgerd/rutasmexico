import { t3 } from "@/lib/utils";

interface Props {
  locale: string;
}

export default function WeddingsGuide({ locale }: Props) {
  return (
    <article className="mt-10 bg-white rounded-2xl shadow-lg border border-arena-100 p-6 md:p-10 prose prose-arena max-w-none">
      <header className="not-prose mb-8 pb-6 border-b border-arena-100">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-arena-900 mb-3">
          {t3(locale,
            "Casarse en Mexico: todo lo que necesitas saber",
            "Getting married in Mexico: everything you need to know",
            "Se marier au Mexique : tout ce qu'il faut savoir"
          )}
        </h2>
        <p className="text-arena-500 text-lg">
          {t3(locale,
            "Mexico es uno de los destinos de boda mas populares del mundo. Con matrimonio igualitario legal en todo el pais desde 2022, venues inclusivos y una riqueza cultural y paisajistica impresionante, es el escenario perfecto para celebrar el amor en todas sus formas.",
            "Mexico is one of the world's most popular wedding destinations. With same-sex marriage legal nationwide since 2022, inclusive venues and stunning cultural and scenic richness, it's the perfect setting to celebrate love in all its forms.",
            "Le Mexique est l'une des destinations de mariage les plus populaires au monde."
          )}
        </p>
      </header>

      <section className="mb-10">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Por que casarse en Mexico",
            "Why get married in Mexico",
            "Pourquoi se marier au Mexique"
          )}
        </h3>
        <p className="text-arena-700 leading-relaxed mb-3">
          {t3(locale,
            "Cada ano mas de 35,000 parejas extranjeras eligen Mexico para su boda, ademas de los miles de parejas locales. Las razones son claras:",
            "Every year over 35,000 foreign couples choose Mexico for their wedding, in addition to thousands of local couples. The reasons are clear:",
            "Plus de 35 000 couples étrangers se marient au Mexique chaque année."
          )}
        </p>
        <ul className="space-y-2 text-arena-700">
          <li>
            <strong>{t3(locale, "Escenarios unicos:", "Unique settings:", "Cadres uniques :")}</strong>{" "}
            {t3(locale,
              "Desde playas caribenas hasta cenotes mayas, haciendas coloniales, desiertos de Baja California o piramides prehispanicas.",
              "From Caribbean beaches to Mayan cenotes, colonial haciendas, Baja California deserts or pre-Hispanic pyramids.",
              "Plages, cenotes, haciendas, déserts."
            )}
          </li>
          <li>
            <strong>{t3(locale, "Precios accesibles:", "Affordable prices:", "Prix abordables :")}</strong>{" "}
            {t3(locale,
              "Una boda de 80 invitados en Mexico cuesta un 40-60% menos que la misma en Estados Unidos o Europa.",
              "An 80-guest wedding in Mexico costs 40-60% less than the same in the US or Europe.",
              "40-60% moins cher qu'aux États-Unis ou en Europe."
            )}
          </li>
          <li>
            <strong>{t3(locale, "Infraestructura turistica:", "Tourism infrastructure:", "Infrastructure touristique :")}</strong>{" "}
            {t3(locale,
              "Resorts con programas de boda profesionales, wedding planners especializadas en parejas extranjeras y conectividad aerea internacional.",
              "Resorts with professional wedding programs, wedding planners specialized in foreign couples and international air connectivity.",
              "Resorts avec programmes professionnels, wedding planners."
            )}
          </li>
          <li>
            <strong>{t3(locale, "Inclusion total:", "Full inclusion:", "Inclusion totale :")}</strong>{" "}
            {t3(locale,
              "Matrimonio igualitario legal en los 32 estados desde 2022. Mexico es reconocido por su apertura a parejas LGBTIQ+.",
              "Same-sex marriage legal in all 32 states since 2022. Mexico is recognized for its openness to LGBTIQ+ couples.",
              "Mariage pour tous légal depuis 2022."
            )}
          </li>
          <li>
            <strong>{t3(locale, "Luna de miel integrada:", "Honeymoon included:", "Lune de miel incluse :")}</strong>{" "}
            {t3(locale,
              "La ubicacion de la boda suele ser el destino perfecto de luna de miel sin gastos adicionales de traslado.",
              "The wedding location is often the perfect honeymoon destination with no additional travel costs.",
              "Le lieu du mariage est souvent parfait pour la lune de miel."
            )}
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Requisitos legales para casarse en Mexico",
            "Legal requirements to marry in Mexico",
            "Exigences légales"
          )}
        </h3>
        <p className="text-arena-700 leading-relaxed mb-4">
          {t3(locale,
            "Para una boda civil legal en Mexico, todos los estados requieren aproximadamente los mismos documentos. El proceso toma entre 3 y 7 dias habiles y es manejable con la ayuda de un wedding planner local.",
            "For a legal civil wedding in Mexico, all states require approximately the same documents. The process takes 3-7 business days and is manageable with help from a local wedding planner.",
            "Pour un mariage civil légal, tous les états exigent à peu près les mêmes documents."
          )}
        </p>
        <div className="not-prose space-y-3 my-4">
          <div className="p-4 bg-arena-50 rounded-xl border border-arena-100">
            <h4 className="font-bold text-arena-900 mb-1 text-sm">
              📄 {t3(locale, "Documentos necesarios", "Required documents", "Documents requis")}
            </h4>
            <ul className="text-sm text-arena-700 space-y-1">
              <li>• {t3(locale, "Pasaportes vigentes (copia y original)", "Valid passports (copy and original)", "Passeports valides")}</li>
              <li>• {t3(locale, "Actas de nacimiento apostilladas y traducidas al español por traductor certificado", "Birth certificates apostilled and translated to Spanish by certified translator", "Actes de naissance apostillés et traduits")}</li>
              <li>• {t3(locale, "Analisis de sangre realizados en Mexico en laboratorio autorizado (maximo 15 dias antes)", "Blood tests done in Mexico at authorized lab (max 15 days before)", "Analyses de sang effectuées au Mexique")}</li>
              <li>• {t3(locale, "Cuatro testigos con identificacion oficial", "Four witnesses with official ID", "Quatre témoins")}</li>
              <li>• {t3(locale, "Si uno/a es divorciado/a: acta de divorcio apostillada", "If divorced: apostilled divorce certificate", "Acte de divorce si divorcé(e)")}</li>
            </ul>
          </div>
          <div className="p-4 bg-arena-50 rounded-xl border border-arena-100">
            <h4 className="font-bold text-arena-900 mb-1 text-sm">
              ⏱️ {t3(locale, "Tiempos del proceso", "Process timing", "Calendrier")}
            </h4>
            <p className="text-sm text-arena-700">
              {t3(locale,
                "Llegada a Mexico minimo 4 dias antes de la boda. Dia 1: analisis de sangre. Dia 2: entrega de documentos en Registro Civil. Dia 3-4: revision. Dia 5+: ceremonia. Muchas parejas optan por una boda simbolica en Mexico y la boda civil en su pais de origen para simplificar.",
                "Arrive in Mexico minimum 4 days before the wedding. Day 1: blood tests. Day 2: documents submitted to Civil Registry. Days 3-4: review. Day 5+: ceremony. Many couples choose a symbolic wedding in Mexico and the civil wedding in their home country to simplify.",
                "Arrivez au moins 4 jours avant."
              )}
            </p>
          </div>
          <div className="p-4 bg-arena-50 rounded-xl border border-arena-100">
            <h4 className="font-bold text-arena-900 mb-1 text-sm">
              💒 {t3(locale, "Boda religiosa", "Religious wedding", "Mariage religieux")}
            </h4>
            <p className="text-sm text-arena-700">
              {t3(locale,
                "En Mexico, la boda religiosa (catolica u otras) es independiente de la civil. Debes hacer ambas si quieres ese valor sentimental. La religiosa no tiene validez legal: solo la civil.",
                "In Mexico, religious weddings (Catholic or otherwise) are separate from civil. You must do both if you want that sentimental value. Only the civil wedding has legal validity.",
                "Le mariage religieux est séparé du civil."
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Presupuesto y cuanto cuesta una boda",
            "Budget and wedding costs",
            "Budget et coûts"
          )}
        </h3>
        <p className="text-arena-700 leading-relaxed mb-4">
          {t3(locale,
            "Los precios varian enormemente por destino y tipo de boda. Estos son los rangos generales en 2026 para una boda de 50-80 invitados:",
            "Prices vary enormously by destination and wedding type. These are general 2026 ranges for a 50-80 guest wedding:",
            "Les prix varient selon la destination et le type."
          )}
        </p>
        <div className="not-prose overflow-x-auto my-6">
          <table className="min-w-full text-sm">
            <thead className="bg-arena-100">
              <tr>
                <th className="text-left p-3 font-semibold text-arena-800">{t3(locale, "Tipo de boda", "Wedding type", "Type")}</th>
                <th className="text-left p-3 font-semibold text-arena-800">{t3(locale, "Rango (MXN)", "Range (MXN)", "Fourchette (MXN)")}</th>
                <th className="text-left p-3 font-semibold text-arena-800">{t3(locale, "Rango (USD)", "Range (USD)", "Fourchette (USD)")}</th>
                <th className="text-left p-3 font-semibold text-arena-800">{t3(locale, "Que incluye", "What's included", "Inclus")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-arena-100 bg-white">
              <tr><td className="p-3 font-medium">{t3(locale, "Intima / economica", "Intimate / budget", "Intime")}</td><td className="p-3">$50,000 - $180,000</td><td className="p-3">$2,900 - $10,500</td><td className="p-3 text-xs">{t3(locale, "20-40 invitados, venue simple, catering basico, foto basica", "20-40 guests, simple venue, basic catering, basic photo", "20-40 invités")}</td></tr>
              <tr><td className="p-3 font-medium">{t3(locale, "Media", "Mid-range", "Moyen")}</td><td className="p-3">$180,000 - $400,000</td><td className="p-3">$10,500 - $23,000</td><td className="p-3 text-xs">{t3(locale, "50-80 invitados, resort o hacienda, catering completo, banda, foto + video, decoracion", "50-80 guests, resort or hacienda, full catering, band, photo + video, decor", "50-80 invités")}</td></tr>
              <tr><td className="p-3 font-medium">{t3(locale, "Lujo", "Luxury", "Luxe")}</td><td className="p-3">$400,000 - $1,500,000</td><td className="p-3">$23,000 - $87,000</td><td className="p-3 text-xs">{t3(locale, "80-150 invitados, venue premium, chef celebrity, fuegos, apartados exclusivos", "80-150 guests, premium venue, celebrity chef, fireworks, exclusive buyouts", "80-150 invités")}</td></tr>
              <tr><td className="p-3 font-medium">{t3(locale, "Ultra-lujo", "Ultra-luxury", "Ultra-luxe")}</td><td className="p-3">$1,500,000+</td><td className="p-3">$87,000+</td><td className="p-3 text-xs">{t3(locale, "Sin limite. Buy-out de resort, arte floral, entretenimiento internacional.", "No limit. Resort buyout, floral art, international entertainment.", "Sans limite.")}</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-arena-600 mt-4">
          {t3(locale,
            "Tip: los paquetes all-inclusive de resort suelen ahorrar 30-40% versus contratar proveedores por separado. Incluyen venue, comida, bebida, coordinador y decoracion basica.",
            "Tip: resort all-inclusive packages usually save 30-40% vs hiring vendors separately. Include venue, food, drinks, coordinator and basic decor.",
            "Astuce : les forfaits tout inclus économisent 30-40%."
          )}
        </p>
      </section>

      <section className="mb-10">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Los mejores meses para casarse en Mexico",
            "Best months to get married in Mexico",
            "Meilleurs mois"
          )}
        </h3>
        <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="p-5 bg-green-50 rounded-xl border border-green-200">
            <h4 className="font-display font-bold text-green-700 mb-2">
              🟢 {t3(locale, "Ideal", "Ideal", "Idéal")}
            </h4>
            <p className="text-sm text-arena-700">
              {t3(locale,
                "Noviembre, diciembre (antes del 15), enero, febrero, marzo, abril. Clima seco, sin huracanes, ni mucho calor. Precios altos pero justificados.",
                "November, December (before 15), January, February, March, April. Dry weather, no hurricanes, not too hot. High prices but worth it.",
                "Novembre, décembre, janvier, février, mars, avril."
              )}
            </p>
          </div>
          <div className="p-5 bg-yellow-50 rounded-xl border border-yellow-200">
            <h4 className="font-display font-bold text-yellow-700 mb-2">
              🟡 {t3(locale, "Aceptable", "Shoulder", "Moyen")}
            </h4>
            <p className="text-sm text-arena-700">
              {t3(locale,
                "Mayo, junio, ultima semana de noviembre. Clima caluroso pero manejable. Precios 30-40% mas bajos que en temporada alta.",
                "May, June, last week of November. Hot but manageable weather. Prices 30-40% lower than peak season.",
                "Mai, juin. Prix 30-40% moins chers."
              )}
            </p>
          </div>
          <div className="p-5 bg-red-50 rounded-xl border border-red-200">
            <h4 className="font-display font-bold text-red-700 mb-2">
              🔴 {t3(locale, "A evitar", "Avoid", "À éviter")}
            </h4>
            <p className="text-sm text-arena-700">
              {t3(locale,
                "Julio, agosto, septiembre, primera quincena de octubre. Temporada de huracanes en el Caribe, calor extremo (40°C+) en Baja California y Yucatan.",
                "July, August, September, first half of October. Hurricane season in the Caribbean, extreme heat (40°C+) in Baja California and Yucatan.",
                "Juillet, août, septembre : ouragans et chaleur extrême."
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="font-display text-2xl font-bold text-arena-900 mb-4">
          {t3(locale,
            "Checklist de planeacion",
            "Planning checklist",
            "Checklist"
          )}
        </h3>
        <p className="text-arena-700 leading-relaxed mb-4">
          {t3(locale,
            "Una boda destino requiere mas planeacion que una local. Este es el cronograma recomendado:",
            "A destination wedding takes more planning than a local one. Recommended timeline:",
            "Un mariage à destination demande plus de planification."
          )}
        </p>
        <div className="not-prose space-y-2">
          {[
            { t: "12-18 meses antes", t_en: "12-18 months before", t_fr: "12-18 mois avant", items: [{ es: "Elegir destino y fecha. Reservar venue y hospedaje (grupo).", en: "Choose destination and date. Book venue and group lodging.", fr: "Choisir destination et date." }] },
            { t: "9-12 meses antes", t_en: "9-12 months before", t_fr: "9-12 mois avant", items: [{ es: "Contratar wedding planner local (muy recomendable). Definir lista de invitados preliminar y enviar save-the-date.", en: "Hire local wedding planner (highly recommended). Preliminary guest list and save-the-date invites.", fr: "Engagez un wedding planner local." }] },
            { t: "6-9 meses antes", t_en: "6-9 months before", t_fr: "6-9 mois avant", items: [{ es: "Iniciar tramites legales. Contratar foto, video, banda/DJ. Eleccion de menu y decoracion.", en: "Start legal process. Book photo, video, band/DJ. Menu and decor selection.", fr: "Démarrez les démarches légales." }] },
            { t: "3-6 meses antes", t_en: "3-6 months before", t_fr: "3-6 mois avant", items: [{ es: "Invitaciones formales. Prueba de vestido. Compra de anillos. Degustacion con chef.", en: "Formal invitations. Dress fitting. Ring purchase. Chef tasting.", fr: "Invitations formelles." }] },
            { t: "1-3 meses antes", t_en: "1-3 months before", t_fr: "1-3 mois avant", items: [{ es: "Confirmar RSVPs. Finalizar contratos. Ensayo virtual con planner. Apostillar documentos.", en: "Confirm RSVPs. Finalize contracts. Virtual rehearsal with planner. Apostille documents.", fr: "Confirmer les RSVPs." }] },
            { t: "Ultima semana", t_en: "Last week", t_fr: "Dernière semaine", items: [{ es: "Viajar al destino con 4+ dias de anticipacion. Analisis de sangre. Ensayo en persona. Welcome party.", en: "Travel to destination 4+ days early. Blood tests. In-person rehearsal. Welcome party.", fr: "Voyagez 4+ jours à l'avance." }] },
          ].map((row, i) => (
            <div key={i} className="flex gap-4 p-4 bg-arena-50 rounded-xl border border-arena-100">
              <div className="w-32 md:w-40 flex-shrink-0">
                <span className="text-xs font-bold text-terracotta-600 uppercase tracking-wide">
                  {t3(locale, row.t, row.t_en, row.t_fr)}
                </span>
              </div>
              <div className="flex-1 text-sm text-arena-700">
                {row.items.map((it, j) => (
                  <p key={j}>{t3(locale, it.es, it.en, it.fr)}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
