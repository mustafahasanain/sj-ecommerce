import { testimonials } from "@/lib/catalog";
import { Rating } from "../product/rating";

export function Testimonials() {
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="section-heading">
          <div>
            <p className="eyebrow text-primary">Customer reviews</p>
            <h2 className="mt-3 text-h2">Trusted in 40,000+ homes and offices</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-h2">4.8</span>
            <div>
              <Rating value={4.8} />
              <p className="mt-1 text-sm text-ink-muted">from 12,400 verified reviews</p>
            </div>
          </div>
        </div>

        <ul className="grid gap-grid md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <li key={testimonial.name}>
              <figure className="flex h-full flex-col gap-5 rounded-card border border-line p-6 sm:p-8">
                <Rating value={testimonial.rating} />
                <blockquote className="flex-1 text-lg leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="border-t border-line pt-5 text-sm">
                  <span className="block font-semibold">{testimonial.name}</span>
                  <span className="text-ink-muted">{testimonial.role}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
