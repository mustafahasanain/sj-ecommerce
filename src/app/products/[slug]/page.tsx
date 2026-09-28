import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Price } from "@/components/product/price";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductGridSection } from "@/components/product/product-grid-section";
import { PurchasePanel } from "@/components/product/purchase-panel";
import { Rating } from "@/components/product/rating";
import { StockStatus } from "@/components/product/stock-status";
import { site } from "@/lib/catalog";
import {
  formatPrice,
  getCategoryName,
  getProduct,
  getProductBadges,
  getRelatedProducts,
  getStockState,
  products,
  type Product,
} from "@/lib/products";

const MAX_PER_ORDER = 10;

// Only catalog products exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.summary,
    openGraph: {
      title: product.name,
      description: product.summary,
      images: [{ url: product.images[0].src, alt: product.images[0].alt }],
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const categoryName = getCategoryName(product.category);
  const categoryHref = `/collections/${product.category}`;
  const stockState = getStockState(product);
  const soldOut = stockState === "out-of-stock";
  const savings = product.compareAtPrice ? product.compareAtPrice - product.price : 0;
  const warranty = formatWarranty(product.specs.find((spec) => spec.label === "Warranty")?.value);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(product, categoryName) }}
      />

      <div className="container-page pt-6 pb-section md:pt-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: categoryName, href: categoryHref },
            { label: product.name },
          ]}
        />

        <div className="mt-6 grid gap-10 md:mt-8 lg:grid-cols-12 lg:gap-14 xl:gap-20">
          {/* The gallery is the shorter column, so it's the one that stays in view. */}
          <div className="lg:sticky lg:top-[calc(var(--spacing-header)+2rem)] lg:col-span-7 lg:self-start">
            <ProductGallery
              images={product.images}
              badges={getProductBadges(product)}
              dimmed={soldOut}
            />
          </div>

          <div className="flex flex-col gap-6 lg:col-span-5">
            <div>
              <Link href={categoryHref} className="eyebrow text-primary hover:underline">
                {categoryName}
              </Link>
              <h1 className="mt-3 text-h1">{product.name}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                <Rating value={product.rating} count={product.reviewCount} />
                <span aria-hidden="true" className="h-4 w-px bg-line-strong" />
                <span className="text-ink-muted">SKU {product.sku}</span>
              </div>
            </div>

            <p className="text-lg text-ink-muted">{product.summary}</p>

            <div className="flex flex-col gap-3 border-y border-line py-6">
              <div className="flex flex-wrap items-center gap-3">
                <Price
                  price={product.price}
                  compareAtPrice={product.compareAtPrice}
                  className="text-h2 font-medium"
                />
                {savings > 0 && (
                  <span className="badge badge-sale">
                    Save {formatPrice(savings)} ({Math.round((savings / product.compareAtPrice!) * 100)}%)
                  </span>
                )}
              </div>
              <p className="text-sm text-ink-muted">
                {product.price >= site.freeShippingThreshold
                  ? "Free shipping included. Taxes calculated at checkout."
                  : `Free shipping on orders over $${site.freeShippingThreshold}. Taxes calculated at checkout.`}
              </p>
              <StockStatus product={product} className="mt-1" />
            </div>

            <PurchasePanel
              productName={product.name}
              maxQuantity={Math.min(product.stock, MAX_PER_ORDER)}
            />

            <ul className="flex flex-col gap-2.5">
              {product.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                    <Check aria-hidden="true" className="size-3.5" strokeWidth={2.5} />
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>

            <ul className="divide-y divide-line rounded-card bg-surface text-sm">
              <Assurance icon={Truck} title="Free, fast shipping">
                On every order over ${site.freeShippingThreshold}, tracked to your door
              </Assurance>
              {warranty && (
                <Assurance icon={ShieldCheck} title={warranty}>
                  Hardware replacement and expert support included
                </Assurance>
              )}
              <Assurance icon={RotateCcw} title="30-day returns">
                Not the right fit? Send it back for a full refund
              </Assurance>
            </ul>
          </div>
        </div>
      </div>

      <section className="section-y bg-surface" aria-labelledby="details-heading">
        <h2 id="details-heading" className="sr-only">
          Product details
        </h2>
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow text-primary">Overview</p>
            <h3 className="mt-3 text-h2">About {product.name}</h3>
            <p className="mt-5 text-lg text-ink-muted">{product.description}</p>
          </div>

          <div className="lg:col-span-7">
            <p className="eyebrow text-primary">Specifications</p>
            <h3 className="mt-3 text-h2">Technical details</h3>
            <dl className="mt-5 border-t border-line-strong">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="grid gap-1 border-b border-line py-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-6"
                >
                  <dt className="text-sm font-medium text-ink-muted sm:text-base">{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <ProductGridSection
        eyebrow={`More in ${categoryName}`}
        title="You may also like"
        href={categoryHref}
        products={getRelatedProducts(product)}
      />
    </>
  );
}

function Assurance({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Truck;
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="flex gap-3.5 p-4">
      <Icon aria-hidden="true" className="size-5 shrink-0 text-primary" strokeWidth={1.75} />
      <div>
        <p className="font-medium text-ink">{title}</p>
        <p className="mt-0.5 text-ink-muted">{children}</p>
      </div>
    </li>
  );
}

/** "3 years" -> "3-year warranty", "Lifetime" -> "Lifetime warranty". */
function formatWarranty(value?: string) {
  if (!value) return undefined;
  const years = value.match(/^(\d+) years?$/);
  return years ? `${years[1]}-year warranty` : `${value} warranty`;
}

const schemaAvailability = {
  "in-stock": "https://schema.org/InStock",
  "low-stock": "https://schema.org/LimitedAvailability",
  "out-of-stock": "https://schema.org/OutOfStock",
} as const;

function toJsonLd(product: Product, categoryName: string) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    description: product.description,
    category: categoryName,
    image: product.images.map((image) => image.src),
    brand: { "@type": "Brand", name: site.name },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      price: product.price.toFixed(2),
      priceCurrency: "USD",
      availability: schemaAvailability[getStockState(product)],
    },
  };

  // Escape "<" so product copy can never close the script tag.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
