import { setRequestLocale } from "next-intl/server";
import { getAllDestinations } from "@/lib/data/destinations";
import { getAllAirports } from "@/lib/data/airports";
import HeroSection from "@/components/home/HeroSection";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import HowItWorks from "@/components/home/HowItWorks";
import MapSection from "@/components/home/MapSection";
import AirlineComparisonSection from "@/components/home/AirlineComparisonSection";

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const [destinations, airports] = await Promise.all([
    getAllDestinations(),
    getAllAirports(),
  ]);

  return (
    <>
      <HeroSection airports={airports} />
      <AirlineComparisonSection />
      <MapSection destinations={destinations} />
      <FeaturedDestinations destinations={destinations.slice(0, 6)} />
      <HowItWorks />
    </>
  );
}
