import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function WhyUsPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const reasons = [
    {
      icon: "🏆",
      title: "Experience",
      description:
        "With over 20 years in the industry, we have the expertise to deliver exceptional quality and service.",
    },
    {
      icon: "✨",
      title: "Quality Materials",
      description:
        "We use only the highest quality materials to ensure durability and longevity of our products.",
    },
    {
      icon: "🛠️",
      title: "Custom Solutions",
      description:
        "We specialize in creating custom solutions tailored to your specific needs and requirements.",
    },
    {
      icon: "👥",
      title: "Customer Service",
      description:
        "Our dedicated team provides exceptional customer service from initial consultation to after-sales support.",
    },
    {
      icon: "🔄",
      title: "Warranty",
      description:
        "We stand behind our products with comprehensive warranties and maintenance services.",
    },
    {
      icon: "🌍",
      title: "Local Expertise",
      description:
        "As a South African company, we understand local conditions and requirements better than anyone.",
    },
  ];

  const testimonials = [
    {
      quote:
        "African Sun provided us with an excellent custom tent solution for our event. The quality was outstanding and the service was impeccable.",
      author: "John Smith, Event Organizer",
    },
    {
      quote:
        "We've been using African Sun's shade ports for our business for over 5 years. They've withstood all weather conditions and still look great.",
      author: "Sarah Johnson, Business Owner",
    },
    {
      quote:
        "The team at African Sun went above and beyond to create a custom awning for our unique space. Highly recommended!",
      author: "Michael Brown, Homeowner",
    },
  ];

  useEffect(() => {
    // Set up automatic slider for testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div>
      <Header />

      <main>
        <section
          className="why-us-hero bg-cover bg-center text-white text-center py-20 px-6"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/products/placeholder.jpg')`,
          }}
        >
          <h1 className="text-4xl mb-2">Why Choose African Sun</h1>
          <p className="text-xl">
            Discover what sets us apart from the competition
          </p>
        </section>

        <section className="why-us-content py-12 px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="reason-card bg-white p-8 rounded-lg shadow-md text-center"
              >
                <div className="reason-icon text-5xl mb-4 text-yellow-500">
                  {reason.icon}
                </div>
                <h2 className="text-2xl mb-4">{reason.title}</h2>
                <p>{reason.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="testimonials py-12 px-6 bg-gray-100 text-center">
          <h2 className="text-3xl mb-8">What Our Customers Say</h2>
          <div className="testimonial-slider max-w-3xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`testimonial bg-white p-8 rounded-lg shadow-md mb-8 transition-opacity duration-500 ${index === currentTestimonial ? "block" : "hidden"}`}
              >
                <p className="quote text-lg italic mb-4">
                  "{testimonial.quote}"
                </p>
                <p className="author font-semibold text-yellow-500">
                  - {testimonial.author}
                </p>
              </div>
            ))}
            <div className="flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${index === currentTestimonial ? "bg-yellow-500" : "bg-gray-300"}`}
                  onClick={() => setCurrentTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section py-12 px-6 bg-yellow-500 text-white text-center">
          <h2 className="text-3xl mb-4">
            Ready to Experience the African Sun Difference?
          </h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your project or request a quote.
          </p>
          <Link
            to="/contact"
            className="btn bg-white text-yellow-500 hover:bg-gray-100 font-semibold py-3 px-6 rounded-md transition-colors"
          >
            Contact Us
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default WhyUsPage;
