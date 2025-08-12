// src/App.jsx
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Search,
  User,
  Gift,
  MapPin,
  ChevronRight,
  Smartphone,
  Truck,
} from "lucide-react";

/* ===========================
   DATA
   =========================== */

// Tus 4 fotos locales del slider
const heroSlides = [
  {
    id: 1,
    eyebrow: " ",
    title: "Colección Especial",
    cta: "Shop Now",
    image: "/slider/foto1.jpg",
    alt: "Colección Especial",
  },
  {
    id: 2,
    eyebrow: " ",
    title: "Nuevos Arreglos",
    cta: "Shop Now",
    image: "/slider/foto2.jpg",
    alt: "Nuevos Arreglos",
  },
  {
    id: 3,
    eyebrow: " ",
    title: "Flores Únicas",
    cta: "Shop Now",
    image: "/slider/foto3.jpg",
    alt: "Flores Únicas",
  },
  {
    id: 4,
    eyebrow: " ",
    title: "Edición Limitada",
    cta: "Shop Now",
    image: "/slider/foto4.jpg",
    alt: "Edición Limitada",
  },
];

const categories = [
  { name: "BESKOPE" },      // lo dejamos tal cual pediste
  { name: "CUMPLEAÑOS" },
  { name: "DÍA SIGUIENTE" },
  { name: "PLANES" },       // dime si querías PLANTAS
  { name: "BODAS" },
  { name: "DÍA DE LAS MADRES" },
  { name: "DÍA DE MUERTOS" },
];

// Productos con look catálogo (luego cambiamos por catálogo real si quieres)
const products = [
  {
    id: 101,
    name: "Love Story",
    price: 135,
    images: [
      "https://images.unsplash.com/photo-1491002052546-bf38f186af56?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    id: 102,
    name: "Winifred",
    price: 100,
    images: [
      "https://images.unsplash.com/photo-1509043759401-136742328bb3?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    id: 103,
    name: "Elegant Flower",
    price: 120,
    images: [
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519681395604-b2b7b3d29747?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    id: 104,
    name: "Love You",
    price: 200,
    images: [
      "https://images.unsplash.com/photo-1491554150235-3603d2d4e9a7?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    id: 105,
    name: "Sun Light",
    price: 100,
    images: [
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1436891620584-47fd0e565afb?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    id: 106,
    name: "Lovely",
    price: 200,
    badge: "-40%",
    images: [
      "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1458538977777-0549b2370168?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    id: 107,
    name: "Scarlet Flower",
    price: 60,
    compareAt: 90,
    images: [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    id: 108,
    name: "Pure White",
    price: 85,
    images: [
      "https://images.unsplash.com/photo-1519681395604-b2b7b3d29747?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547097465-8692e2f5a00b?q=80&w=1400&auto=format&fit=crop",
    ],
  },
];

/* ===========================
   UI PRIMITIVES
   =========================== */

function Container({ children }) {
  return <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>;
}

function TopBar() {
  return (
    <div className="w-full border-b border-gray-200 text-sm">
      <Container>
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3 text-gray-600">
            <a href="#" className="inline-flex items-center gap-2 hover:text-gray-900">
              <MapPin className="h-4 w-4" /> Find Store
            </a>
            <span className="hidden md:inline text-gray-300">|</span>
            <a href="tel:+1202333800" className="hover:text-gray-900">
              (+1)202-333-800
            </a>
          </div>
          <div className="flex items-center gap-4 text-gray-600">
            <a href="#" className="inline-flex items-center gap-2 hover:text-gray-900">
              <Gift className="h-4 w-4" /> Gift Cards
            </a>
            <a href="#" className="hover:text-gray-900">FAQs</a>
            <a href="#" className="hover:text-gray-900">Contact</a>
          </div>
        </div>
      </Container>
    </div>
  );
}

function Header() {
  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-100">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <a className="text-2xl font-semibold tracking-tight" href="#">
              CUSIFLORES
            </a>
            <nav className="hidden lg:flex items-center gap-6 text-sm text-gray-700">
              <a className="hover:text-gray-900" href="#">Home</a>
              <a className="hover:text-gray-900" href="#">Shop</a>
              <a className="hover:text-gray-900" href="#">Blog</a>
              <a className="hover:text-gray-900" href="#">About</a>
              <a className="hover:text-gray-900" href="#">Contact</a>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-full" aria-label="Search">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full" aria-label="Account">
              <User className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}

function Hero() {
  const [index, setIndex] = useState(0);
  const current = useMemo(() => heroSlides[index], [index]);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative">
      <div className="relative h-[60vh] lg:h-[78vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={current.id}
            src={current.image}
            className="absolute inset-0 h-full w-full object-cover"
            referrerPolicy="no-referrer"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            alt={current.alt || current.title}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        <Container>
          <div className="relative z-10 flex h-[60vh] lg:h-[78vh] items-center">
            <div className="max-w-xl text-white">
              {current.eyebrow?.trim() && (
                <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-widest ring-1 ring-white/30">
                  {current.eyebrow}
                </span>
              )}
              <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
                {current.title}
              </h1>
              <button className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-medium text-gray-900 shadow hover:shadow-md">
                {current.cta} <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

// Tarjeta con los 3 features (separada del slider)
function FeatureCard() {
  const items = [
    { t: "Order Online", d: "We’re at capacity for deliveries Monday 30th August", Icon: Smartphone },
    { t: "Our Stores",  d: "We have 4 stores located in the North West of Sydney", Icon: MapPin },
    { t: "Delivery",    d: "Order before 1pm Mon–Fri or 12pm Sat for same-day",  Icon: Truck },
  ];
  return (
    <section className="mt-8 md:mt-12">
      <Container>
        <div className="rounded-3xl bg-white/95 backdrop-blur shadow-xl ring-1 ring-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {items.map((f) => (
              <div key={f.t} className="flex items-start gap-4 p-6">
                <f.Icon className="h-8 w-8 text-pink-600" />
                <div>
                  <div className="text-lg font-semibold text-gray-900">{f.t}</div>
                  <div className="mt-1 text-sm text-gray-700 leading-6">{f.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

// SHOP BY OCCASION centrado
function OccasionGrid() {
  return (
    <section className="py-12 lg:py-16">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight uppercase text-center">
          SHOP BY OCCASION
        </h2>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {categories.map((c) => (
            <button
              key={c.name}
              className={`rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-300 hover:shadow ${
                c.name === "BESKOPE" ? "underline underline-offset-4" : ""
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}

// Tarjeta de producto tipo catálogo
function ProductCard({ p }) {
  const [hover, setHover] = useState(false);
  const img = hover && p.images[1] ? p.images[1] : p.images[0];
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative overflow-hidden rounded-2xl bg-white ring-1 ring-gray-100 shadow-sm"
    >
      {p.badge && (
        <span className="absolute left-3 top-3 z-10 rounded-md bg-black/80 px-2 py-1 text-xs font-semibold text-white">
          {p.badge}
        </span>
      )}
      <div className="aspect-square overflow-hidden bg-white">
        <img
          src={img}
          alt={p.name}
          loading="lazy"
          className="h-full w-full object-contain p-6 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900">{p.name}</h3>
        <div className="mt-1 flex items-center gap-2">
          <div className="text-base font-semibold">${p.price.toFixed(2)}</div>
          {p.compareAt && (
            <div className="text-sm text-gray-400 line-through">
              ${p.compareAt.toFixed(2)}
            </div>
          )}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button className="flex-1 rounded-xl bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-black">
            Add to cart
          </button>
          <button className="rounded-xl px-3 py-2 text-sm font-medium ring-1 ring-gray-300 hover:bg-gray-50">
            Quick View
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductGrid() {
  return (
    <section className="pb-6 pt-2 lg:pb-10">
      <Container>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-12">
      <Container>
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="text-2xl font-semibold">CUSIFLORES</div>
            <p className="mt-3 text-sm text-gray-600 max-w-xs">
              Sign up for the latest offers and exclusives.
            </p>
            <div className="mt-4 flex max-w-sm items-center gap-2">
              <input
                className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="Your email"
              />
              <button className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white">
                Join
              </button>
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              About us
            </div>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li><a href="#" className="hover:text-gray-900">Our Difference</a></li>
              <li><a href="#" className="hover:text-gray-900">Community Matters</a></li>
              <li><a href="#" className="hover:text-gray-900">Press</a></li>
              <li><a href="#" className="hover:text-gray-900">Blog</a></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Help
            </div>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li><a href="#" className="hover:text-gray-900">Flower Care</a></li>
              <li><a href="#" className="hover:text-gray-900">Shipping</a></li>
              <li><a href="#" className="hover:text-gray-900">Terms of Use</a></li>
              <li><a href="#" className="hover:text-gray-900">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Local
            </div>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li>Los Angeles</li>
              <li>San Francisco</li>
              <li>New York City</li>
              <li>Dallas</li>
              <li>Chicago</li>
              <li>Washington DC</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-xs text-gray-500">
          © {new Date().getFullYear()} CUSIFLORES. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

/* ===========================
   APP
   =========================== */

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <TopBar />
      <Header />
      <Hero />
      <FeatureCard />
      <OccasionGrid />
      <ProductGrid />
      <Footer />
    </div>
  );
}
