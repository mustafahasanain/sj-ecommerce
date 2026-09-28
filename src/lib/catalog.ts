/*
 * Sample storefront data used until the catalog lives in the database.
 * Photos are from Unsplash (https://unsplash.com/license).
 * Product data lives in ./products.ts.
 */

import { unsplash } from "./unsplash";

export type Collection = {
  slug: string;
  name: string;
  blurb: string;
  productCount: number;
  image: string;
  imageAlt: string;
};

export type Solution = {
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  rating: number;
};

export const site = {
  name: "SJ Networks",
  tagline: "Networking gear for homes, offices and everything in between.",
  freeShippingThreshold: 99,
};

export const navigation = [
  { label: "Wi-Fi & Mesh", href: "/collections/wifi-mesh" },
  { label: "Switching", href: "/collections/switching" },
  { label: "Security", href: "/collections/security" },
  { label: "Smart Home", href: "/collections/smart-home" },
  { label: "Accessories", href: "/collections/accessories" },
  { label: "Deals", href: "/collections/deals", featured: true },
];

export const hero = {
  eyebrow: "Autumn network refresh",
  title: "Faster, calmer Wi-Fi",
  highlight: "for every room you work in",
  body: "Mesh systems, managed switches and cabling that stay out of the way, and stay online. Save up to 25% on whole-home bundles this month.",
  image: unsplash("1558494949-ef010cbdcc31", 2400),
  imageAlt: "Neatly routed network cables in a dark server rack",
};

export const collections: Collection[] = [
  {
    slug: "wifi-mesh",
    name: "Wi-Fi & Mesh",
    blurb: "Whole-home coverage with Wi-Fi 7 routers and mesh nodes.",
    productCount: 24,
    image: unsplash("1745847768408-b7b83796cae6", 1600),
    imageAlt: "Close-up of a black wireless router with raised antennas",
  },
  {
    slug: "switching",
    name: "Switching",
    blurb: "Managed and unmanaged switches from 5 to 48 ports.",
    productCount: 31,
    image: unsplash("1594915440248-1e419eba6611"),
    imageAlt: "Fiber optic cables patched into a rack-mounted network switch",
  },
  {
    slug: "security",
    name: "Security",
    blurb: "Indoor and outdoor cameras with local recording.",
    productCount: 18,
    image: unsplash("1589935447067-5531094415d1"),
    imageAlt: "Two white security cameras mounted on a pole against a blue sky",
  },
  {
    slug: "accessories",
    name: "Cabling & Accessories",
    blurb: "Patch cables, hubs and power for a tidy setup.",
    productCount: 56,
    image: unsplash("1683322499436-f4383dd59f5a"),
    imageAlt: "Bundles of blue ethernet cables fanning out in low light",
  },
];

export const editorial = {
  eyebrow: "Designed for small business",
  title: "One network for the whole office",
  body: "Plan, install and manage every access point, switch and camera from a single dashboard. Add a floor or a new location without starting over.",
  points: [
    "Zero-touch setup from the mobile app",
    "Guest Wi-Fi and VLANs in a few clicks",
    "Remote monitoring with instant alerts",
  ],
  stats: [
    { value: "99.99%", label: "Uptime across managed sites" },
    { value: "15 min", label: "Average first-time setup" },
  ],
  image: unsplash("1631193816258-28b44b21e78b", 1800),
  imageAlt: "Open-plan office with rows of desks under pendant lights",
};

export const solutions: Solution[] = [
  {
    title: "Home & remote work",
    description: "Reliable video calls in every room, with parental controls built in.",
    href: "/solutions/home",
    image: unsplash("1600494603989-9650cf6ddd3d"),
    imageAlt: "Home office with a wooden desk and green walls",
  },
  {
    title: "Small business",
    description: "Secure staff and guest networks that scale as your team grows.",
    href: "/solutions/small-business",
    image: unsplash("1604328727766-a151d1045ab4"),
    imageAlt: "Two people working on laptops in a sunlit shared workspace",
  },
  {
    title: "Enterprise & IT",
    description: "Rack-ready switching and centralized control for multi-site teams.",
    href: "/solutions/enterprise",
    image: unsplash("1695668548342-c0c1ad479aee"),
    imageAlt: "Rows of server racks in a data center",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "We replaced three consumer routers with one mesh kit. Dead zones in the warehouse are gone and I haven't rebooted anything since.",
    name: "Dana R.",
    role: "Operations lead, retail",
    rating: 5,
  },
  {
    quote:
      "Setup took under twenty minutes. The app walked me through placing each node, which made the difference on a three-storey house.",
    name: "Marcus L.",
    role: "Homeowner",
    rating: 5,
  },
  {
    quote:
      "Clear specs, fair pricing and fast shipping. The Core 24 switch has become our default for every new client install.",
    name: "Priya S.",
    role: "Managed IT provider",
    rating: 4,
  },
];

export const footerLinks = [
  {
    heading: "Shop",
    links: [
      { label: "Wi-Fi & Mesh", href: "/collections/wifi-mesh" },
      { label: "Switching", href: "/collections/switching" },
      { label: "Security", href: "/collections/security" },
      { label: "Accessories", href: "/collections/accessories" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help center", href: "/support" },
      { label: "Order status", href: "/account/orders" },
      { label: "Shipping & returns", href: "/policies/shipping" },
      { label: "Warranty", href: "/policies/warranty" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Partners", href: "/partners" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
