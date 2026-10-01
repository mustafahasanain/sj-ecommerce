/*
 * Loads the sample catalog. Safe to re-run: rows are upserted by slug.
 * Run with `pnpm db:seed` after `pnpm db:migrate`.
 */

import { sql } from "drizzle-orm";
import { db } from "./index";
import { categories, products, productStock } from "./schema";
import { categories as seedCategories, products as seedProducts } from "./seed-data";

const toCents = (value: number) => Math.round(value * 100);

/** Use the value proposed for insertion when a row already exists. */
const excluded = (column: string) => sql.raw(`excluded.${column}`);

async function main() {
  const categoryRows = await db
    .insert(categories)
    .values(seedCategories.map((category, index) => ({ ...category, sortOrder: index })))
    .onConflictDoUpdate({
      target: categories.slug,
      set: {
        name: excluded("name"),
        description: excluded("description"),
        imageUrl: excluded("image_url"),
        imageAlt: excluded("image_alt"),
        isFeatured: excluded("is_featured"),
        sortOrder: excluded("sort_order"),
        updatedAt: new Date(),
      },
    })
    .returning({ id: categories.id, slug: categories.slug });

  const categoryIds = new Map(categoryRows.map((row) => [row.slug, row.id]));
  const now = Date.now();

  const productRows = await db
    .insert(products)
    .values(
      seedProducts.map((product, index) => {
        const categoryId = categoryIds.get(product.category);
        if (!categoryId) throw new Error(`Unknown category "${product.category}" on ${product.slug}`);

        return {
          categoryId,
          slug: product.slug,
          sku: product.sku,
          name: product.name,
          summary: product.summary,
          description: product.description,
          highlights: product.highlights,
          specs: product.specs,
          images: product.images,
          priceCents: toCents(product.price),
          compareAtPriceCents: product.compareAtPrice ? toCents(product.compareAtPrice) : null,
          rating: product.rating,
          reviewCount: product.reviewCount,
          labelText: product.label?.label ?? null,
          labelTone: product.label?.tone ?? null,
          // A minute apart so "New arrivals" keeps the seed order.
          createdAt: new Date(now - index * 60_000),
        };
      }),
    )
    .onConflictDoUpdate({
      target: products.slug,
      set: {
        categoryId: excluded("category_id"),
        sku: excluded("sku"),
        name: excluded("name"),
        summary: excluded("summary"),
        description: excluded("description"),
        highlights: excluded("highlights"),
        specs: excluded("specs"),
        images: excluded("images"),
        priceCents: excluded("price_cents"),
        compareAtPriceCents: excluded("compare_at_price_cents"),
        rating: excluded("rating"),
        reviewCount: excluded("review_count"),
        labelText: excluded("label_text"),
        labelTone: excluded("label_tone"),
        createdAt: excluded("created_at"),
        updatedAt: new Date(),
      },
    })
    .returning({ id: products.id, slug: products.slug });

  const productIds = new Map(productRows.map((row) => [row.slug, row.id]));

  await db
    .insert(productStock)
    .values(
      seedProducts.map((product) => ({
        productId: productIds.get(product.slug)!,
        quantity: product.stock,
      })),
    )
    .onConflictDoUpdate({
      target: productStock.productId,
      set: { quantity: excluded("quantity"), updatedAt: new Date() },
    });

  console.log(
    `Seeded ${categoryRows.length} categories, ${productRows.length} products and their stock.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
