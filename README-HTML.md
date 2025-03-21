# Tendas Mozambique Website (HTML/CSS/JavaScript Version)

## Overview
This is a static website for Tendas Mozambique, a company that sells premium PVC products such as tents, tarpaulins, and custom PVC solutions. The website is built using only HTML, CSS, and JavaScript without any frameworks.

## Features
- Responsive design that works on mobile, tablet, and desktop
- Product showcase with detailed product information
- Contact form for quote requests
- Interactive modals for product details and quote requests
- Mobile-friendly navigation

## File Structure
- `index.html` - Main HTML file
- `styles.css` - All styles for the website
- `script.js` - JavaScript functionality
- `/public` - Contains all images and assets

## Setup Instructions
1. Simply open the `index.html` file in a web browser to view the website locally
2. No build process or server is required

## Browser Compatibility
The website is compatible with all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## Customization
- To add new products, update the `productData` object in `script.js`
- To change colors, modify the CSS variables in the `:root` selector in `styles.css`
- To add new pages, create additional HTML files and link them in the navigation

## Contact Form
The contact form currently logs submissions to the console. In a production environment, you would need to:
1. Set up a server to handle form submissions
2. Update the form handling code in `script.js` to send data to your server
3. Implement email notifications or database storage for the submissions

## Credits
- Fonts: Google Fonts (Montserrat and Poppins)
- Icons: Emoji icons for simplicity
- Images: Sample product images in the `/public/images/products` directory