import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { solutions } from "@/lib/catalog";

export function Solutions() {
  return (
    <section className="section-y bg-surface">
      <div className="container-page">
        <div className="section-heading">
          <div>
            <p className="eyebrow text-primary">Solutions</p>
            <h2 className="mt-3 text-h2">Built for the way you connect</h2>
          </div>
          <p className="max-w-md text-ink-muted">
            Not sure where to start? Pick your space and we&apos;ll recommend a setup.
          </p>
        </div>

        <ul className="grid gap-grid md:grid-cols-3">
          {solutions.map((solution) => (
            <li key={solution.href}>
              <Link href={solution.href} className="group flex h-full flex-col">
                <div className="relative aspect-[4/3] overflow-hidden rounded-card">
                  <Image
                    src={solution.image}
                    alt={solution.imageAlt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-[scale] duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-5 text-h3">{solution.title}</h3>
                <p className="mt-2 text-ink-muted">{solution.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-medium text-primary group-hover:underline">
                  Explore setups
                  <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
