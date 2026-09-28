"use client";

import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { ProductCard } from "./product-card";

type ProductCarouselProps = {
  eyebrow: string;
  title: string;
  href: string;
  products: Product[];
  className?: string;
};

export function ProductCarousel({
  eyebrow,
  title,
  href,
  products,
  className = "",
}: ProductCarouselProps) {
  const listRef = useRef<HTMLUListElement>(null);

  const scrollByPage = (direction: 1 | -1) => {
    const list = listRef.current;
    if (!list) return;
    list.scrollBy({ left: direction * list.clientWidth, behavior: "smooth" });
  };

  return (
    <section className={`section-y ${className}`} aria-roledescription="carousel" aria-label={title}>
      <div className="container-page">
        <div className="section-heading">
          <div>
            <p className="eyebrow text-primary">{eyebrow}</p>
            <h2 className="mt-3 text-h2">{title}</h2>
          </div>
          <div className="flex items-center gap-4">
            <Link href={href} className="btn btn-ghost">
              View all
            </Link>
            <div className="hidden gap-2 lg:flex">
              <button
                type="button"
                className="btn btn-secondary btn-icon min-h-10 min-w-10 rounded-full p-0"
                aria-label="Previous products"
                onClick={() => scrollByPage(-1)}
              >
                <ChevronLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-icon min-h-10 min-w-10 rounded-full p-0"
                aria-label="Next products"
                onClick={() => scrollByPage(1)}
              >
                <ChevronRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <ul ref={listRef} className="scroll-row pb-1">
          {products.map((product) => (
            <li key={product.slug}>
              <ProductCard
                product={product}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 46vw"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
