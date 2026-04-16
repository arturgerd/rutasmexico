import { setRequestLocale } from "next-intl/server";
import { getAllDestinations } from "@/lib/data/destinations";
import { getAllAirports } from "@/lib/data/airports";
import { getRecentBlogPosts } from "@/lib/data/blog";
import HeroSection from "@/components/home/HeroSection";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import HowItWorks from "@/components/home/HowItWorks";
import MapSection from "@/components/home/MapSection";
import AirlineComparisonSection from "@/components/home/AirlineComparisonSection";
import RecentBlogPosts from "@/components/home/RecentBlogPosts";
import WhyMexicoSection from "@/components/editorial/WhyMexicoSection";

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
      <WhyMexicoSection locale={locale} />
      <AirlineComparisonSection />
      <MapSection destinations={destinations} />
      <FeaturedDestinations destinations={destinations.slice(0, 6)} />
      <RecentBlogPosts posts={recentPosts} />
      <HowItWorks />
    </>
  );
}
