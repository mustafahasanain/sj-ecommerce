import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { hero } from "@/lib/catalog";

export function Hero() {
  return (
    <section data-surface="dark" className="relative isolate overflow-hidden bg-chrome text-on-chrome">
      <Image
        src={hero.image}
        alt={hero.imageAlt}
        fill
        preload
        sizes="100vw"
        className="-z-10 object-cover object-[70%_center]"
      />
      {/* Scrim keeps copy legible: solid on phones, fades to the photo on wide screens. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-chrome via-chrome/80 to-chrome/30 md:bg-linear-to-r md:from-chrome md:via-chrome/75 md:to-transparent"
      />

      <div className="container-page flex min-h-[34rem] flex-col justify-end gap-6 pt-40 pb-14 md:min-h-[38rem] md:justify-center md:py-24 lg:min-h-[42rem]">
        <span className="eyebrow self-start bg-white/10 px-4 py-3 text-accent backdrop-blur-sm">
          {hero.eyebrow}
        </span>
        <h1 className="text-display max-w-2xl text-on-chrome">
          {hero.title}
          <span className="block text-accent">{hero.highlight}</span>
        </h1>
        <p className="max-w-xl text-lg text-on-chrome-muted">{hero.body}</p>
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <Link href="/collections/deals" className="btn btn-primary">
            Shop the refresh
            <ArrowRight aria-hidden="true" />
          </Link>
          <Link
            href="/collections/wifi-mesh"
            className="btn border-white/50 text-on-chrome hover:border-on-chrome hover:bg-white/10"
          >
            Explore mesh Wi-Fi
          </Link>
        </div>
      </div>
    </section>
  );
}
