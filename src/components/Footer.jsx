import { useEffect, useState } from "react";

function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  return (
    <footer className="bg-gray-800 text-white py-12 px-6">
      <div className="footer-content grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="footer-section">
          <h3 className="text-xl mb-4">African Sun</h3>
          <p>Quality tents, awnings, and shade solutions since 2000</p>
        </div>
        <div className="footer-section">
          <h3 className="text-xl mb-4">Contact Us</h3>
          <p>Email: info@africansun.com</p>
          <p>Phone: +27 123 456 789</p>
          <p>Address: 123 Main Street, Cape Town, South Africa</p>
        </div>
        <div className="footer-section">
          <h3 className="text-xl mb-4">Follow Us</h3>
          <div className="social-links flex gap-4">
            <a
              href="#"
              className="social-icon opacity-80 hover:opacity-100 transition-opacity"
            >
              Facebook
            </a>
            <a
              href="#"
              className="social-icon opacity-80 hover:opacity-100 transition-opacity"
            >
              Instagram
            </a>
            <a
              href="#"
              className="social-icon opacity-80 hover:opacity-100 transition-opacity"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom text-center pt-4 border-t border-gray-700">
        <p>&copy; {currentYear} African Sun. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
