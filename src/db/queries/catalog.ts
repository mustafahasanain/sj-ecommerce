import "server-only";

import { cache } from "react";
import { and, asc, count, desc, eq, inArray, ne, sql } from "drizzle-orm";
import { db } from "@/db";
import { categories, products } from "@/db/schema";
import type { Product } from "@/lib/products";

/** Columns and relations every storefront product query loads. */
const productQuery = {
  with: {
    category: { columns: { slug: true, name: true } },
    stock: { columns: { quantity: true } },
  },
} as const;

type ProductRow = NonNullable<Awaited<ReturnType<typeof findProduct>>>;

const findProduct = (slug: string) =>
  db.query.products.findFirst({
    ...productQuery,
    where: and(eq(products.slug, slug), eq(products.isActive, true)),
  });

function toProduct(row: ProductRow): Product {
  return {
    slug: row.slug,
    sku: row.sku,
    name: row.name,
    category: row.category,
    summary: row.summary,
    description: row.description,
    highlights: row.highlights,
    specs: row.specs,
    price: row.priceCents / 100,
    compareAtPrice: row.compareAtPriceCents === null ? undefined : row.compareAtPriceCents / 100,
    // A product without a stock row has nothing to ship.
    stock: row.stock?.quantity ?? 0,
    rating: row.rating,
    reviewCount: row.reviewCount,
    images: row.images,
    label:
      row.labelText && row.labelTone ? { label: row.labelText, tone: row.labelTone } : undefined,
  };
}

/** Cached per request so generateMetadata and the page share one query. */
export const getProductBySlug = cache(async (slug: string) => {
  const row = await findProduct(slug);
  return row ? toProduct(row) : undefined;
});

export async function getProductSlugs() {
  const rows = await db
    .select({ slug: products.slug })
    .from(products)
    .where(eq(products.isActive, true));
  return rows.map((row) => row.slug);
}

export async function getNewArrivals(limit = 6) {
  const rows = await db.query.products.findMany({
    ...productQuery,
    where: eq(products.isActive, true),
    orderBy: [desc(products.createdAt)],
    limit,
  });
  return rows.map(toProduct);
}

// Curated until orders exist; then rank by units sold instead.
const BEST_SELLER_SLUGS = [
  "aero-home-ax3000",
  "core-24-managed-switch",
  "cat6a-patch-cable",
  "flat-ethernet-cable",
];

export async function getBestSellers() {
  const rows = await db.query.products.findMany({
    ...productQuery,
    where: and(inArray(products.slug, BEST_SELLER_SLUGS), eq(products.isActive, true)),
  });
  const bySlug = new Map(rows.map((row) => [row.slug, toProduct(row)]));
  return BEST_SELLER_SLUGS.flatMap((slug) => bySlug.get(slug) ?? []);
}

/** Same-category products first, then the rest of the catalog. */
export async function getRelatedProducts(product: Product, limit = 4) {
  const rows = await db.query.products.findMany({
    ...productQuery,
    where: and(ne(products.slug, product.slug), eq(products.isActive, true)),
    orderBy: [
      desc(
        sql`${products.categoryId} = (select ${categories.id} from ${categories} where ${categories.slug} = ${product.category.slug})`,
      ),
      desc(products.createdAt),
    ],
    limit,
  });
  return rows.map(toProduct);
}

export type FeaturedCategory = {
  slug: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
  productCount: number;
};

export async function getFeaturedCategories(): Promise<FeaturedCategory[]> {
  return db
    .select({
      slug: categories.slug,
      name: categories.name,
      description: categories.description,
      imageUrl: categories.imageUrl,
      imageAlt: categories.imageAlt,
      productCount: count(products.id),
    })
    .from(categories)
    .leftJoin(
      products,
      and(eq(products.categoryId, categories.id), eq(products.isActive, true)),
    )
    .where(eq(categories.isFeatured, true))
    .groupBy(categories.id)
    .orderBy(asc(categories.sortOrder));
}
