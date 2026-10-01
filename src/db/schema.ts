// Drizzle table definitions live here.
// Better Auth tables are generated into their own file so regenerating never overwrites this one:
//   pnpm dlx @better-auth/cli generate --config src/lib/auth.ts --output src/db/auth-schema.ts
export * from "./auth-schema";

import { relations, sql } from "drizzle-orm";
import {
  boolean,
  check,
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const badgeTone = pgEnum("badge_tone", ["sale", "new", "primary", "neutral"]);

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const categories = pgTable("categories", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  imageAlt: text("image_alt"),
  /** Shown as a tile in the homepage "Shop by category" section. */
  isFeatured: boolean("is_featured").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  ...timestamps,
});

export const products = pgTable(
  "products",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "restrict" }),
    slug: text("slug").notNull().unique(),
    sku: text("sku").notNull().unique(),
    name: text("name").notNull(),
    summary: text("summary").notNull(),
    description: text("description").notNull(),
    highlights: text("highlights").array().notNull().default(sql`'{}'::text[]`),
    specs: jsonb("specs").$type<{ label: string; value: string }[]>().notNull().default([]),
    /** Ordered; the first image is the primary shot used on cards. */
    images: jsonb("images").$type<{ src: string; alt: string }[]>().notNull().default([]),
    priceCents: integer("price_cents").notNull(),
    compareAtPriceCents: integer("compare_at_price_cents"),
    // Placeholders until reviews have their own table.
    rating: numeric("rating", { precision: 2, scale: 1, mode: "number" }).notNull().default(0),
    reviewCount: integer("review_count").notNull().default(0),
    /** Merchandising badge shown next to any sale badge, e.g. "New". */
    labelText: text("label_text"),
    labelTone: badgeTone("label_tone"),
    isActive: boolean("is_active").notNull().default(true),
    ...timestamps,
  },
  (table) => [
    index("products_category_id_idx").on(table.categoryId),
    check("products_price_non_negative", sql`${table.priceCents} >= 0`),
    check(
      "products_compare_at_above_price",
      sql`${table.compareAtPriceCents} IS NULL OR ${table.compareAtPriceCents} > ${table.priceCents}`,
    ),
    check(
      "products_label_complete",
      sql`(${table.labelText} IS NULL) = (${table.labelTone} IS NULL)`,
    ),
  ],
);

/** Units available to ship, kept apart from catalog copy so orders can update it on its own. */
export const productStock = pgTable(
  "product_stock",
  {
    productId: integer("product_id")
      .primaryKey()
      .references(() => products.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull().default(0),
    updatedAt: timestamps.updatedAt,
  },
  (table) => [check("product_stock_quantity_non_negative", sql`${table.quantity} >= 0`)],
);

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, { fields: [products.categoryId], references: [categories.id] }),
  stock: one(productStock),
}));

export const productStockRelations = relations(productStock, ({ one }) => ({
  product: one(products, { fields: [productStock.productId], references: [products.id] }),
}));
