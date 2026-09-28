import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-prose flex flex-col items-start gap-5 py-section">
      <p className="eyebrow text-primary">Error 404</p>
      <h1 className="text-h1">We couldn&apos;t find that page</h1>
      <p className="text-lg text-ink-muted">
        The link may be out of date, or the product is no longer in our catalog.
      </p>
      <Link href="/" className="btn btn-primary mt-2">
        Back to the store
      </Link>
    </section>
  );
}
