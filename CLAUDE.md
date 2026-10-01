@AGENTS.md

# Database conventions

- Schema changes: edit `src/db/schema.ts`, then `pnpm db:generate` and `pnpm db:migrate`. Commit the generated `drizzle/` files and never edit an applied migration. `db:push` is only for throwaway dev branches.
- Store money as integer cents (`*_cents` columns) and convert to dollars only in the query mapper.
- Stock lives in `product_stock` (1:1 with `products`), not as a column on `products`.
- Database reads go in `src/db/queries/` (`server-only`). `src/lib/products.ts` holds only types and pure helpers so client components can import it.
- Generate Better Auth tables into `src/db/auth-schema.ts` and re-export them from `schema.ts`. Never output them to `schema.ts`.
