import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Search, User, Gift, MapPin, ChevronRight } from "lucide-react";

// --- Mock Data (replace later with real backend) ---
const heroSlides = [
  { id: 1, eyebrow: "30% OFF TODAY", title: "Spring Collections", cta: "Shop Now",
    image: "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?q=80&w=1600&auto=format&fit=crop" },
  { id: 2, eyebrow: "30% OFF TODAY", title: "Fresh Flower", cta: "Shop Now",
    image: "https://images.unsplash.com/photo-1503435824048-a799a3a84bf7?q=80&w=1600&auto=format&fit=crop" },
  { id: 3, eyebrow: "30% OFF TODAY", title: "Inspired By Nature", cta: "Shop Now",
    image: "https://images.unsplash.com/photo-1435783459217-ee7fe5414abe?q=80&w=1600&auto=format&fit=crop" },
];

const categories = [
  { name: "Bespoke" }, { name: "Birthday" }, { name: "Next Day" },
  { name: "Plant" }, { name: "Sympathy" }, { name: "Wedding" },
];

const products = [
  { id: 93, name: "Love Story", price: 135, images: [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519681395604-b2b7b3d29747?q=80&w=1200&auto=format&fit=crop",
    ]},
  { id: 95, name: "Winifred", price: 100, images: [
      "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=1200&auto=format&fit=crop",
    ]},
  { id: 97, name: "Elegant Flower", price: 120, images: [
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=1200&auto=format&fit=crop",
    ]},
  { id: 99, name: "Love You", price: 200, images: [
      "https://images.unsplash.com/photo-1485875437342-9b39470b3d95?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1200&auto=format&fit=crop",
    ]},
  { id: 55, name: "Sun Light", price: 100, images: [
      "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1485875437342-9b39470b3d95?q=80&w=1200&auto=format&fit=crop",
    ]},
  { id: 102, name: "Lovely", price: 200, images: [
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?q=80&w=1200&auto=format&fit=crop",
    ], badge: "-40%" },
  { id: 103, name: "Scarlet Flower", price: 60, compareAt: 90, options: ["Black","Green","Red"], images: [
      "https://images.unsplash.com/photo-1519681395604-b2b7b3d29747?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
    ]},
];

const banners = [
  { title: "Funerals", copy: "We offer a wide range of potted plants and Terrariums & Potted Orchids",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200&auto=format&fit=crop" },
  { title: "Weddings", copy: "We offer a wide range of potted plants and Terrariums & Potted Orchids",
    image: "https://images.unsplash.com/photo-1460039230329-eb070fc6c77c?q=80&w=1200&auto=format&fit=crop" },
  { title: "Plants & Terrariums", copy: "We offer a wide range of potted plants and Terrariums & Potted Orchids",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200&auto=format&fit=crop" },
  { title: "Gift Hampers", copy: "We offer a wide range of potted plants and Terrariums & Potted Orchids",
    image: "https://images.unsplash.com/photo-1491554150235-3603d2d4e9a7?q=80&w=1200&auto=format&fit=crop" },
];

const testimonials = [
  { quote: "Amazing piece of history. Blood bank canine teeth larynx occupational therapist optician…",
    author: "Ann Smith",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop" },
  { quote: "Fabulous grounds. Blood bank canine teeth larynx occupational therapist optician…",
    author: "Saitama One",
    avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=256&auto=format&fit=crop" },
  { quote: "Great vineyard tour and tasting! Blood bank canine teeth…",
    author: "Sara Colinton",
    avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=256&auto=format&fit=crop" },
  { quote: "Stunning design. Blood bank canine teeth…",
    author: "Shetty Jamie",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop" },
];

// --- UI bits ---
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
            <a className="text-2xl font-semibold tracking-tight" href="#">Florial</a>
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
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            alt={current.title}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        <Container>
          <div className="relative z-10 flex h-[60vh] lg:h-[78vh] items-center">
            <div className="max-w-xl text-white">
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-widest ring-1 ring-white/30">
                {current.eyebrow}
              </span>
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
      <Container>
        <div className="-mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { t: "Order Online", d: "We’re at capacity for deliveries Monday 30th August" },
            { t: "Our Stores", d: "We have 4 stores located in the North West of Sydney" },
            { t: "Delivery", d: "Order before 1pm Mon–Fri or 12pm Sat for same-day" },
          ].map((f) => (
            <div key={f.t} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <div className="text-xs font-semibold tracking-wider text-gray-500 uppercase">{f.t}</div>
              <div className="mt-1 text-sm text-gray-700">{f.d}</div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

function OccasionGrid() {
  return (
    <section className="py-12 lg:py-16">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight">Shop by Occasion</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {categories.map((c) => (
            <button key={c.name}
              className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:border-gray-300 hover:shadow">
              {c.name}
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProductCard({ p }) {
  const [hover, setHover] = useState(false);
  const img = hover && p.images[1] ? p.images[1] : p.images[0];
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative rounded-2xl bg-white ring-1 ring-gray-100 shadow-sm overflow-hidden"
    >
      {p.badge && (
        <span className="absolute left-3 top-3 z-10 rounded-md bg-black/80 px-2 py-1 text-xs font-semibold text-white">
          {p.badge}
        </span>
      )}
      <div className="aspect-[4/3] overflow-hidden">
        <img src={img} alt={p.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900">{p.name}</h3>
        <div className="mt-1 flex items-center gap-2">
          <div className="text-base font-semibold">${p.price.toFixed(2)}</div>
          {p.compareAt && <div className="text-sm text-gray-400 line-through">${p.compareAt.toFixed(2)}</div>}
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
          {products.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </Container>
    </section>
  );
}

function FourBanners() {
  return (
    <section className="py-12">
      <Container>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {banners.map((b) => (
            <div key={b.title} className="relative overflow-hidden rounded-2xl">
              <img src={b.image} alt={b.title} className="h-60 w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute inset-0 p-6 text-white">
                <h3 className="text-xl font-semibold">{b.title}</h3>
                <p className="mt-1 text-sm max-w-xs opacity-90">{b.copy}</p>
                <button className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-gray-900">
                  Shop now <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function TestimonialCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 4000);
    return () => clearInterval(t);
  }, []);
  const current = testimonials[i];
  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="grid items-center gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-2xl leading-relaxed text-gray-800"
              >
                “{current.quote}”
              </motion.blockquote>
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-3">
            <img src={current.avatar} className="h-12 w-12 rounded-full object-cover" />
            <div className="text-sm font-medium text-gray-700">{current.author}</div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function SubscriptionCTA() {
  return (
    <section className="py-16">
      <Container>
        <div className="grid gap-8 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 p-8 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Flower Subscriptions</h2>
            <p className="mt-2 text-gray-700">
              A new way to gift fam & friends in one subscription. Switch up recipients to cover
              Birthdays, Thank You’s, Just Because & more!
            </p>
            <ul className="mt-4 grid grid-cols-1 gap-2 text-sm text-gray-700 md:grid-cols-2">
              <li><strong>30% OFF + Free Shipping</strong></li>
              <li>Starting at $36/mo</li>
              <li>Freshest Blooms</li>
              <li>Super Flexible</li>
            </ul>
            <button className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gray-900 px-5 py-3 text-sm font-medium text-white shadow hover:bg-black">
              Subscribe
            </button>
          </div>
          <div className="relative">
            <img
              className="h-full w-full rounded-2xl object-cover"
              src="https://images.unsplash.com/photo-1460039230329-eb070fc6c77c?q=80&w=1400&auto=format&fit=crop"
              alt="Subscription"
            />
          </div>
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
            <div className="text-2xl font-semibold">Florial</div>
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
            <div className="text-sm font-semibold uppercase tracking-wider text-gray-500">About us</div>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li><a href="#" className="hover:text-gray-900">Our Difference</a></li>
              <li><a href="#" className="hover:text-gray-900">Community Matters</a></li>
              <li><a href="#" className="hover:text-gray-900">Press</a></li>
              <li><a href="#" className="hover:text-gray-900">Blog</a></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-gray-500">Help</div>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li><a href="#" className="hover:text-gray-900">Flower Care</a></li>
              <li><a href="#" className="hover:text-gray-900">Shipping</a></li>
              <li><a href="#" className="hover:text-gray-900">Terms of Use</a></li>
              <li><a href="#" className="hover:text-gray-900">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-gray-500">Local</div>
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
        <div className="mt-10 text-xs text-gray-500">© 2025 Florial Flower. All rights reserved.</div>
      </Container>
    </footer>
  );
}

export default function FlorialHomeStrong() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <TopBar />
      <Header />
      <Hero />
      <OccasionGrid />
      <ProductGrid />
      <FourBanners />
      <TestimonialCarousel />
      <SubscriptionCTA />
      <Footer />
    </div>
  );
}
