import Link from "next/link";
import type { Product } from "@/lib/products";
import { ProductCard } from "./product-card";

type ProductGridSectionProps = {
  eyebrow: string;
  title: string;
  href: string;
  products: Product[];
};

export function ProductGridSection({ eyebrow, title, href, products }: ProductGridSectionProps) {
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="section-heading">
          <div>
            <p className="eyebrow text-primary">{eyebrow}</p>
            <h2 className="mt-3 text-h2">{title}</h2>
          </div>
          <Link href={href} className="btn btn-ghost self-start md:self-auto">
            View all
          </Link>
        </div>

        <ul className="grid-products">
          {products.map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
