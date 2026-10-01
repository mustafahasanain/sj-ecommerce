/*
 * Product types and display helpers shared by server and client components.
 * Catalog data lives in the database; see src/db/queries/catalog.ts.
 */

export type BadgeTone = "sale" | "new" | "primary" | "neutral";
export type Badge = { label: string; tone: BadgeTone };

export type ProductImage = { src: string; alt: string };

export type Product = {
  slug: string;
  sku: string;
  name: string;
  category: { slug: string; name: string };
  summary: string;
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  price: number;
  compareAtPrice?: number;
  /** Units available to ship; 0 means out of stock. */
  stock: number;
  rating: number;
  reviewCount: number;
  /** First image is the primary shot used on cards. */
  images: ProductImage[];
  /** Merchandising label shown next to any sale badge. */
  label?: Badge;
};

export const LOW_STOCK_THRESHOLD = 5;

export type StockState = "in-stock" | "low-stock" | "out-of-stock";

export function getStockState(product: Product): StockState {
  if (product.stock <= 0) return "out-of-stock";
  if (product.stock <= LOW_STOCK_THRESHOLD) return "low-stock";
  return "in-stock";
}

/** Badges shown on the product image: sold out replaces everything else. */
export function getProductBadges(product: Product): Badge[] {
  if (getStockState(product) === "out-of-stock") {
    return [{ label: "Sold out", tone: "neutral" }];
  }

  const badges: Badge[] = [];
  if (product.compareAtPrice) {
    badges.push({ label: `-${formatPrice(product.compareAtPrice - product.price)}`, tone: "sale" });
  }
  if (product.label) badges.push(product.label);
  return badges;
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}
