"use client";

import { useState } from "react";
import { Check } from "lucide-react";

// Front-end only for now: confirms locally until a mailing-list provider is wired up.
export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p role="status" className="mt-5 flex items-center gap-2 text-on-chrome">
        <Check aria-hidden="true" className="size-5 text-accent" />
        Thanks! Check your inbox for your discount code.
      </p>
    );
  }

  return (
    <form
      className="mt-5 flex flex-col gap-3 sm:flex-row"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="you@example.com"
        className="input flex-1 border-transparent bg-canvas"
      />
      <button type="submit" className="btn btn-primary">
        Subscribe
      </button>
    </form>
  );
}
