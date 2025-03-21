import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function RentalPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  const rentalOptions = [
    {
      id: "event-tents",
      title: "Event Tents",
      description:
        "Available in various sizes for weddings, corporate events, and parties.",
      image: "/images/products/tents/main.jpg",
    },
    {
      id: "marquee-tents",
      title: "Marquee Tents",
      description: "Elegant solutions for upscale events and functions.",
      image: "/images/products/tents/1.jpg",
    },
    {
      id: "camping-tents",
      title: "Camping Tents",
      description: "Durable tents for outdoor adventures and camping trips.",
      image: "/images/products/tents/2.jpg",
    },
    {
      id: "shade-structures",
      title: "Shade Structures",
      description:
        "Temporary shade solutions for outdoor events and functions.",
      image: "/images/products/tents/3.jpg",
    },
  ];

  const processSteps = [
    {
      number: 1,
      title: "Inquire",
      description: "Contact us with your event details and requirements.",
    },
    {
      number: 2,
      title: "Consultation",
      description:
        "Our team will help you select the right equipment for your needs.",
    },
    {
      number: 3,
      title: "Booking",
      description: "Confirm your rental dates and finalize the details.",
    },
    {
      number: 4,
      title: "Delivery & Setup",
      description: "We deliver, set up, and ensure everything is perfect.",
    },
    {
      number: 5,
      title: "Enjoy",
      description: "Enjoy your event with peace of mind.",
    },
    {
      number: 6,
      title: "Pickup",
      description: "We handle the dismantling and pickup after your event.",
    },
  ];

  const faqItems = [
    {
      question: "How far in advance should I book?",
      answer:
        "We recommend booking at least 2-4 weeks in advance, especially during peak season (October-April).",
    },
    {
      question: "Do you provide setup and takedown services?",
      answer:
        "Yes, all our rentals include professional setup and takedown services.",
    },
    {
      question: "What is the rental duration?",
      answer:
        "Standard rental periods are 24 hours, weekend (Friday-Monday), or weekly. Custom durations are available.",
    },
    {
      question: "Do you require a deposit?",
      answer:
        "Yes, we require a 50% deposit to secure your booking, with the balance due before delivery.",
    },
  ];

  const handleRentalInquiry = (productId) => {
    setSelectedProduct(productId);
    setShowModal(true);
  };

  return (
    <div>
      <Header />

      <main>
        <section
          className="rental-hero bg-cover bg-center text-white text-center py-20 px-6"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/products/tents/main.jpg')`,
          }}
        >
          <h1 className="text-4xl mb-2">Tent & Equipment Rental</h1>
          <p className="text-xl">
            Quality equipment for events, functions, and special occasions
          </p>
        </section>

        <section className="rental-options py-12 px-6 text-center">
          <h2 className="text-3xl mb-8">Our Rental Options</h2>
          <div className="rental-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {rentalOptions.map((option) => (
              <div
                key={option.id}
                className="rental-card bg-white rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={option.image}
                  alt={option.title}
                  className="w-full h-48 object-cover"
                />
                <h3 className="p-4 pt-4 pb-2 text-xl">{option.title}</h3>
                <p className="px-4 pb-4">{option.description}</p>
                <button
                  className="btn border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white font-semibold py-2 px-4 rounded-md mx-4 mb-4 block w-[calc(100%-2rem)] transition-colors"
                  onClick={() => handleRentalInquiry(option.id)}
                >
                  Inquire
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="rental-process py-12 px-6 bg-gray-100">
          <h2 className="text-3xl mb-8 text-center">How It Works</h2>
          <div className="process-steps grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="step bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="step-number flex items-center justify-center w-12 h-12 bg-yellow-500 text-white rounded-full text-xl font-semibold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl mb-2">{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rental-faq py-12 px-6">
          <h2 className="text-3xl mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="faq-container max-w-3xl mx-auto">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="faq-item mb-6 pb-6 border-b border-gray-200 last:border-b-0"
              >
                <h3 className="text-xl mb-2 text-yellow-500">
                  {item.question}
                </h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rental-cta py-12 px-6 bg-yellow-500 text-white text-center">
          <h2 className="text-3xl mb-4">Ready to Rent?</h2>
          <p className="mb-8">
            Contact us today to discuss your rental needs and get a quote.
          </p>
          <Link
            to="/contact"
            className="btn bg-white text-yellow-500 hover:bg-gray-100 font-semibold py-3 px-6 rounded-md transition-colors"
          >
            Contact Us
          </Link>
        </section>
      </main>

      {showModal && (
        <RentalInquiryModal
          product={selectedProduct}
          onClose={() => setShowModal(false)}
        />
      )}

      <Footer />
    </div>
  );
}

function RentalInquiryModal({ product, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    duration: "24h",
    details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, you would send this data to the server
      console.log("Rental inquiry submitted:", {
        ...formData,
        product,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Thank you for your rental inquiry! We will get back to you soon.");
      onClose();
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto flex justify-center items-start pt-10">
      <div className="modal-content bg-white rounded-lg p-8 max-w-xl w-full mx-4 relative">
        <span
          className="close-btn absolute top-4 right-4 text-2xl cursor-pointer"
          onClick={onClose}
        >
          &times;
        </span>
        <h2 className="text-2xl mb-6">Rental Inquiry</h2>
        <form id="rental-form" onSubmit={handleSubmit}>
          <input
            type="hidden"
            id="rental-product"
            name="product"
            value={product}
          />
          <div className="form-group mb-6">
            <label htmlFor="rental-name" className="block mb-2 font-medium">
              Name
            </label>
            <input
              type="text"
              id="rental-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div className="form-group mb-6">
            <label htmlFor="rental-email" className="block mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              id="rental-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div className="form-group mb-6">
            <label htmlFor="rental-phone" className="block mb-2 font-medium">
              Phone
            </label>
            <input
              type="tel"
              id="rental-phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div className="form-group mb-6">
            <label htmlFor="rental-date" className="block mb-2 font-medium">
              Event Date
            </label>
            <input
              type="date"
              id="rental-date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div className="form-group mb-6">
            <label htmlFor="rental-duration" className="block mb-2 font-medium">
              Rental Duration
            </label>
            <select
              id="rental-duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="24h">24 Hours</option>
              <option value="weekend">Weekend (Fri-Mon)</option>
              <option value="week">1 Week</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          <div className="form-group mb-6">
            <label htmlFor="rental-details" className="block mb-2 font-medium">
              Additional Details
            </label>
            <textarea
              id="rental-details"
              name="details"
              rows="5"
              value={formData.details}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-md transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Inquiry"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RentalPage;
