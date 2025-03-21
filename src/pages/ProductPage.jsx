import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import QuoteRequestModal from "../components/QuoteRequestModal";

function ProductPage() {
  const { id } = useParams();
  const [mainImage, setMainImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // In a real app, this would fetch product data from an API
    // For now, we'll create a mock product based on the ID
    const productTitle = id
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    setProduct({
      id,
      title: productTitle,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.",
      features: [
        "High-quality materials",
        "Weather-resistant",
        "Durable construction",
        "Custom sizing available",
        "Professional installation",
      ],
      images: [
        `/images/products/${id}/main.jpg`,
        `/images/products/${id}/1.jpg`,
        `/images/products/${id}/2.jpg`,
        `/images/products/${id}/3.jpg`,
      ],
      relatedProducts: [
        {
          id: "related-1",
          title: "Related Product",
          image: "/images/products/placeholder.jpg",
        },
        {
          id: "related-2",
          title: "Related Product",
          image: "/images/products/placeholder.jpg",
        },
      ],
    });

    setMainImage(`/images/products/${id}/main.jpg`);
  }, [id]);

  const handleThumbnailClick = (imageSrc) => {
    setMainImage(imageSrc);
  };

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <Header />

      <main>
        <section
          className="product-hero bg-cover bg-center text-white text-center py-20 px-6"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${product.images[0]}')`,
          }}
        >
          <h1 className="text-4xl">{product.title}</h1>
        </section>

        <section className="product-details py-12 px-6 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="product-gallery">
            <div className="main-image mb-4 rounded-lg overflow-hidden">
              <img src={mainImage} alt={product.title} className="w-full" />
            </div>
            <div className="thumbnail-gallery grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} ${index}`}
                  className={`rounded cursor-pointer transition-opacity hover:opacity-80 ${mainImage === image ? "border-2 border-yellow-500" : ""}`}
                  onClick={() => handleThumbnailClick(image)}
                />
              ))}
            </div>
          </div>

          <div className="product-info">
            <h2 className="text-2xl mb-4">About {product.title}</h2>
            <p className="mb-6">{product.description}</p>

            <h3 className="text-xl mt-6 mb-2">Features</h3>
            <ul className="mb-8 pl-6">
              {product.features.map((feature, index) => (
                <li key={index} className="mb-2 list-disc">
                  {feature}
                </li>
              ))}
            </ul>

            <button
              id="quote-btn"
              className="btn bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-md transition-colors"
              onClick={() => setShowModal(true)}
            >
              Request a Quote
            </button>
          </div>
        </section>

        <section className="related-products py-12 px-6 bg-gray-100 text-center">
          <h2 className="text-3xl mb-8">Related Products</h2>
          <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {product.relatedProducts.map((relatedProduct, index) => (
              <div
                key={index}
                className="product-card bg-white rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.title}
                  className="w-full h-48 object-cover"
                />
                <h3 className="p-4 text-xl">{relatedProduct.title}</h3>
                <a
                  href="#"
                  className="btn border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white font-semibold py-2 px-4 rounded-md mx-4 mb-4 block transition-colors"
                >
                  View Details
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>

      {showModal && (
        <QuoteRequestModal
          product={product.title}
          onClose={() => setShowModal(false)}
        />
      )}

      <Footer />
    </div>
  );
}

export default ProductPage;
