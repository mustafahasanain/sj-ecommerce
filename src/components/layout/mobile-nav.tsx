"use client";

import Link from "next/link";
import { useRef } from "react";
import { ChevronRight, Menu, X } from "lucide-react";
import { Logo } from "./logo";

type NavItem = { label: string; href: string; featured?: boolean };

export function MobileNav({ items }: { items: NavItem[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const open = () => {
    dialogRef.current?.showModal();
    closeButtonRef.current?.focus();
  };
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        className="btn btn-icon -ml-2.5 lg:hidden"
        aria-label="Open menu"
        onClick={open}
      >
        <Menu aria-hidden="true" />
      </button>

      {/* Native <dialog> gives focus trapping, Esc to close and an inert background. */}
      <dialog
        ref={dialogRef}
        aria-label="Main menu"
        data-surface="dark"
        className="m-0 h-dvh max-h-none w-[min(22rem,88vw)] max-w-none bg-chrome p-0 text-on-chrome backdrop:bg-black/50"
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
      >
        <div className="flex h-header items-center justify-between border-b border-chrome-line px-5">
          <Logo />
          <button
            ref={closeButtonRef}
            type="button"
            className="btn btn-icon -mr-2.5"
            aria-label="Close menu"
            onClick={close}
          >
            <X aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Main">
          <ul className="divide-y divide-chrome-line">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="flex items-center justify-between px-5 py-4 text-lg hover:bg-chrome-raised"
                >
                  <span className={item.featured ? "text-accent" : undefined}>
                    {item.label}
                  </span>
                  <ChevronRight aria-hidden="true" className="size-5 text-on-chrome-muted" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6 flex flex-col gap-3 px-5">
          <Link href="/account" onClick={close} className="btn btn-inverse btn-block">
            Sign in
          </Link>
          <Link href="/support" onClick={close} className="link-inverse py-2 text-center text-sm">
            Help & support
          </Link>
        </div>
      </dialog>
    </>
  );
}
