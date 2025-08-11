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
   DATA (mock)
   =========================== */

const heroSlides = [
  {
    id: 1,
    eyebrow: "30% OFF TODAY",
    title: "Spring Collections",
    cta: "Shop Now",
    image:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 2,
    eyebrow: "FRESH BLOOMS",
    title: "Inspired By Nature",
    cta: "Shop Now",
    image:
      "https://images.unsplash.com/photo-1435783459217-ee7fe5414abe?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 3,
    eyebrow: "NEW ARRIVALS",
    title: "Elegant Flower",
    cta: "Shop Now",
    image:
      "https://images.unsplash.com/photo-1503435824048-a799a3a84bf7?q=80&w=1600&auto=format&fit=crop",
  },
];

const categories = [
  { name: "BESKOPE" }, // así como lo pediste
  { name: "CUMPLEAÑOS" },
  { name: "DÍA SIGUIENTE" },
  { name: "PLANES" },
  { name: "BODAS" },
  { name: "DÍA DE LAS MADRES" },
  { name: "DÍA DE MUERTOS" },
];

/* Fotos de flores -> estilo catálogo (fondo claro).
   Si luego quieres, movemos estas imágenes a /public/flowers y las servimos locales. */
const products = [
  {
    id: 101,
    name: "Love Story",
    price: 135,
    images: [
      "https://images.unsplash.com/photo-1491002052546-bf38f186af56?q=80&w=1400&auto=format&fit=crop", // tulipanes
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    id: 102,
    name: "Winifred",
    price: 100,
    images: [
      "https://images.unsplash.com/photo-1509043759401-136742328bb3?q=80&w=1400&auto=format&fit=crop", // ramo rosa
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    id: 103,
    name: "Elegant Flower",
    price: 120,
    images: [
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=1400&auto=format&fit=crop", // orquídeas
      "https://images.unsplash.com/photo-1519681395604-b2b7b3d29747?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    id: 104,
    name: "Love You",
    price: 200,
    images: [
      "https://images.unsplash.com/photo-1491554150235-3603d2d4e9a7?q=80&w=1400&auto=format&fit=crop", // rosas rojas
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    id: 105,
    name: "Sun Light",
    price: 100,
    images: [
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1400&auto=format&fit=crop", // flores amarillas
      "https://images.unsplash.com/photo-1436891620584-47fd0e565afb?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    id: 106,
    name: "Lovely",
    price: 200,
    badge: "-40%",
    images: [
      "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?q=80&w=1400&auto=format&fit=crop", // ramo mix
      "https://images.unsplash.com/photo-1458538977777-0549b2370168?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    id: 107,
    name: "Scarlet Flower",
    price: 60,
    compareAt: 90,
    images: [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1400&auto=format&fit=crop", // rojo sobre claro
      "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=1400&auto=format&fit=crop",
    ],
  },
  {
    id: 108,
    name: "Pure White",
    price: 85,
    images: [
      "https://images.unsplash.com/photo-1519681395604-b2b7b3d29747?q=80&w=1400&auto=format&fit=crop", // blanco
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
            {/* LOGO */}
            <a className="text-2xl font-semibold tracking-tight" href="#">CUSIFLORES</a>
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
      {/* Slide */}
     
