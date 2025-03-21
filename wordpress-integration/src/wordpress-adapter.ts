/**
 * WordPress Adapter for Tendas Mozambique React App
 *
 * This file provides the necessary adapters to make the React app work within WordPress
 */

import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Import your main components
import ContactForm from "../src/components/ContactForm";
import ProductPage from "../src/components/ProductPage";
import ProductShowcase from "../src/components/ProductShowcase";
import { ThemeProvider } from "../src/components/ThemeProvider";
import { LanguageProvider } from "../src/components/LanguageContext";

// WordPress data interface (passed from wp_localize_script)
declare global {
  interface Window {
    wpData: {
      siteUrl: string;
      restUrl: string;
      nonce: string;
      ajaxUrl: string;
    };
  }
}

/**
 * Initialize the React components based on containers in the page
 */
export function initializeWordPressComponents() {
  // Initialize main app if container exists
  const appContainer = document.getElementById("tendas-mozambique-root");
  if (appContainer) {
    const view = appContainer.getAttribute("data-view") || "home";
    const productId = appContainer.getAttribute("data-product-id");

    const root = createRoot(appContainer);
    root.render(
      React.createElement(
        ThemeProvider,
        null,
        React.createElement(
          LanguageProvider,
          null,
          React.createElement(
            BrowserRouter,
            null,
            renderAppView(view, productId),
          ),
        ),
      ),
    );
  }

  // Initialize individual product components
  const productContainers = document.querySelectorAll(
    ".tendas-mozambique-product",
  );
  productContainers.forEach((container) => {
    const productId = container.getAttribute("data-product-id");
    if (productId) {
      const root = createRoot(container);
      root.render(
        React.createElement(
          ThemeProvider,
          null,
          React.createElement(
            LanguageProvider,
            null,
            React.createElement(ProductPage, {
              productId: parseInt(productId, 10),
            }),
          ),
        ),
      );
    }
  });

  // Initialize contact form components
  const contactFormContainers = document.querySelectorAll(
    ".tendas-mozambique-contact-form",
  );
  contactFormContainers.forEach((container) => {
    const title = container.getAttribute("data-title") || "Contact Us";
    const root = createRoot(container);
    root.render(
      React.createElement(
        ThemeProvider,
        null,
        React.createElement(
          LanguageProvider,
          null,
          React.createElement(ContactForm, { title: title }),
        ),
      ),
    );
  });

  // Initialize product showcase components
  const showcaseContainers = document.querySelectorAll(
    ".tendas-mozambique-product-showcase",
  );
  showcaseContainers.forEach((container) => {
    const title = container.getAttribute("data-title") || "Our Products";
    const category = container.getAttribute("data-category") || "";
    const count = parseInt(container.getAttribute("data-count") || "6", 10);

    const root = createRoot(container);
    root.render(
      React.createElement(
        ThemeProvider,
        null,
        React.createElement(
          LanguageProvider,
          null,
          React.createElement(ProductShowcase, {
            title: title,
            category: category,
            count: count,
          }),
        ),
      ),
    );
  });
}

/**
 * Render the appropriate view based on the view parameter
 */
function renderAppView(view: string, productId: string | null) {
  switch (view) {
    case "product":
      if (productId) {
        return React.createElement(ProductPage, {
          productId: parseInt(productId, 10),
        });
      }
      return React.createElement(
        "div",
        null,
        "Error: Product ID is required for product view",
      );

    case "contact":
      return React.createElement(ContactForm, null);

    case "products":
      return React.createElement(ProductShowcase, null);

    default:
      // Import dynamically to reduce initial bundle size
      const Home = lazy(() => import("../src/components/home"));
      return React.createElement(
        Suspense,
        { fallback: React.createElement("div", null, "Loading...") },
        React.createElement(Home, null),
      );
  }
}

/**
 * WordPress-compatible email service adapter
 * This replaces the Supabase functions with WordPress AJAX/REST API
 */
export async function sendEmailWordPress(data: {
  to: string;
  subject: string;
  body: string;
  from?: string;
  replyTo?: string;
}) {
  try {
    // Use WordPress REST API
    const response = await fetch(
      `${window.wpData.restUrl}tendas-mozambique/v1/send-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-WP-Nonce": window.wpData.nonce,
        },
        body: JSON.stringify(data),
      },
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to send email");
    }

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

// Initialize components when DOM is ready
document.addEventListener("DOMContentLoaded", initializeWordPressComponents);
