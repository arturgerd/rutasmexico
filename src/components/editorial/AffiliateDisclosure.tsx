import { t3 } from "@/lib/utils";
import Link from "next/link";

interface Props {
  locale: string;
  variant?: "banner" | "inline";
}

export default function AffiliateDisclosure({ locale, variant = "banner" }: Props) {
  const text = t3(locale,
    "RutasMéxico contiene enlaces afiliados a Travelpayouts (Aviasales, Booking), Klook, Tiqets, Kiwitaxi, Airalo y otras plataformas. Si reservas a través de estos enlaces, recibimos una pequeña comisión sin costo adicional para ti — así mantenemos el sitio gratuito y sin paywalls. Solo recomendamos servicios que usaríamos nosotros mismos.",
    "RutasMéxico contains affiliate links to Travelpayouts (Aviasales, Booking), Klook, Tiqets, Kiwitaxi, Airalo and other platforms. If you book through these links, we earn a small commission at no extra cost to you — that keeps this site free and paywall-free. We only recommend services we would use ourselves.",
    "RutasMéxico contient des liens d'affiliation vers Travelpayouts (Aviasales, Booking), Klook, Tiqets, Kiwitaxi, Airalo et d'autres plateformes. Si vous réservez via ces liens, nous touchons une petite commission sans coût supplémentaire — c'est ce qui rend ce site gratuit et sans paywall. Nous ne recommandons que des services que nous utiliserions nous-mêmes."
  );

  const learnMore = t3(locale, "Más en términos y privacidad", "More in terms and privacy", "Plus dans conditions et confidentialité");

  if (variant === "inline") {
    return (
      <div className="text-xs text-arena-500 bg-arena-50 border border-arena-200 rounded-lg px-4 py-3 my-6">
        <strong className="text-arena-700">{t3(locale, "Aviso de afiliados:", "Affiliate disclosure:", "Avis d'affiliation :")}</strong>{" "}
        {text}{" "}
        <Link href={`/${locale}/terminos`} className="underline hover:text-terracotta-600">
          {learnMore}
        </Link>
      </div>
    );
  }

  return (
    <section aria-label={t3(locale, "Aviso de afiliados", "Affiliate disclosure", "Avis d'affiliation")} className="bg-arena-50 border-y border-arena-200">
      <div className="container-custom py-4">
        <p className="text-xs sm:text-sm text-arena-600 max-w-5xl mx-auto leading-relaxed">
          <strong className="text-arena-800">
            {t3(locale, "Aviso de afiliados:", "Affiliate disclosure:", "Avis d'affiliation :")}
          </strong>{" "}
          {text}{" "}
          <Link href={`/${locale}/terminos`} className="underline text-terracotta-600 hover:text-terracotta-700 whitespace-nowrap">
            {learnMore}
          </Link>
        </p>
      </div>
    </section>
  );
}
