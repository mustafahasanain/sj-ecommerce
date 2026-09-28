import { Benefits } from "@/components/home/benefits";
import { EditorialFeature } from "@/components/home/editorial-feature";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { Hero } from "@/components/home/hero";
import { Solutions } from "@/components/home/solutions";
import { Testimonials } from "@/components/home/testimonials";
import { ProductCarousel } from "@/components/product/product-carousel";
import { ProductGridSection } from "@/components/product/product-grid-section";
import { bestSellers, newArrivals } from "@/lib/products";

export default function Home() {
  return (
    <>
      <Hero />
      <Benefits />
      <FeaturedCollections />
      <ProductCarousel
        eyebrow="Just landed"
        title="New arrivals"
        href="/collections/new"
        products={newArrivals}
        className="pt-0"
      />
      <EditorialFeature />
      <ProductGridSection
        eyebrow="Customer favorites"
        title="Best sellers"
        href="/collections/best-sellers"
        products={bestSellers}
      />
      <Solutions />
      <Testimonials />
    </>
  );
}
