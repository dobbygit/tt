document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const nav = document.querySelector("nav");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      nav.classList.toggle("active");
      const spans = menuToggle.querySelectorAll("span");
      spans[0].classList.toggle("rotate-45");
      spans[1].classList.toggle("opacity-0");
      spans[2].classList.toggle("-rotate-45");
    });
  }

  // Modal functionality
  const quoteModal = document.getElementById("quote-modal");
  const productModal = document.getElementById("product-modal");
  const ctaButton = document.querySelector(".cta-button");
  const closeButtons = document.querySelectorAll(".close-modal");
  const productButtons = document.querySelectorAll(".product-button");

  // Open quote modal
  if (ctaButton) {
    ctaButton.addEventListener("click", function () {
      quoteModal.style.display = "block";
      document.body.style.overflow = "hidden";
    });
  }

  // Close modals
  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      quoteModal.style.display = "none";
      productModal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  });

  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === quoteModal) {
      quoteModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
    if (event.target === productModal) {
      productModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Product details
  const productData = {
    tents: {
      name: "Tents",
      description:
        "Our high-quality tents are perfect for events, storage, and more. Made with durable PVC material that can withstand various weather conditions.",
      features: [
        "Waterproof and UV resistant",
        "Customizable sizes and designs",
        "Easy to set up and dismantle",
        "Durable aluminum or steel frame",
        "Available for purchase or rental",
      ],
      images: [
        "/public/images/products/tents/main.jpg",
        "/public/images/products/tents/1.jpg",
        "/public/images/products/tents/2.jpg",
        "/public/images/products/tents/3.jpg",
      ],
    },
    tarpaulins: {
      name: "Tarpaulins",
      description:
        "Our tarpaulins are versatile and durable, perfect for covering and protecting items from the elements. Available in various sizes and thicknesses.",
      features: [
        "Waterproof and tear-resistant",
        "UV stabilized for longer life",
        "Reinforced edges and grommets",
        "Custom sizes available",
        "Multiple color options",
      ],
      images: [
        "/public/images/products/tarpaulins/main.jpg",
        "/public/images/products/tarpaulins/1.jpg",
        "/public/images/products/tarpaulins/2.jpg",
        "/public/images/products/tarpaulins/3.jpg",
      ],
    },
    awnings: {
      name: "Awnings",
      description:
        "Enhance your home or business with our custom awnings. Providing shade and protection while adding aesthetic appeal to your property.",
      features: [
        "Custom designed to fit your space",
        "Weather-resistant materials",
        "Manual or motorized options",
        "Wide range of colors and patterns",
        "Professional installation available",
      ],
      images: [
        "/public/images/products/awnings/main.jpg",
        "/public/images/products/awnings/1.jpg",
        "/public/images/products/awnings/2.jpg",
        "/public/images/products/awnings/3.jpg",
      ],
    },
    "shade-ports": {
      name: "Shade Ports",
      description:
        "Our shade ports provide effective protection for vehicles and outdoor areas from sun and rain. Durable and built to last.",
      features: [
        "Strong steel or aluminum structure",
        "UV-resistant shade cloth or PVC cover",
        "Custom sizes to fit your needs",
        "Easy maintenance",
        "Optional side panels available",
      ],
      images: [
        "/public/images/products/shade-ports/main.jpg",
        "/public/images/products/shade-ports/1.jpg",
        "/public/images/products/shade-ports/2.jpg",
        "/public/images/products/shade-ports/3.jpg",
      ],
    },
    "vehicle-covers": {
      name: "Vehicle Covers",
      description:
        "Protect your vehicles with our custom-made covers. Designed to fit perfectly and provide maximum protection from dust, sun, and rain.",
      features: [
        "Tailored to fit specific vehicle models",
        "Breathable yet waterproof material",
        "UV protection to prevent fading",
        "Easy to install and remove",
        "Reinforced stitching for durability",
      ],
      images: [
        "/public/images/products/vehicle-covers/main.jpg",
        "/public/images/products/vehicle-covers/1.jpg",
        "/public/images/products/vehicle-covers/2.jpg",
        "/public/images/products/vehicle-covers/3.jpg",
      ],
    },
    "custom-work": {
      name: "Custom Work",
      description:
        "We specialize in creating bespoke PVC solutions for your specific needs. From custom covers to specialized structures, we can bring your ideas to life.",
      features: [
        "Consultation with our design experts",
        "Custom measurements and fitting",
        "High-quality materials and craftsmanship",
        "Prototyping available for complex projects",
        "Ongoing support and maintenance",
      ],
      images: [
        "/public/images/products/custom-work/main.jpg",
        "/public/images/products/custom-work/1.jpg",
        "/public/images/products/custom-work/2.jpg",
        "/public/images/products/custom-work/3.jpg",
      ],
    },
  };

  // Open product details modal
  productButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      const productType = Object.keys(productData)[index];
      const product = productData[productType];

      // Create product details HTML
      const productDetailsHTML = `
        <div class="product-details">
          <div class="product-gallery">
            <div class="product-main-image">
              <img src="${product.images[0]}" alt="${product.name}" id="main-product-image">
            </div>
            ${product.images
              .map(
                (img, i) => `
              <img src="${img}" alt="${product.name} ${i + 1}" class="thumbnail" onclick="document.getElementById('main-product-image').src='${img}'">
            `,
              )
              .join("")}
          </div>
          <div class="product-info">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <div class="product-features">
              <h3>Features</h3>
              <ul>
                ${product.features.map((feature) => `<li>${feature}</li>`).join("")}
              </ul>
            </div>
            <button class="cta-button product-quote-btn">Request a Quote</button>
          </div>
        </div>
      `;

      // Set the HTML and show the modal
      document.getElementById("product-details-container").innerHTML =
        productDetailsHTML;
      productModal.style.display = "block";
      document.body.style.overflow = "hidden";

      // Add event listener to the quote button in the product modal
      const productQuoteBtn = document.querySelector(".product-quote-btn");
      if (productQuoteBtn) {
        productQuoteBtn.addEventListener("click", function () {
          productModal.style.display = "none";
          quoteModal.style.display = "block";

          // Pre-select the product in the dropdown
          const productSelect = document.getElementById("modal-product");
          if (productSelect) {
            for (let i = 0; i < productSelect.options.length; i++) {
              if (productSelect.options[i].value === productType) {
                productSelect.selectedIndex = i;
                break;
              }
            }
          }
        });
      }
    });
  });

  // Form submission
  const quoteForm = document.getElementById("quote-form");
  const modalQuoteForm = document.getElementById("modal-quote-form");

  const handleFormSubmit = function (event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    // In a real application, you would send this data to a server
    console.log("Form submitted:", formObject);

    // Show success message
    alert("Thank you for your request! We will contact you shortly.");

    // Reset form and close modal if it's the modal form
    event.target.reset();
    if (event.target === modalQuoteForm) {
      quoteModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  };

  if (quoteForm) quoteForm.addEventListener("submit", handleFormSubmit);
  if (modalQuoteForm)
    modalQuoteForm.addEventListener("submit", handleFormSubmit);

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (nav.classList.contains("active")) {
          nav.classList.remove("active");
        }
      }
    });
  });
});
