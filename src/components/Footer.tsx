import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import BackgroundTrees from "./BackgroundTrees";

interface FooterProps {
  companyName?: string;
  companyDescription?: string;
  navigationLinks?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  socialLinks?: Array<{ name: string; href: string; icon: React.ReactNode }>;
}

const Footer = ({
  companyName = "Tendas Mozambique",
  companyDescription = "We provide high-quality tents and outdoor shelters for camping, events, and commercial use throughout Mozambique and beyond.",
  navigationLinks = [],
  contactInfo = {
    email: "sales@tendasmozambique.com",
    phone: "+258 843 989 573",
    address: "Beira, Sofala, Mozambique",
  },
}: FooterProps) => {
  // Create a default translation function to avoid errors when not in a LanguageProvider
  const defaultT = (key: string) => {
    const defaultTranslations = {
      "footer.products": "Products",
      "footer.company": "Company",
      "footer.contactUs": "Contact Us",
      "footer.allRightsReserved": "All rights reserved.",
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

  const localizedNavLinks = [
    {
      title: t("footer.products"),
      links: [
        { name: "Camping Tents", href: "#" },
        { name: "Family Tents", href: "#" },
        { name: "Event Tents", href: "#" },
        { name: "Custom Tents", href: "#" },
      ],
    },
    {
      title: t("footer.company"),
      links: [
        { name: "About Us", href: "#" },
        { name: "Our Team", href: "#" },
        { name: "Careers", href: "#" },
        { name: "News", href: "#" },
      ],
    },
    {
      title: t("footer.support"),
      links: [
        { name: "Help Center", href: "#" },
        { name: "Contact Us", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white py-16 px-6 md:px-10 lg:px-16 mt-16 relative overflow-hidden">
      <div className="absolute inset-0">
        <BackgroundTrees count={15} opacity={0.03} />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <img
                  src="/new-logo.svg"
                  alt="Tendas Mozambique Logo"
                  className="h-20 mr-3"
                />
                <h2 className="text-2xl font-bold">{companyName}</h2>
              </div>
              <p className="mt-4 text-green-100">{companyDescription}</p>

              <div className="mt-6 flex space-x-4"></div>
            </motion.div>
          </div>

          {/* Navigation Links */}
          {localizedNavLinks.map((section, index) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      className="text-green-100 hover:text-white transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Information */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold">{t("footer.contactUs")}</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-green-200" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-green-100 hover:text-white transition-colors duration-300"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-green-200" />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-green-100 hover:text-white transition-colors duration-300"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-green-200 mt-1" />
                <span className="text-green-100">{contactInfo.address}</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="mt-16 pt-8 border-t border-green-700 text-center text-green-200 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p>
            &copy; {new Date().getFullYear()} {companyName}.{" "}
            {t("footer.allRightsReserved")}
          </p>
          <div className="mt-4 flex items-center justify-center space-x-4">
            <a
              href="https://yourportfolio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-white transition-colors duration-300"
            >
              <span>Developed by </span>
              <span className="font-semibold ml-1 text-green-100 hover:text-white">
                Your Name
              </span>
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-100 hover:text-white transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-100 hover:text-white transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
