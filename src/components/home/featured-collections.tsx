import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { FeaturedCategory } from "@/db/queries/catalog";

// Bento layout: one hero tile, one wide tile, two small tiles.
const tileLayout = [
  { tile: "col-span-2 aspect-[4/3] sm:aspect-[16/9] lg:col-span-2 lg:row-span-2 lg:aspect-auto", sizes: "(min-width: 1024px) 50vw, 100vw", large: true },
  { tile: "col-span-2 aspect-[2/1] lg:aspect-auto", sizes: "(min-width: 1024px) 50vw, 100vw", large: false },
  { tile: "aspect-square lg:aspect-auto", sizes: "(min-width: 1024px) 25vw, 50vw", large: false },
  { tile: "aspect-square lg:aspect-auto", sizes: "(min-width: 1024px) 25vw, 50vw", large: false },
];

export function FeaturedCollections({ categories }: { categories: FeaturedCategory[] }) {
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="section-heading">
          <div>
            <p className="eyebrow text-primary">Collections</p>
            <h2 className="mt-3 text-h2">Shop by category</h2>
          </div>
          <Link href="/collections" className="btn btn-ghost self-start md:self-auto">
            View all categories
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-grid lg:h-[40rem] lg:grid-cols-4 lg:grid-rows-2">
          {categories.map((category, index) => {
            const layout = tileLayout[index % tileLayout.length];

            return (
              <li key={category.slug} className={`relative ${layout.tile}`}>
                <Link
                  href={`/collections/${category.slug}`}
                  className="group absolute inset-0 isolate flex flex-col justify-end overflow-hidden rounded-card bg-chrome p-4 text-on-chrome sm:p-6"
                >
                  {category.imageUrl && (
                    <Image
                      src={category.imageUrl}
                      alt={category.imageAlt ?? ""}
                      fill
                      sizes={layout.sizes}
                      className="-z-10 object-cover transition-[scale] duration-500 group-hover:scale-105"
                    />
                  )}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-linear-to-t from-black/85 via-black/45 to-black/5"
                  />
                  <p className="text-xs font-medium text-on-chrome-muted sm:text-sm">
                    {category.productCount} {category.productCount === 1 ? "product" : "products"}
                  </p>
                  <h3 className={layout.large ? "mt-1 text-h2 text-on-chrome" : "mt-1 text-lg font-medium text-on-chrome sm:text-h3"}>
                    {category.name}
                  </h3>
                  <p className={`mt-2 max-w-sm text-sm text-on-chrome-muted ${layout.large ? "" : "hidden sm:block"}`}>
                    {category.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium sm:mt-4">
                    Shop now
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
