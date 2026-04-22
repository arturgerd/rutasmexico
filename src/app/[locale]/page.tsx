import { setRequestLocale } from "next-intl/server";
import { getAllDestinations } from "@/lib/data/destinations";
import { getAllAirports } from "@/lib/data/airports";
import { getRecentBlogPosts } from "@/lib/data/blog";
import HeroSection from "@/components/home/HeroSection";
import MundialBanner from "@/components/home/MundialBanner";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import HowItWorks from "@/components/home/HowItWorks";
import MapSection from "@/components/home/MapSection";
import AirlineComparisonSection from "@/components/home/AirlineComparisonSection";
import RecentBlogPosts from "@/components/home/RecentBlogPosts";
import WhyMexicoSection from "@/components/editorial/WhyMexicoSection";
import { seoAlternates } from "@/lib/utils";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return {
    title: locale === "es"
      ? "RutasMéxico - Vuelos, autobuses, hoteles y guías de viaje por México"
      : locale === "fr"
        ? "RutasMéxico - Vols, bus, hôtels et guides de voyage au Mexique"
        : "RutasMéxico - Flights, buses, hotels and travel guides for Mexico",
    description: locale === "es"
      ? "Compara vuelos (Volaris, VivaAerobus, Aeroméxico), autobuses (ADO, ETN) y hoteles en México. Rutas, destinos y guías para planear tu viaje al mejor precio."
      : locale === "fr"
        ? "Comparez vols (Volaris, VivaAerobus, Aeroméxico), bus (ADO, ETN) et hôtels au Mexique. Itinéraires, destinations et guides pour planifier votre voyage."
        : "Compare flights (Volaris, VivaAerobus, Aeromexico), buses (ADO, ETN) and hotels in Mexico. Routes, destinations and guides to plan your trip at the best price.",
    alternates: seoAlternates(locale, ""),
  };
}

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const [destinations, airports, recentPosts] = await Promise.all([
    getAllDestinations(),
    getAllAirports(),
    getRecentBlogPosts(3),
  ]);

  return (
    <>
      <HeroSection airports={airports} />
      <MundialBanner locale={locale} />
      <WhyMexicoSection locale={locale} />
      <AirlineComparisonSection />
      <MapSection destinations={destinations} />
      <FeaturedDestinations destinations={destinations.slice(0, 6)} />
      <RecentBlogPosts posts={recentPosts} />
      <HowItWorks />
    </>
  );
}
