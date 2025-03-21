<?php
/**
 * Shortcodes for Tendas Mozambique App
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Create shortcode to embed the React app
 * Usage: [tendas_mozambique_app view="home"]
 */
function tendas_mozambique_app_shortcode($atts) {
    // Parse attributes
    $atts = shortcode_atts(array(
        'view' => 'home', // Default view
        'product_id' => '', // Optional product ID
        'width' => '100%', // Container width
        'height' => 'auto', // Container height
    ), $atts);
    
    // Create container for React app with data attributes
    $container = '<div id="tendas-mozambique-root" ' .
                 'data-view="' . esc_attr($atts['view']) . '" ' .
                 'data-product-id="' . esc_attr($atts['product_id']) . '" ' .
                 'style="width: ' . esc_attr($atts['width']) . '; height: ' . esc_attr($atts['height']) . ';"' .
                 '></div>';
    
    // Add the container for React to mount to
    return $container;
}
add_shortcode('tendas_mozambique_app', 'tendas_mozambique_app_shortcode');

/**
 * Create shortcode for specific product display
 * Usage: [tendas_mozambique_product id="1"]
 */
function tendas_mozambique_product_shortcode($atts) {
    // Parse attributes
    $atts = shortcode_atts(array(
        'id' => '', // Product ID
        'width' => '100%', // Container width
        'height' => 'auto', // Container height
    ), $atts);
    
    if (empty($atts['id'])) {
        return '<p>Error: Product ID is required</p>';
    }
    
    // Create container for product display
    $container = '<div id="tendas-mozambique-product-' . esc_attr($atts['id']) . '" ' .
                 'class="tendas-mozambique-product" ' .
                 'data-product-id="' . esc_attr($atts['id']) . '" ' .
                 'style="width: ' . esc_attr($atts['width']) . '; height: ' . esc_attr($atts['height']) . ';"' .
                 '></div>';
    
    return $container;
}
add_shortcode('tendas_mozambique_product', 'tendas_mozambique_product_shortcode');

/**
 * Create shortcode for contact form
 * Usage: [tendas_mozambique_contact_form]
 */
function tendas_mozambique_contact_form_shortcode($atts) {
    // Parse attributes
    $atts = shortcode_atts(array(
        'title' => 'Contact Us', // Form title
        'width' => '100%', // Container width
    ), $atts);
    
    // Create container for contact form
    $container = '<div id="tendas-mozambique-contact-form" ' .
                 'class="tendas-mozambique-contact-form" ' .
                 'data-title="' . esc_attr($atts['title']) . '" ' .
                 'style="width: ' . esc_attr($atts['width']) . ';"' .
                 '></div>';
    
    return $container;
}
add_shortcode('tendas_mozambique_contact_form', 'tendas_mozambique_contact_form_shortcode');

/**
 * Create shortcode for product showcase
 * Usage: [tendas_mozambique_product_showcase]
 */
function tendas_mozambique_product_showcase_shortcode($atts) {
    // Parse attributes
    $atts = shortcode_atts(array(
        'title' => 'Our Products', // Showcase title
        'category' => '', // Optional category filter
        'count' => 6, // Number of products to show
        'width' => '100%', // Container width
    ), $atts);
    
    // Create container for product showcase
    $container = '<div id="tendas-mozambique-product-showcase" ' .
                 'class="tendas-mozambique-product-showcase" ' .
                 'data-title="' . esc_attr($atts['title']) . '" ' .
                 'data-category="' . esc_attr($atts['category']) . '" ' .
                 'data-count="' . esc_attr($atts['count']) . '" ' .
                 'style="width: ' . esc_attr($atts['width']) . ';"' .
                 '></div>';
    
    return $container;
}
add_shortcode('tendas_mozambique_product_showcase', 'tendas_mozambique_product_showcase_shortcode');
