import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";
import { navigation, site } from "@/lib/catalog";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

export function AnnouncementBar() {
  return (
    <div data-surface="dark" className="bg-ink text-on-chrome">
      <p className="container-page py-2.5 text-center text-sm font-medium">
        Free shipping on orders over ${site.freeShippingThreshold}
        <span className="hidden sm:inline">. </span>
        <Link
          href="/collections/deals"
          className="hidden underline underline-offset-4 hover:text-accent sm:inline"
        >
          Shop autumn deals
        </Link>
      </p>
    </div>
  );
}

export function SiteHeader() {
  const cartCount = 0;

  return (
    <header data-surface="dark" className="sticky top-0 z-40 bg-chrome text-on-chrome">
      <div className="container-page flex h-header items-center gap-4 lg:gap-8">
        <MobileNav items={navigation} />
        <Logo className="shrink-0" />

        <nav aria-label="Main" className="hidden flex-1 lg:block">
          <ul className="flex items-center gap-1 xl:gap-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded-button px-2.5 py-2 text-sm transition-colors hover:bg-chrome-raised ${
                    item.featured ? "text-accent" : "text-on-chrome-muted hover:text-on-chrome"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <Link
            href="/search"
            className="btn btn-icon gap-2 text-on-chrome-muted hover:text-on-chrome xl:min-w-40 xl:justify-start xl:border-chrome-line xl:px-3"
          >
            <Search aria-hidden="true" />
            <span className="sr-only xl:not-sr-only xl:text-sm">Search</span>
          </Link>
          <Link
            href="/account"
            className="btn btn-icon hidden text-on-chrome-muted hover:text-on-chrome sm:inline-flex"
          >
            <User aria-hidden="true" />
            <span className="sr-only">Account</span>
          </Link>
          <Link
            href="/cart"
            className="btn btn-icon relative -mr-2.5 text-on-chrome-muted hover:text-on-chrome"
          >
            <ShoppingBag aria-hidden="true" />
            <span className="sr-only">Cart, {cartCount} items</span>
            <span aria-hidden="true" className="badge-accent absolute top-1 right-0.5 min-w-5 justify-center rounded-full">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
