import React, { useEffect, useMemo, useState } from "react";

/* ------------------------------ DATA ------------------------------ */

// Slider: usa tus 4 imágenes locales en public/slider/
const heroSlides = [
  { src: "/slider/foto1.jpg", headline: "Arreglos que dicen más", sub: "Entrega el mismo día en CDMX*" },
  { src: "/slider/foto2.jpg", headline: "Flores frescas, siempre", sub: "Diseños exclusivos Cusiflores" },
  { src: "/slider/foto3.jpg", headline: "Celebra cada momento", sub: "Cuidado y selección premium" },
  { src: "/slider/foto4.jpg", headline: "Envía amor en un ramo", sub: "Atención personalizada" },
];

// Shop by Occasion
const occasions = [
  "BESPOKE",
  "CUMPLEAÑOS",
  "DÍA SIGUIENTE",
  "PLANES",
  "EVENTOS",
  "BODAS",
  "DÍA DE MUERTOS",
];

// Productos: imágenes reales en public/products/
const products = [
  { id: 201, name: "Rosas amarillas (mini)", price: 120, img: "/products/producto-01.jpg" },
  { id: 202, name: "Diente de león con luz", price: 100, img: "/products/producto-02.jpg" },
  { id: 203, name: "Rosas naranja con verde", price: 135, img: "/products/producto-03.jpg" },
  { id: 204, name: "Cubeta rosa", price: 200, img: "/products/producto-04.jpg" },
  { id: 205, name: "Cubeta morada", price: 200, img: "/products/producto-05.jpg" },
  { id: 206, name: "Astromelias en maceta", price: 85,  img: "/products/producto-06.jpg" },
  { id: 207, name: "Arreglo grande 1", price: 260, img: "/products/producto-07.jpg" },
  { id: 208, name: "Arreglo grande 2", price: 260, img: "/products/producto-08.jpg" },
];

/* ---------------------------- UI BLOCKS --------------------------- */

function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        {/* LOGO (como pediste: CUSI) */}
        <a href="/" className="font-extrabold tracking-wide text-2xl">
          <span className="text-pink-600">CUSI</span>
        </a>

        {/* Sitemap: Home, Shop, Product, Blog, Page, Contact */}
        <nav className="hidden md:flex gap-6 text-sm text-neutral-700">
          <a href="#" className="hover:text-pink-600">Home</a>
          <a href="#products" className="hover:text-pink-600">Shop</a>
          <a href="#products" className="hover:text-pink-600">Product</a>
          <a href="#" className="hover:text-pink-600">Blog</a>
          <a href="#" className="hover:text-pink-600">Page</a>
          <a href="#contact" className="hover:text-pink-600">Contact</a>
        </nav>
      </div>
    </header>
  );
}

function HeroSlider() {
  const [i, setI] = useState(0);
  const slides = useMemo(() => heroSlides.filter(Boolean), []);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % slides.length), 5500);
    return () => clearInterval(id);
  }, [slides.length]);
  if (!slides.length) return null;
  const curr = slides[i];

  return (
    <section className="hero">
      <img src={curr.src} alt={curr.headline} className="hero-img" loading="eager" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-xl text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight drop-shadow">
              {curr.headline}
            </h1>
            <p className="mt-3 text-base sm:text-lg opacity-95">{curr.sub}</p>
            <div className="mt-6 flex gap-3">
              <a href="#products" className="btn-primary">Ver catálogo</a>
              <a href="#contact" className="btn-secondary">Cotizar personalizado</a>
            </div>
          </div>
        </div>
      </div>

      {/* dots */}
      <div className="hero-dots">
        {slides.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Ir al slide ${idx + 1}`}
            onClick={() => setI(idx)}
            className={`dot ${idx === i ? "active" : ""}`}
          />
        ))}
      </div>
    </section>
  );
}

function IconRow() {
  const items = [
    {
      title: "Order Online",
      text: "Capacidad limitada en días pico. Entregas el mismo día*",
      svg: (
        <svg viewBox="0 0 24 24" className="w-9 h-9 text-pink-600">
          <path fill="currentColor" d="M7 18a2 2 0 1 0 0 4a2 2 0 0 0 0-4m10 0a2 2 0 1 0 0 4a2 2 0 0 0 0-4M3 2h3l3.6 7.59L8.25 12A2 2 0 0 0 10 15h9v-2h-8.42a.25.25 0 0 1-.24-.33L11.1 11h6.45a2 2 0 0 0 1.86-1.26l2.38-5.64A1 1 0 0 0 21 3H6.21L5.27 1H1v2Z"/>
        </svg>
      ),
    },
    {
      title: "Our Stores",
      text: "4 sucursales en el Noroeste de la CDMX",
      svg: (
        <svg viewBox="0 0 24 24" className="w-9 h-9 text-pink-600">
          <path fill="currentColor" d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7m0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5"/>
        </svg>
      ),
    },
    {
      title: "Delivery",
      text: "Ordena antes de la 1 pm (L–V) o 12 pm (Sáb) para entrega el mismo día",
      svg: (
        <svg viewBox="0 0 24 24" className="w-9 h-9 text-pink-600">
          <path fill="currentColor" d="M3 7h13v10H3zm13 3h3l3 3v4h-6zM5 19a2 2 0 1 1 4 0a2 2 0 0 1-4 0m10 0a2 2 0 1 1 4 0a2 2 0 0 1-4 0"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((it) => (
            <div key={it.title} className="flex items-start gap-4">
              {it.svg}
              <div>
                <h3 className="text-lg font-semibold">{it.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{it.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Occasions() {
  return (
    <section id="occasions" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-center text-3xl md:text-4xl font-semibold tracking-wide">
          SHOP BY OCCASION
        </h2>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {occasions.map((label, idx) => (
            <button
              key={label + idx}
              className="px-5 py-2 rounded-full border border-neutral-300 hover:border-neutral-500 text-sm font-medium"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }) {
  return (
    <div className="rounded-2xl border border-neutral-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition">
      <div className="aspect-[4/3] bg-neutral-100">
        <img
          src={product.img}
          alt={product.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium">{product.name}</h3>
        <p className="mt-1 text-pink-600 font-semibold">${product.price.toFixed(2)}</p>
        <div className="mt-3 flex gap-2">
          <button className="flex-1 rounded-xl bg-neutral-900 text-white text-sm px-3 py-2">
            Add to cart
          </button>
          <button className="rounded-xl border border-neutral-300 text-sm px-3 py-2">
            Quick View
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductGrid() {
  return (
    <section id="products" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="text-2xl font-extrabold">
            <span className="text-pink-600">CUSI</span>FLORES
          </div>
          <p className="mt-3 text-sm text-neutral-600">
            Suscríbete para ofertas y novedades.
          </p>
          <form className="mt-4 flex gap-2">
            <input
              type="email"
              placeholder="Tu email"
              className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm"
            />
            <button className="rounded-xl bg-neutral-900 text-white text-sm px-4">
              Join
            </button>
          </form>
        </div>

        <div>
          <h4 className="font-semibold">ABOUT US</h4>
          <ul className="mt-3 space-y-2 text-sm text-neutral-600">
            <li>Nuestra diferencia</li>
            <li>Compromiso</li>
            <li>Blog</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">HELP</h4>
          <ul className="mt-3 space-y-2 text-sm text-neutral-600">
            <li>Cuidado de flores</li>
            <li>Envíos</li>
            <li>Privacidad</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">LOCAL</h4>
          <ul className="mt-3 space-y-2 text-sm text-neutral-600">
            <li>CDMX</li>
            <li>Guadalajara</li>
            <li>Monterrey</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-200 py-4 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} CUSIFLORES. All rights reserved.
      </div>
    </footer>
  );
}

/* ------------------------------ APP ------------------------------- */

export default function App() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Header />
      <HeroSlider />
      <IconRow />
      <Occasions />
      <ProductGrid />
      <Footer />
    </div>
  );
}
