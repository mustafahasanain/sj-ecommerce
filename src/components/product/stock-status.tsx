import { getStockState, type Product, type StockState } from "@/lib/products";

const stateStyle: Record<StockState, { dot: string; text: string }> = {
  "in-stock": { dot: "bg-success", text: "text-success" },
  "low-stock": { dot: "bg-warning", text: "text-warning" },
  "out-of-stock": { dot: "bg-sale", text: "text-sale" },
};

function describe(product: Product, state: StockState) {
  switch (state) {
    case "in-stock":
      return { label: "In stock", detail: "Ships in 1–2 business days" };
    case "low-stock":
      return { label: `Only ${product.stock} left`, detail: "Order soon, ships in 1–2 business days" };
    case "out-of-stock":
      return { label: "Out of stock", detail: "Join the waitlist and we'll email you when it's back" };
  }
}

export function StockStatus({ product, className = "" }: { product: Product; className?: string }) {
  const state = getStockState(product);
  const { label, detail } = describe(product, state);
  const style = stateStyle[state];

  return (
    <p className={`flex items-start gap-2.5 text-sm ${className}`}>
      <span className="relative mt-1.5 flex size-2.5 shrink-0" aria-hidden="true">
        {state === "low-stock" && (
          <span className={`absolute inset-0 animate-ping rounded-full opacity-60 ${style.dot}`} />
        )}
        <span className={`relative size-2.5 rounded-full ${style.dot}`} />
      </span>
      <span>
        <span className={`font-semibold ${style.text}`}>{label}</span>
        <span className="text-ink-muted"> · {detail}</span>
      </span>
    </p>
  );
}
