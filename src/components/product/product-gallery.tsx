"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Badge, ProductImage } from "@/lib/products";
import { ProductBadges } from "./product-badges";

type ProductGalleryProps = {
  images: ProductImage[];
  badges: Badge[];
  dimmed?: boolean;
};

export function ProductGallery({ images, badges, dimmed = false }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const count = images.length;
  const current = images[active];
  const go = (step: 1 | -1) => setActive((index) => (index + step + count) % count);

  return (
    <div className="flex flex-col gap-3 lg:flex-row-reverse lg:gap-4">
      <div className="media-frame group/gallery flex-1 rounded-panel">
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          preload={active === 0}
          sizes="(min-width: 1024px) 55vw, 100vw"
          className={`object-cover ${dimmed ? "opacity-60 grayscale" : ""}`}
        />
        <ProductBadges badges={badges} className="absolute top-3 left-3 right-3 sm:top-5 sm:left-5" />

        {count > 1 && (
          <>
            <div className="absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between sm:inset-x-5">
              <button
                type="button"
                className="btn btn-icon rounded-full bg-canvas/90 p-0 text-ink shadow-popover hover:bg-canvas lg:opacity-0 lg:group-hover/gallery:opacity-100 lg:focus-visible:opacity-100"
                aria-label="Previous image"
                onClick={() => go(-1)}
              >
                <ChevronLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                className="btn btn-icon rounded-full bg-canvas/90 p-0 text-ink shadow-popover hover:bg-canvas lg:opacity-0 lg:group-hover/gallery:opacity-100 lg:focus-visible:opacity-100"
                aria-label="Next image"
                onClick={() => go(1)}
              >
                <ChevronRight aria-hidden="true" />
              </button>
            </div>
            <p
              aria-live="polite"
              className="absolute right-3 bottom-3 rounded-full bg-chrome/80 px-3 py-1 text-xs font-medium text-on-chrome tabular sm:right-5 sm:bottom-5"
            >
              {active + 1} / {count}
            </p>
          </>
        )}
      </div>

      {count > 1 && (
        <ul className="flex gap-3 lg:w-20 lg:flex-col" aria-label="Product images">
          {images.map((image, index) => (
            <li key={image.src} className="w-16 sm:w-20">
              <button
                type="button"
                aria-label={`Show image ${index + 1}: ${image.alt}`}
                aria-current={index === active ? "true" : undefined}
                onClick={() => setActive(index)}
                className={`media-frame block w-full rounded-input ring-2 ring-offset-2 transition-shadow ${
                  index === active ? "ring-primary" : "ring-transparent hover:ring-line-strong"
                }`}
              >
                <Image src={image.src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
