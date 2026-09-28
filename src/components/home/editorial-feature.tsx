import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { editorial } from "@/lib/catalog";

export function EditorialFeature() {
  return (
    <section className="section-y bg-surface">
      <div className="container-page grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-panel sm:aspect-[16/10] lg:col-span-7 lg:aspect-[5/4]">
          <Image
            src={editorial.image}
            alt={editorial.imageAlt}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-6 lg:col-span-5">
          <p className="eyebrow text-primary">{editorial.eyebrow}</p>
          <h2 className="text-h1">{editorial.title}</h2>
          <p className="text-lg text-ink-muted">{editorial.body}</p>

          <ul className="flex flex-col gap-3">
            {editorial.points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                  <Check aria-hidden="true" className="size-4" strokeWidth={2.5} />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <dl className="grid grid-cols-2 gap-6 border-t border-line-strong pt-6">
            {editorial.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <dt className="text-sm text-ink-muted">{stat.label}</dt>
                <dd className="text-h2 order-first">{stat.value}</dd>
              </div>
            ))}
          </dl>

          <Link href="/solutions/small-business" className="btn btn-primary self-start">
            Plan your office network
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
