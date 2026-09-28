import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { getProductBadges, getStockState, type Product } from "@/lib/products";
import { Price } from "./price";
import { ProductBadges } from "./product-badges";
import { Rating } from "./rating";

type ProductCardProps = {
  product: Product;
  sizes?: string;
};

export function ProductCard({
  product,
  sizes = "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw",
}: ProductCardProps) {
  const [image] = product.images;
  const soldOut = getStockState(product) === "out-of-stock";

  return (
    <article className="card-product h-full">
      <div className="media-frame">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          className={`object-cover ${soldOut ? "opacity-60 grayscale" : ""}`}
        />
        <ProductBadges
          badges={getProductBadges(product)}
          className="absolute top-2 left-2 right-2 sm:top-3 sm:left-3"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-lg font-medium sm:text-h4">
          {/* Stretched link: the whole card is clickable, the button stays on top. */}
          <Link
            href={`/products/${product.slug}`}
            className="after:absolute after:inset-0 after:rounded-card"
          >
            {product.name}
          </Link>
        </h3>
        <p className="card-title text-ink-muted">{product.summary}</p>
        <Rating value={product.rating} count={product.reviewCount} />

        <div className="mt-auto flex flex-col items-start gap-3 pt-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <Price price={product.price} compareAtPrice={product.compareAtPrice} />
          <button
            type="button"
            disabled={soldOut}
            className="btn btn-primary btn-sm relative z-10 min-h-11 min-w-11 px-3 sm:min-h-9 sm:px-4"
          >
            <ShoppingBag aria-hidden="true" className="sm:hidden" />
            <span className="sr-only sm:not-sr-only">{soldOut ? "Sold out" : "Add to cart"}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
