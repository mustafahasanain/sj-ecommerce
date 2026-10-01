import { Benefits } from "@/components/home/benefits";
import { EditorialFeature } from "@/components/home/editorial-feature";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { Hero } from "@/components/home/hero";
import { Solutions } from "@/components/home/solutions";
import { Testimonials } from "@/components/home/testimonials";
import { ProductCarousel } from "@/components/product/product-carousel";
import { ProductGridSection } from "@/components/product/product-grid-section";
import { getBestSellers, getFeaturedCategories, getNewArrivals } from "@/db/queries/catalog";

// Rebuild with fresh catalog and stock data at most every 5 minutes.
export const revalidate = 300;

export default async function Home() {
  const [categories, newArrivals, bestSellers] = await Promise.all([
    getFeaturedCategories(),
    getNewArrivals(),
    getBestSellers(),
  ]);

  return (
    <>
      <Hero />
      <Benefits />
      <FeaturedCollections categories={categories} />
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
