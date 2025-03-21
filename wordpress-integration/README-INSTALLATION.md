# Tendas Mozambique WordPress Plugin Installation Guide

## Prerequisites

- WordPress 5.8 or higher
- PHP 7.4 or higher

## Installation Steps

### Method 1: Install via WordPress Admin

1. Log in to your WordPress admin dashboard
2. Navigate to Plugins > Add New
3. Click the "Upload Plugin" button at the top of the page
4. Click "Choose File" and select the `tendas-mozambique-app.zip` file
5. Click "Install Now"
6. After installation completes, click "Activate Plugin"

### Method 2: Manual Installation

1. Unzip the `tendas-mozambique-app.zip` file
2. Upload the `tendas-mozambique-app` folder to your `/wp-content/plugins/` directory via FTP
3. Log in to your WordPress admin dashboard
4. Navigate to Plugins
5. Find "Tendas Mozambique App" in the list and click "Activate"

## Using the Plugin

After installation, you can use the following shortcodes to embed the Tendas Mozambique app in your WordPress pages or posts:

### Main App Shortcode

```
[tendas_mozambique_app view="home"]
```

Options:
- `view`: The view to display (home, product, contact, products)
- `product_id`: Product ID (required when view="product")
- `width`: Container width (default: 100%)
- `height`: Container height (default: auto)

### Product Display Shortcode

```
[tendas_mozambique_product id="1"]
```

Options:
- `id`: Product ID (required)
- `width`: Container width (default: 100%)
- `height`: Container height (default: auto)

### Contact Form Shortcode

```
[tendas_mozambique_contact_form]
```

Options:
- `title`: Form title (default: Contact Us)
- `width`: Container width (default: 100%)

### Product Showcase Shortcode

```
[tendas_mozambique_product_showcase]
```

Options:
- `title`: Showcase title (default: Our Products)
- `category`: Optional category filter
- `count`: Number of products to show (default: 6)
- `width`: Container width (default: 100%)

## Example Usage

### Home Page

```
[tendas_mozambique_app view="home"]
```

### Product Page

```
[tendas_mozambique_app view="product" product_id="1"]
```

### Contact Page

```
[tendas_mozambique_contact_form title="Get in Touch"]
```

### Products Page with Showcase

```
[tendas_mozambique_product_showcase title="Our Premium Tents" category="Tents" count="4"]
```

## Troubleshooting

### Email Functionality

The plugin uses WordPress's built-in `wp_mail()` function for sending emails. If emails are not being sent:

1. Install an SMTP plugin like "WP Mail SMTP" to configure proper email delivery
2. Check your server's mail configuration
3. Verify that the email addresses are valid

### Styling Issues

If you experience styling conflicts with your theme:

1. Add custom CSS in the WordPress Customizer
2. Edit your theme's style.css file
3. Use a plugin like "Simple Custom CSS" to add overriding styles

### JavaScript Errors

If you see JavaScript errors in the browser console:

1. Make sure jQuery is loaded in your theme
2. Check for conflicts with other plugins
3. Try disabling other JavaScript-heavy plugins temporarily

## Support

For support, please contact us at garethmostert20@gmail.com
