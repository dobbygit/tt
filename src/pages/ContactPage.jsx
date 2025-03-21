import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

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
    setSubmitResult(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Contact form submitted:", formData);

      // Simulate successful response
      setSubmitResult({
        success: true,
        message: "Thank you for your message! We will get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Error:", error);
      setSubmitResult({
        success: false,
        message: "There was an error submitting your form. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Header />

      <main>
        <section
          className="contact-hero bg-cover bg-center text-white text-center py-20 px-6"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/products/placeholder.jpg')`,
          }}
        >
          <h1 className="text-4xl mb-2">Contact Us</h1>
          <p className="text-xl">
            We'd love to hear from you. Get in touch with us!
          </p>
        </section>

        <section className="contact-form-section py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="contact-info bg-yellow-500 text-white p-8 rounded-lg md:col-span-1">
            <h2 className="text-2xl mb-6">Our Information</h2>
            <div className="info-item flex items-center mb-4">
              <span className="icon text-2xl mr-4">📞</span>
              <p>+27 123 456 789</p>
            </div>
            <div className="info-item flex items-center mb-4">
              <span className="icon text-2xl mr-4">✉️</span>
              <p>info@africansun.com</p>
            </div>
            <div className="info-item flex items-center mb-4">
              <span className="icon text-2xl mr-4">📍</span>
              <p>123 Main Street, Cape Town, South Africa</p>
            </div>
          </div>

          <form
            id="contact-form"
            className="contact-form bg-white p-8 rounded-lg shadow-md md:col-span-2"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl mb-6">Send Us a Message</h2>

            {submitResult && (
              <div
                className={`p-4 mb-6 rounded-md ${submitResult.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
              >
                {submitResult.message}
              </div>
            )}

            <div className="form-group mb-6">
              <label htmlFor="name" className="block mb-2 font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div className="form-group mb-6">
              <label htmlFor="email" className="block mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div className="form-group mb-6">
              <label htmlFor="phone" className="block mb-2 font-medium">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div className="form-group mb-6">
              <label htmlFor="message" className="block mb-2 font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-md transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </section>

        <section className="map-section py-12 px-6 text-center">
          <h2 className="text-3xl mb-8">Find Us</h2>
          <div className="map-container h-96 max-w-6xl mx-auto rounded-lg overflow-hidden">
            {/* Placeholder for map */}
            <div className="map-placeholder h-full bg-gray-200 flex items-center justify-center text-xl text-gray-500">
              Map will be displayed here
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ContactPage;
