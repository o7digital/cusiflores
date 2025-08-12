import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";

// Datos de productos
const products = [
  { id: 201, name: "Rosas amarillas (mini)", price: 120, img: "/products/producto-01.jpg" },
  { id: 202, name: "Diente de león con luz", price: 100, img: "/products/producto-02.jpg" },
  { id: 203, name: "Rosas naranja con verde", price: 135, img: "/products/producto-03.jpg" },
  { id: 204, name: "Cubeta rosa", price: 200, img: "/products/producto-04.jpg" },
  { id: 205, name: "Cubeta morada", price: 200, img: "/products/producto-05.jpg" },
  { id: 206, name: "Astromelias en maceta", price: 85, img: "/products/producto-06.jpg" },
  { id: 207, name: "Arreglo grande 1", price: 260, img: "/products/producto-07.jpg" },
  { id: 208, name: "Arreglo grande 2", price: 260, img: "/products/producto-08.jpg" },
];

// Config slider
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
};

export default function App() {
  return (
    <div className="App">

      {/* Menú y logo */}
      <header className="header">
        <div className="logo">🌸 Cusi Flores</div>
        <nav className="nav">
          <a href="#home">Inicio</a>
          <a href="#products">Productos</a>
          <a href="#about">Nosotros</a>
          <a href="#contact">Contacto</a>
        </nav>
      </header>

      {/* Hero con slider */}
      <section className="slider-container">
        <Slider {...sliderSettings}>
          <div>
            <img src="/slider/foto1.jpg" alt="Slide 1" className="slider-img" />
          </div>
          <div>
            <img src="/slider/foto2.jpg" alt="Slide 2" className="slider-img" />
          </div>
          <div>
            <img src="/slider/foto3.jpg" alt="Slide 3" className="slider-img" />
          </div>
          <div>
            <img src="/slider/foto4.jpg" alt="Slide 4" className="slider-img" />
          </div>
        </Slider>
      </section>

      {/* Sección de productos */}
      <section id="products" className="products-section">
        <h2>Nuestros Productos</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.img} alt={product.name} className="product-img" />
              <h3>{product.name}</h3>
              <p>${product.price} MXN</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Cusi Flores - Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
