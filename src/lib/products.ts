/*
 * Sample product catalog used until products live in the database.
 * Photos are from Unsplash (https://unsplash.com/license); extra gallery shots
 * are focal-point crops of the same photo plus an in-context scene.
 */

import { unsplash } from "./unsplash";

export const categories = {
  "wifi-mesh": { name: "Wi-Fi & Mesh" },
  switching: { name: "Switching" },
  security: { name: "Security" },
  "smart-home": { name: "Smart Home" },
  accessories: { name: "Cabling & Accessories" },
} as const;

export type CategorySlug = keyof typeof categories;

export type BadgeTone = "sale" | "new" | "primary" | "neutral";
export type Badge = { label: string; tone: BadgeTone };

export type ProductImage = { src: string; alt: string };

export type Product = {
  slug: string;
  sku: string;
  name: string;
  category: CategorySlug;
  summary: string;
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  price: number;
  compareAtPrice?: number;
  /** Units available to ship; 0 means out of stock. */
  stock: number;
  rating: number;
  reviewCount: number;
  /** First image is the primary shot used on cards. */
  images: ProductImage[];
  /** Merchandising label shown next to any sale badge. */
  label?: Badge;
};

export const LOW_STOCK_THRESHOLD = 5;

const square = (id: string, focus?: { x: number; y: number; zoom: number }) =>
  unsplash(id, { width: 1200, height: 1200, focus });

const scenes = {
  homeOffice: "1600494603989-9650cf6ddd3d",
  livingRoom: "1613575831056-0acd5da8f085",
  serverRoom: "1695668548342-c0c1ad479aee",
  cameras: "1589935447067-5531094415d1",
  cables: "1683322499436-f4383dd59f5a",
};

export const products: Product[] = [
  {
    slug: "aero-tri-band-router",
    sku: "SJ-AR7-TB",
    name: "Aero Tri-Band",
    category: "wifi-mesh",
    summary: "Wi-Fi 7 tri-band router with 10G WAN and adaptive RGB status light",
    description:
      "Aero Tri-Band puts a dedicated 6 GHz band to work for your fastest devices while 2.4 and 5 GHz handle everything else. Four high-gain antennas and a 10G WAN port mean multi-gig fiber plans reach every room without a bottleneck, and the status light shifts color so you can see network health at a glance.",
    highlights: [
      "Tri-band Wi-Fi 7 up to 19 Gbps combined",
      "10G WAN plus four 2.5G LAN ports",
      "Covers up to 3,000 sq ft on its own",
      "Pairs with any Aero node to form a mesh",
    ],
    specs: [
      { label: "Wi-Fi standard", value: "Wi-Fi 7 (802.11be)" },
      { label: "Bands", value: "2.4 GHz, 5 GHz, 6 GHz" },
      { label: "Ports", value: "1 × 10G WAN, 4 × 2.5G LAN, 1 × USB 3.0" },
      { label: "Coverage", value: "Up to 3,000 sq ft" },
      { label: "Dimensions", value: "240 × 160 × 48 mm" },
      { label: "Warranty", value: "3 years" },
    ],
    price: 279.99,
    stock: 42,
    rating: 4.8,
    reviewCount: 64,
    images: [
      { src: square("1733810763720-4c83af0668ea"), alt: "White router with four glowing antennas" },
      {
        src: square("1733810763720-4c83af0668ea", { x: 0.5, y: 0.78, zoom: 2 }),
        alt: "Close-up of the router's illuminated front edge",
      },
      { src: square(scenes.livingRoom), alt: "Sunlit living room with a desk by the window" },
    ],
    label: { label: "New", tone: "new" },
  },
  {
    slug: "aero-mesh-duo",
    sku: "SJ-AM6-2PK",
    name: "Aero Mesh Duo",
    category: "wifi-mesh",
    summary: "Two-pack dual-band mesh system covering up to 4,500 sq ft",
    description:
      "Two slim Aero nodes blanket a multi-storey home in one seamless network. Devices hand off between nodes automatically as you move, so video calls and streams keep going from the office to the garden.",
    highlights: [
      "Seamless roaming on a single network name",
      "Covers up to 4,500 sq ft with two nodes",
      "Gigabit Ethernet backhaul on every node",
      "Set up in minutes from the SJ app",
    ],
    specs: [
      { label: "Wi-Fi standard", value: "Wi-Fi 6 (802.11ax)" },
      { label: "Bands", value: "2.4 GHz, 5 GHz" },
      { label: "Ports per node", value: "2 × Gigabit Ethernet" },
      { label: "Coverage", value: "Up to 4,500 sq ft (2 nodes)" },
      { label: "In the box", value: "2 nodes, 2 power adapters, 1 Ethernet cable" },
      { label: "Warranty", value: "3 years" },
    ],
    price: 169.99,
    compareAtPrice: 199.99,
    stock: 4,
    rating: 4.6,
    reviewCount: 212,
    images: [
      {
        src: square("1750712263185-edde9f359e33", { x: 0.55, y: 0.62, zoom: 1.1 }),
        alt: "Compact grey mesh node with folding antennas on a wooden desk",
      },
      {
        src: square("1750712263185-edde9f359e33", { x: 0.72, y: 0.66, zoom: 2 }),
        alt: "Close-up of the mesh node's side vents and antenna hinge",
      },
      { src: square(scenes.homeOffice), alt: "Home office with a wooden desk and green walls" },
    ],
  },
  {
    slug: "vista-dome-camera",
    sku: "SJ-VD4K-OUT",
    name: "Vista Dome 4K",
    category: "security",
    summary: "Weatherproof 4K PoE camera with color night vision",
    description:
      "Vista Dome 4K watches driveways, loading bays and storefronts in sharp detail day and night. A single PoE cable carries power and data, and footage records locally so nothing leaves your premises unless you want it to.",
    highlights: [
      "4K resolution with 120 dB true WDR",
      "Color night vision up to 30 m",
      "IP67 weatherproof, IK10 vandal resistant",
      "Local recording, no subscription required",
    ],
    specs: [
      { label: "Resolution", value: "3840 × 2160 (8 MP)" },
      { label: "Field of view", value: "110° horizontal" },
      { label: "Power", value: "PoE (802.3af) or 12 V DC" },
      { label: "Storage", value: "microSD up to 512 GB, NVR compatible" },
      { label: "Rating", value: "IP67, IK10" },
      { label: "Warranty", value: "3 years" },
    ],
    price: 129.99,
    stock: 0,
    rating: 4.7,
    reviewCount: 38,
    images: [
      { src: square("1528312635006-8ea0bc49ec63"), alt: "White dome security camera mounted on a post" },
      {
        src: square("1528312635006-8ea0bc49ec63", { x: 0.62, y: 0.62, zoom: 2 }),
        alt: "Close-up of the dome camera's lens housing",
      },
      { src: square(scenes.cameras), alt: "Security cameras mounted on a pole against a blue sky" },
    ],
    label: { label: "New", tone: "new" },
  },
  {
    slug: "home-starter-kit",
    sku: "SJ-HSK-3",
    name: "Home Starter Kit",
    category: "smart-home",
    summary: "Indoor camera, smart plug and bulb that set up in minutes",
    description:
      "Everything you need to start a connected home in one box. The camera, plug and bulb join your Wi-Fi in minutes and work together through routines, like lights on when motion is detected after sunset.",
    highlights: [
      "2K indoor camera with privacy shutter",
      "Smart plug with energy monitoring",
      "Tunable white LED bulb, 800 lumens",
      "Works with major voice assistants",
    ],
    specs: [
      { label: "Includes", value: "1 camera, 1 smart plug, 1 bulb" },
      { label: "Connectivity", value: "2.4 GHz Wi-Fi" },
      { label: "Camera", value: "2K, 105° field of view, two-way audio" },
      { label: "Plug rating", value: "15 A, 1800 W max" },
      { label: "Bulb", value: "E26, 9 W, 2700–6500 K" },
      { label: "Warranty", value: "2 years" },
    ],
    price: 89.99,
    compareAtPrice: 119.99,
    stock: 18,
    rating: 4.5,
    reviewCount: 97,
    images: [
      { src: square("1730967844913-29eb5cae5f34"), alt: "Indoor camera, smart plug and light bulb on a white table" },
      {
        src: square("1730967844913-29eb5cae5f34", { x: 0.5, y: 0.45, zoom: 1.8 }),
        alt: "Close-up of the indoor camera beside the smart plug",
      },
      { src: square(scenes.livingRoom), alt: "Sunlit living room with a desk by the window" },
    ],
  },
  {
    slug: "powerhub-7",
    sku: "SJ-PH7",
    name: "PowerHub 7",
    category: "accessories",
    summary: "Seven-port powered hub with individual port switches",
    description:
      "PowerHub 7 turns one port into seven, each with its own switch so you can power down drives and chargers without unplugging them. An included adapter keeps every port at full power.",
    highlights: [
      "Seven USB 3.0 ports at 5 Gbps",
      "Individual power switch for every port",
      "Includes 36 W power adapter",
    ],
    specs: [
      { label: "Ports", value: "7 × USB-A 3.0" },
      { label: "Data rate", value: "Up to 5 Gbps" },
      { label: "Power", value: "36 W external adapter" },
      { label: "Cable", value: "1 m USB-A to host" },
      { label: "Warranty", value: "2 years" },
    ],
    price: 39.99,
    stock: 120,
    rating: 4.4,
    reviewCount: 151,
    images: [
      { src: square("1760376789487-994070337c76"), alt: "Black seven-port hub with a switch for each port" },
      {
        src: square("1760376789487-994070337c76", { x: 0.5, y: 0.5, zoom: 2.2 }),
        alt: "Close-up of the hub's port switches",
      },
      { src: square(scenes.homeOffice), alt: "Home office with a wooden desk and green walls" },
    ],
  },
  {
    slug: "vista-mini-indoor",
    sku: "SJ-VM2K-IN",
    name: "Vista Mini",
    category: "security",
    summary: "Compact 2K indoor camera with two-way audio",
    description:
      "Vista Mini keeps an eye on the nursery, the front hall or the stockroom. It's small enough to sit on a shelf or mount on a wall, and sends a clip to your phone the moment it spots a person.",
    highlights: [
      "2K resolution with 4× digital zoom",
      "Person detection with instant alerts",
      "Two-way audio with noise reduction",
    ],
    specs: [
      { label: "Resolution", value: "2560 × 1440 (4 MP)" },
      { label: "Field of view", value: "120° diagonal" },
      { label: "Connectivity", value: "2.4 GHz Wi-Fi" },
      { label: "Storage", value: "microSD up to 256 GB" },
      { label: "Warranty", value: "2 years" },
    ],
    price: 49.99,
    stock: 3,
    rating: 4.3,
    reviewCount: 83,
    images: [
      { src: square("1549109926-58f039549485"), alt: "Small white camera mounted on a textured wall" },
      {
        src: square("1549109926-58f039549485", { x: 0.45, y: 0.5, zoom: 2 }),
        alt: "Close-up of the camera's lens and status light",
      },
      { src: square(scenes.homeOffice), alt: "Home office with a wooden desk and green walls" },
    ],
    label: { label: "Recommended", tone: "primary" },
  },
  {
    slug: "aero-home-ax3000",
    sku: "SJ-AH6-3000",
    name: "Aero Home AX3000",
    category: "wifi-mesh",
    summary: "Dual-band Wi-Fi 6 router for apartments and small homes",
    description:
      "An easy upgrade from the router your provider gave you. Aero Home AX3000 handles dozens of devices at once, and parental controls and a guest network are built right into the app.",
    highlights: [
      "Wi-Fi 6 up to 3 Gbps combined",
      "Handles 40+ connected devices",
      "Parental controls and guest Wi-Fi included",
    ],
    specs: [
      { label: "Wi-Fi standard", value: "Wi-Fi 6 (802.11ax)" },
      { label: "Bands", value: "2.4 GHz, 5 GHz" },
      { label: "Ports", value: "1 × Gigabit WAN, 3 × Gigabit LAN" },
      { label: "Coverage", value: "Up to 1,800 sq ft" },
      { label: "Warranty", value: "3 years" },
    ],
    price: 79.99,
    compareAtPrice: 99.99,
    stock: 64,
    rating: 4.7,
    reviewCount: 1284,
    images: [
      { src: square("1606904825846-647eb07f5be2"), alt: "White router with two antennas and a blue cable plugged in" },
      {
        src: square("1606904825846-647eb07f5be2", { x: 0.55, y: 0.62, zoom: 2 }),
        alt: "Close-up of the router's rear Ethernet ports",
      },
      { src: square(scenes.livingRoom), alt: "Sunlit living room with a desk by the window" },
    ],
  },
  {
    slug: "core-24-managed-switch",
    sku: "SJ-CS24-SFP",
    name: "Core 24",
    category: "switching",
    summary: "24-port gigabit managed switch with 4 SFP+ uplinks",
    description:
      "Core 24 is the backbone for a growing office: 24 gigabit ports for desks, phones and access points, plus four 10G SFP+ uplinks to your router or storage. VLANs, QoS and link aggregation are configured from the same dashboard as the rest of your network.",
    highlights: [
      "24 × Gigabit RJ45 plus 4 × 10G SFP+",
      "Layer 2+ management with VLAN and QoS",
      "Fanless design for silent operation",
      "19-inch rack mount kit included",
    ],
    specs: [
      { label: "Ports", value: "24 × Gigabit RJ45, 4 × 10G SFP+" },
      { label: "Switching capacity", value: "128 Gbps" },
      { label: "Management", value: "Web UI, CLI, SJ Cloud" },
      { label: "Mounting", value: "Desktop or 19-inch rack (1U)" },
      { label: "Power", value: "Internal 100–240 V AC, 18 W max" },
      { label: "Warranty", value: "5 years" },
    ],
    price: 349.99,
    stock: 9,
    rating: 4.9,
    reviewCount: 176,
    images: [
      { src: square("1544197150-b99a580bb7a8"), alt: "Patch panel with blue and grey ethernet cables connected" },
      {
        src: square("1544197150-b99a580bb7a8", { x: 0.4, y: 0.45, zoom: 2 }),
        alt: "Close-up of numbered switch ports with cables attached",
      },
      { src: square(scenes.serverRoom), alt: "Rows of server racks in a data center" },
    ],
    label: { label: "Recommended", tone: "primary" },
  },
  {
    slug: "cat6a-patch-cable",
    sku: "SJ-C6A-RED",
    name: "Cat6A Patch Cable",
    category: "accessories",
    summary: "Shielded 10G patch cable, snagless boot, 3 ft to 50 ft",
    description:
      "A shielded Cat6A cable rated for 10G at full 100 m runs. Snagless boots protect the latch when you pull a bundle through a rack, and the pure copper conductors keep speeds consistent.",
    highlights: [
      "Rated for 10 Gbps up to 100 m",
      "S/FTP shielding against interference",
      "Snagless boots protect the latch",
    ],
    specs: [
      { label: "Category", value: "Cat6A S/FTP" },
      { label: "Bandwidth", value: "500 MHz" },
      { label: "Conductor", value: "26 AWG pure copper" },
      { label: "Lengths", value: "3, 7, 15, 25 and 50 ft" },
      { label: "Warranty", value: "Lifetime" },
    ],
    price: 8.99,
    stock: 500,
    rating: 4.8,
    reviewCount: 2310,
    images: [
      { src: square("1544985562-128e7b377a21"), alt: "Red ethernet cable connector on a white background" },
      {
        src: square("1544985562-128e7b377a21", { x: 0.62, y: 0.55, zoom: 2 }),
        alt: "Close-up of the RJ45 connector's gold contacts",
      },
      { src: square(scenes.cables), alt: "Bundles of blue ethernet cables fanning out in low light" },
    ],
  },
  {
    slug: "flat-ethernet-cable",
    sku: "SJ-C6-FLAT",
    name: "Flat Run Cable",
    category: "accessories",
    summary: "Low-profile Cat6 cable that tucks under rugs and trim",
    description:
      "When you can't drill, go flat. This low-profile Cat6 cable slides under doors, rugs and baseboards and stays put with the included adhesive clips.",
    highlights: [
      "Only 1.4 mm thin, fits under doors",
      "Gigabit speeds up to 50 m",
      "20 adhesive cable clips included",
    ],
    specs: [
      { label: "Category", value: "Cat6 U/UTP, flat" },
      { label: "Thickness", value: "1.4 mm" },
      { label: "Lengths", value: "10, 25 and 50 ft" },
      { label: "Warranty", value: "Lifetime" },
    ],
    price: 14.99,
    compareAtPrice: 19.99,
    stock: 27,
    rating: 4.6,
    reviewCount: 842,
    images: [
      { src: square("1578016980868-197203ff4b02"), alt: "Grey ethernet cable against a light grey background" },
      {
        src: square("1578016980868-197203ff4b02", { x: 0.55, y: 0.45, zoom: 2 }),
        alt: "Close-up of the cable's connector and boot",
      },
      { src: square(scenes.cables), alt: "Bundles of blue ethernet cables fanning out in low light" },
    ],
  },
];

const bySlug = new Map(products.map((product) => [product.slug, product]));

function pick(slugs: string[]) {
  return slugs.map((slug) => bySlug.get(slug)).filter((p): p is Product => p !== undefined);
}

export const newArrivals = pick([
  "aero-tri-band-router",
  "aero-mesh-duo",
  "vista-dome-camera",
  "home-starter-kit",
  "powerhub-7",
  "vista-mini-indoor",
]);

export const bestSellers = pick([
  "aero-home-ax3000",
  "core-24-managed-switch",
  "cat6a-patch-cable",
  "flat-ethernet-cable",
]);

export function getProduct(slug: string) {
  return bySlug.get(slug);
}

export function getCategoryName(slug: CategorySlug) {
  return categories[slug].name;
}

/** Same-category products first, then the rest of the catalog. */
export function getRelatedProducts(product: Product, limit = 4) {
  const others = products.filter((p) => p.slug !== product.slug);
  const sameCategory = others.filter((p) => p.category === product.category);
  const rest = others.filter((p) => p.category !== product.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

export type StockState = "in-stock" | "low-stock" | "out-of-stock";

export function getStockState(product: Product): StockState {
  if (product.stock <= 0) return "out-of-stock";
  if (product.stock <= LOW_STOCK_THRESHOLD) return "low-stock";
  return "in-stock";
}

/** Badges shown on the product image: sold out replaces everything else. */
export function getProductBadges(product: Product): Badge[] {
  if (getStockState(product) === "out-of-stock") {
    return [{ label: "Sold out", tone: "neutral" }];
  }

  const badges: Badge[] = [];
  if (product.compareAtPrice) {
    badges.push({ label: `-${formatPrice(product.compareAtPrice - product.price)}`, tone: "sale" });
  }
  if (product.label) badges.push(product.label);
  return badges;
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}
