import { Headset, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { site } from "@/lib/catalog";

const benefits = [
  {
    icon: Truck,
    title: "Free shipping",
    body: `On every order over $${site.freeShippingThreshold}`,
  },
  {
    icon: ShieldCheck,
    title: "3-year warranty",
    body: "Hardware covered from the day it arrives",
  },
  {
    icon: RotateCcw,
    title: "30-day returns",
    body: "Changed your mind? Send it back, free",
  },
  {
    icon: Headset,
    title: "Expert support",
    body: "Real network specialists, 7 days a week",
  },
];

export function Benefits() {
  return (
    <section aria-label="Why shop with us" className="border-b border-line">
      <ul className="container-page grid-features py-10 md:py-12">
        {benefits.map(({ icon: Icon, title, body }) => (
          <li key={title} className="flex gap-4">
            <Icon aria-hidden="true" className="size-7 shrink-0 text-primary" strokeWidth={1.5} />
            <div>
              <h2 className="text-base font-medium sm:text-lg">{title}</h2>
              <p className="mt-1 text-sm text-ink-muted">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
