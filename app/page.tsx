import { Hero } from "@/components/marketing/hero";
import { FeaturedDeals } from "@/components/marketing/featured-deals";
import { LearningRoadmap } from "@/components/marketing/learning-roadmap";
import { PopularCategories } from "@/components/marketing/popular-categories";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedDeals />
      <LearningRoadmap />
      <PopularCategories />
    </>
  );
}
