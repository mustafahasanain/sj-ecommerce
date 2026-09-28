"use client";

import { useState } from "react";
import { Bell, Check, Heart, Minus, Plus, ShoppingBag } from "lucide-react";

type PurchasePanelProps = {
  productName: string;
  /** Most units a shopper can add in one go; 0 when out of stock. */
  maxQuantity: number;
};

// Front-end only for now: confirms locally until the cart and waitlist are wired up.
export function PurchasePanel({ productName, maxQuantity }: PurchasePanelProps) {
  const [quantity, setQuantity] = useState(1);
  const [saved, setSaved] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const soldOut = maxQuantity === 0;

  const clamp = (value: number) => Math.min(Math.max(value, 1), maxQuantity);

  const wishlistButton = (
    <button
      type="button"
      aria-pressed={saved}
      onClick={() => setSaved((value) => !value)}
      className="btn btn-secondary btn-icon min-h-12 min-w-12"
    >
      <Heart aria-hidden="true" className={saved ? "fill-current" : undefined} />
      <span className="sr-only">Save to wishlist</span>
    </button>
  );

  if (soldOut) {
    return (
      <form
        className="flex flex-col gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          setStatus("You're on the list. We'll email you as soon as it's back in stock.");
        }}
      >
        <label htmlFor="waitlist-email" className="text-sm font-medium">
          Get an email when it&apos;s back
        </label>
        <input
          id="waitlist-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="input"
        />
        <div className="flex gap-3">
          <button type="submit" className="btn btn-primary flex-1">
            <Bell aria-hidden="true" />
            Notify me
          </button>
          {wishlistButton}
        </div>
        <StatusMessage message={status} />
      </form>
    );
  }

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        setStatus(`Added ${quantity} × ${productName} to your cart.`);
      }}
    >
      <label htmlFor="quantity" className="text-sm font-medium">
        Quantity
      </label>
      <div className="flex flex-wrap gap-3">
        <div className="flex h-12 items-center rounded-input border border-line-strong">
          <button
            type="button"
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
            onClick={() => setQuantity((value) => clamp(value - 1))}
            className="grid h-full w-10 place-items-center rounded-l-input text-ink-muted hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Minus aria-hidden="true" className="size-4" />
          </button>
          <input
            id="quantity"
            type="number"
            inputMode="numeric"
            min={1}
            max={maxQuantity}
            value={quantity}
            onChange={(event) => setQuantity(clamp(Number(event.target.value) || 1))}
            className="h-full w-10 bg-transparent text-center font-medium tabular [appearance:textfield] focus-visible:outline-offset-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button
            type="button"
            aria-label="Increase quantity"
            disabled={quantity >= maxQuantity}
            onClick={() => setQuantity((value) => clamp(value + 1))}
            className="grid h-full w-10 place-items-center rounded-r-input text-ink-muted hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus aria-hidden="true" className="size-4" />
          </button>
        </div>

        <button type="submit" className="btn btn-primary min-w-32 flex-1 px-4 sm:px-5.5">
          <ShoppingBag aria-hidden="true" />
          Add to cart
        </button>
        {wishlistButton}
      </div>
      <StatusMessage message={status} />
    </form>
  );
}

function StatusMessage({ message }: { message: string | null }) {
  return (
    <p role="status" className="min-h-6 text-sm">
      {message && (
        <span className="flex items-center gap-2 text-success">
          <Check aria-hidden="true" className="size-4" />
          {message}
        </span>
      )}
    </p>
  );
}
