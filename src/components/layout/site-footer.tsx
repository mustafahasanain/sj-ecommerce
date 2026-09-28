import Link from "next/link";
import { footerLinks, site } from "@/lib/catalog";
import { NewsletterForm } from "../home/newsletter-form";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer data-surface="dark" className="bg-chrome text-on-chrome-muted">
      <div className="container-page grid gap-12 py-section lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <Logo className="text-on-chrome" />
          <p className="max-w-sm">{site.tagline}</p>
          <div className="mt-2 max-w-md">
            <h2 className="text-h4 text-on-chrome">Get 10% off your first order</h2>
            <p className="mt-2 text-sm">
              Product launches, setup guides and member-only deals. No spam.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
          {footerLinks.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="text-sm font-semibold text-on-chrome">{group.heading}</h2>
              <ul className="mt-4 flex flex-col gap-3 text-sm">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="link-inverse">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-chrome-line">
        <div className="container-page flex flex-col gap-3 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href="/policies/privacy" className="link-inverse">Privacy</Link>
            </li>
            <li>
              <Link href="/policies/terms" className="link-inverse">Terms</Link>
            </li>
            <li>
              <Link href="/policies/accessibility" className="link-inverse">Accessibility</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
