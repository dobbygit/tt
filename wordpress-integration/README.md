# WordPress Integration Guide for Tendas Mozambique React App

This guide explains how to integrate the Tendas Mozambique React application with WordPress.

## Option 1: WordPress as a Headless CMS

### Step 1: Set up WordPress as a Headless CMS
1. Install WordPress on your server
2. Install and activate the WP REST API plugin (if not already included in your WordPress version)
3. Install and activate the JWT Authentication plugin for secure API access

### Step 2: Build and Deploy the React App
1. Build the React app: `npm run build`
2. Deploy the built files to a static hosting service or your own server

### Step 3: Connect React App to WordPress
1. Create API endpoints in WordPress to serve your content
2. Update the React app to fetch content from WordPress API

## Option 2: Embed React App in WordPress

### Step 1: Create a WordPress Plugin
1. Create a new folder in the `wp-content/plugins` directory
2. Create a main PHP file for your plugin with appropriate headers
3. Register scripts and styles for your React app

### Step 2: Build the React App for WordPress
1. Configure the build process to output files to your plugin directory
2. Update asset paths to work within WordPress

### Step 3: Create a Shortcode to Embed the App
1. Register a shortcode in your plugin
2. Use the shortcode to embed the React app in WordPress pages/posts

## Example Plugin Structure

```
wp-content/plugins/tendas-mozambique-app/
├── tendas-mozambique-app.php (main plugin file)
├── build/ (React app build output)
│   ├── static/
│   ├── index.html
│   └── ...
└── includes/
    └── shortcodes.php
```

## Example Main Plugin File

```php
<?php
/**
 * Plugin Name: Tendas Mozambique App
 * Description: Integrates the Tendas Mozambique React application with WordPress
 * Version: 1.0.0
 * Author: Your Name
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Include shortcodes
require_once plugin_dir_path(__FILE__) . 'includes/shortcodes.php';

// Register scripts and styles
function tendas_mozambique_register_scripts() {
    $build_dir = plugin_dir_url(__FILE__) . 'build/';
    
    // Enqueue main JS and CSS files
    wp_enqueue_script('tendas-mozambique-main-js', $build_dir . 'static/js/main.js', array(), '1.0.0', true);
    wp_enqueue_style('tendas-mozambique-main-css', $build_dir . 'static/css/main.css', array(), '1.0.0');
    
    // Pass WordPress data to the React app
    wp_localize_script('tendas-mozambique-main-js', 'wpData', array(
        'siteUrl' => get_site_url(),
        'restUrl' => get_rest_url(),
        'nonce' => wp_create_nonce('wp_rest')
    ));
}
add_action('wp_enqueue_scripts', 'tendas_mozambique_register_scripts');
```

## Example Shortcode File

```php
<?php
// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Create shortcode to embed the React app
function tendas_mozambique_app_shortcode($atts) {
    // Parse attributes
    $atts = shortcode_atts(array(
        'view' => 'home', // Default view
    ), $atts);
    
    // Create container for React app
    return '<div id="tendas-mozambique-root" data-view="' . esc_attr($atts['view']) . '"></div>';
}
add_shortcode('tendas_mozambique_app', 'tendas_mozambique_app_shortcode');
```

## Modifications Needed in React App

1. Update the React app to mount to the container provided by the shortcode
2. Adjust routing to work within WordPress URL structure
3. Update API endpoints to use WordPress REST API

## Notes

- The headless CMS approach provides cleaner separation but requires two separate systems
- The embedded approach keeps everything in WordPress but may have limitations with routing
- Consider using WordPress REST API for dynamic content while keeping the UI in React
