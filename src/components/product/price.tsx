import { formatPrice } from "@/lib/products";

type PriceProps = {
  price: number;
  compareAtPrice?: number;
  className?: string;
};

export function Price({ price, compareAtPrice, className = "" }: PriceProps) {
  const onSale = compareAtPrice !== undefined && compareAtPrice > price;

  return (
    <p className={`price ${className}`}>
      <span className={onSale ? "price-sale" : undefined}>
        {onSale && <span className="sr-only">Sale price </span>}
        {formatPrice(price)}
      </span>
      {onSale && (
        <s className="price-compare">
          <span className="sr-only">Regular price </span>
          {formatPrice(compareAtPrice)}
        </s>
      )}
    </p>
  );
}
