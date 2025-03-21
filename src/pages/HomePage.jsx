import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function HomePage() {
  const products = [
    { id: "tents", name: "Tents" },
    { id: "awnings", name: "Awnings" },
    { id: "shade-ports", name: "Shade Ports" },
    { id: "tarpaulins", name: "Tarpaulins" },
    { id: "vehicle-covers", name: "Vehicle Covers" },
    { id: "custom-work", name: "Custom Work" },
  ];

  return (
    <div>
      <Header />

      <main>
        <section
          className="hero bg-cover bg-center text-white text-center py-20 px-6 mb-8"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/products/tents/main.jpg')`,
          }}
        >
          <div className="hero-content">
            <h1 className="text-4xl md:text-5xl mb-4">
              Welcome to African Sun
            </h1>
            <p className="text-xl mb-8">
              Quality tents, awnings, and shade solutions
            </p>
            <Link
              to="/contact"
              className="btn bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-md inline-block transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </section>

        <section className="product-showcase py-12 px-6 text-center">
          <h2 className="text-3xl mb-8">Our Products</h2>
          <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {products.map((product) => (
              <div
                key={product.id}
                className="product-card bg-white rounded-lg overflow-hidden shadow-md hover:translate-y-[-5px] transition-transform"
              >
                <img
                  src={`/images/products/${product.id}/main.jpg`}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <h3 className="p-4 text-xl">{product.name}</h3>
                <Link
                  to={`/product/${product.id}`}
                  className="btn border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white font-semibold py-2 px-4 rounded-md mx-4 mb-4 block transition-colors"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="statistics bg-yellow-500 text-white py-12 px-6 flex flex-col md:flex-row justify-around text-center mt-8">
          <div className="stat-item mb-8 md:mb-0">
            <h3 className="text-4xl mb-2">20+</h3>
            <p className="text-xl">Years Experience</p>
          </div>
          <div className="stat-item mb-8 md:mb-0">
            <h3 className="text-4xl mb-2">1000+</h3>
            <p className="text-xl">Happy Customers</p>
          </div>
          <div className="stat-item">
            <h3 className="text-4xl mb-2">500+</h3>
            <p className="text-xl">Projects Completed</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;
