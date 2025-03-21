import React, { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "./LanguageContext";

interface HeaderProps {
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

const Header = ({
  onThemeToggle = () => {},
  isDarkMode = false,
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Create a default translation function to avoid errors when not in a LanguageProvider
  const defaultT = (key: string) => {
    const defaultTranslations = {
      "nav.home": "Home",
      "nav.tents": "Tents",
      "nav.whyUs": "Why Us",
      "nav.contact": "Contact",
    };
    return defaultTranslations[key] || key;
  };

  // Try to use the language context, fall back to default if not available
  let t = defaultT;
  try {
    const languageContext = useLanguage();
    t = languageContext.t;
  } catch (error) {
    // Use the default translation function if not in a LanguageProvider
  }

  const navLinks = [
    { name: t("nav.home"), href: "#", id: "hero" },
    { name: t("nav.tents"), href: "#products", id: "products" },
    { name: "Rental", href: "/rental", id: "rental" },
    { name: t("nav.whyUs"), href: "/why-us", id: "why-us" },
    { name: t("nav.location"), href: "#location", id: "location" },
    { name: t("nav.contact"), href: "#contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}`}
    >
      <div className="container mx-auto py-2 md:py-3 px-3 sm:px-4 lg:px-6 flex items-center justify-between gap-2 md:gap-4">
        {/* Logo */}
        <div className="flex items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <a
              href="/"
              className="flex items-center"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/";
              }}
            >
              <img
                src="/new-logo.svg"
                alt="Tendas Mozambique"
                className="h-14 md:h-16 mr-2"
              />
              <div className="flex flex-col">
                <span
                  className={`text-xl md:text-2xl lg:text-3xl font-bold ${isScrolled ? "text-[#1b5e20]" : "text-white drop-shadow-md"}`}
                >
                  Tendas Mozambique
                </span>
                <div
                  className={`hidden lg:flex text-xs space-x-2 font-medium tracking-wide ${isScrolled ? "text-[#1b5e20]/90" : "text-white/90 drop-shadow-md"}`}
                >
                  <span className="truncate max-w-[180px] xl:max-w-none">
                    Rua General Viera da Rocha, 244
                  </span>
                  <span>|</span>
                  <span>+258 843 454 750</span>
                  <span>|</span>
                  <span>sales@tendasmozambique.com</span>
                </div>
              </div>
            </a>
          </motion.div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-3 lg:space-x-6">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                if (link.href.startsWith("/")) {
                  window.location.href = link.href;
                } else if (window.location.pathname !== "/") {
                  window.location.href = `/#${link.id}`;
                } else {
                  const element = document.getElementById(link.id);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${isScrolled ? "text-[#1b5e20] hover:text-[#4caf50]" : "text-white hover:text-green-100 drop-shadow-md"} font-medium transition-colors duration-200 cursor-pointer font-semibold`}
            >
              {link.name}
            </motion.a>
          ))}
        </nav>

        {/* Language Selector, Theme Toggle and Mobile Menu Button */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <LanguageSelector />
          <Button
            variant="ghost"
            size="icon"
            onClick={onThemeToggle}
            className={`rounded-full ${isScrolled ? "hover:bg-[#1b5e20]/10" : "hover:bg-white/20"}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDarkMode ? "dark" : "light"}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon
                    className={`h-5 w-5 ${isScrolled ? "text-[#1b5e20]" : "text-white"}`}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden rounded-full ${isScrolled ? "hover:bg-[#1b5e20]/10" : "hover:bg-white/20"}`}
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X
                className={`h-6 w-6 ${isScrolled ? "text-gray-700" : "text-white"} dark:text-gray-200`}
              />
            ) : (
              <Menu
                className={`h-6 w-6 ${isScrolled ? "text-gray-700" : "text-white"} dark:text-gray-200`}
              />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
          >
            <div className="container mx-auto py-4 px-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-800 hover:text-[#4caf50] py-2 font-medium transition-colors duration-200 cursor-pointer dark:text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    if (link.href.startsWith("/")) {
                      window.location.href = link.href;
                    } else if (window.location.pathname !== "/") {
                      window.location.href = `/#${link.id}`;
                    } else {
                      const element = document.getElementById(link.id);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
