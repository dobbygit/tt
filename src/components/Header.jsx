import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/images/new-logo.svg";

function Header() {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    // Set initial value based on stored preference or default to English
    const storedLanguage = localStorage.getItem("preferredLanguage") || "en";
    setLanguage(storedLanguage);
  }, []);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    localStorage.setItem("preferredLanguage", selectedLanguage);
    setLanguage(selectedLanguage);
    console.log(`Language changed to: ${selectedLanguage}`);
    // In a real app, this would trigger language change throughout the site
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="flex justify-between items-center p-4 md:p-6">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="African Sun Logo" className="h-12" />
          </Link>
        </div>
        <ul className="nav-links flex gap-8">
          <li>
            <Link
              to="/"
              className="text-gray-800 font-medium hover:text-yellow-500 transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/why-us"
              className="text-gray-800 font-medium hover:text-yellow-500 transition-colors"
            >
              Why Us
            </Link>
          </li>
          <li>
            <Link
              to="/rental"
              className="text-gray-800 font-medium hover:text-yellow-500 transition-colors"
            >
              Rental
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-gray-800 font-medium hover:text-yellow-500 transition-colors"
            >
              Contact
            </Link>
          </li>
        </ul>
        <div className="language-selector">
          <select
            id="language-select"
            value={language}
            onChange={handleLanguageChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="en">English</option>
            <option value="af">Afrikaans</option>
          </select>
        </div>
      </nav>
    </header>
  );
}

export default Header;
