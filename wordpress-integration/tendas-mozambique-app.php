<?php
/**
 * Plugin Name: Tendas Mozambique App
 * Description: Integrates the Tendas Mozambique React application with WordPress
 * Version: 1.0.0
 * Author: Your Name
 * Text Domain: tendas-mozambique-app
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Include shortcodes
require_once plugin_dir_path(__FILE__) . 'includes/shortcodes.php';

// Register scripts and styles
function tendas_mozambique_register_scripts() {
    // Only enqueue on pages that use our shortcode
    global $post;
    if (is_a($post, 'WP_Post') && has_shortcode($post->post_content, 'tendas_mozambique_app')) {
        $build_dir = plugin_dir_url(__FILE__) . 'build/';
        
        // Get all JS files from the build directory
        $js_files = glob(plugin_dir_path(__FILE__) . 'build/assets/*.js');
        foreach ($js_files as $js_file) {
            $filename = basename($js_file);
            $handle = 'tendas-mozambique-' . $filename;
            wp_enqueue_script($handle, $build_dir . 'assets/' . $filename, array(), '1.0.0', true);
        }
        
        // Get all CSS files from the build directory
        $css_files = glob(plugin_dir_path(__FILE__) . 'build/assets/*.css');
        foreach ($css_files as $css_file) {
            $filename = basename($css_file);
            $handle = 'tendas-mozambique-' . $filename;
            wp_enqueue_style($handle, $build_dir . 'assets/' . $filename, array(), '1.0.0');
        }
        
        // Pass WordPress data to the React app
        wp_localize_script('tendas-mozambique-main', 'wpData', array(
            'siteUrl' => get_site_url(),
            'restUrl' => get_rest_url(),
            'nonce' => wp_create_nonce('wp_rest'),
            'ajaxUrl' => admin_url('admin-ajax.php')
        ));
    }
}
add_action('wp_enqueue_scripts', 'tendas_mozambique_register_scripts');

// Register REST API endpoints
function tendas_mozambique_register_rest_routes() {
    register_rest_route('tendas-mozambique/v1', '/send-email', array(
        'methods' => 'POST',
        'callback' => 'tendas_mozambique_send_email',
        'permission_callback' => '__return_true'
    ));
}
add_action('rest_api_init', 'tendas_mozambique_register_rest_routes');

// Email sending function for REST API
function tendas_mozambique_send_email($request) {
    $params = $request->get_params();
    
    // Validate required fields
    if (empty($params['to']) || empty($params['subject']) || empty($params['body'])) {
        return new WP_Error('missing_fields', 'Missing required fields', array('status' => 400));
    }
    
    $to = sanitize_email($params['to']);
    $subject = sanitize_text_field($params['subject']);
    $body = wp_kses_post($params['body']);
    
    $headers = array('Content-Type: text/html; charset=UTF-8');
    
    if (!empty($params['from'])) {
        $headers[] = 'From: ' . sanitize_email($params['from']);
    }
    
    if (!empty($params['replyTo'])) {
        $headers[] = 'Reply-To: ' . sanitize_email($params['replyTo']);
    }
    
    $sent = wp_mail($to, $subject, $body, $headers);
    
    if ($sent) {
        return array(
            'success' => true,
            'message' => 'Email sent successfully'
        );
    } else {
        return new WP_Error('email_failed', 'Failed to send email', array('status' => 500));
    }
}

// Add AJAX endpoint for email sending (alternative to REST API)
function tendas_mozambique_ajax_send_email() {
    // Check nonce for security
    check_ajax_referer('tendas_mozambique_nonce', 'nonce');
    
    $to = sanitize_email($_POST['to']);
    $subject = sanitize_text_field($_POST['subject']);
    $body = wp_kses_post($_POST['body']);
    
    $headers = array('Content-Type: text/html; charset=UTF-8');
    
    if (!empty($_POST['from'])) {
        $headers[] = 'From: ' . sanitize_email($_POST['from']);
    }
    
    if (!empty($_POST['replyTo'])) {
        $headers[] = 'Reply-To: ' . sanitize_email($_POST['replyTo']);
    }
    
    $sent = wp_mail($to, $subject, $body, $headers);
    
    if ($sent) {
        wp_send_json_success(array('message' => 'Email sent successfully'));
    } else {
        wp_send_json_error(array('message' => 'Failed to send email'));
    }
    
    wp_die();
}
add_action('wp_ajax_tendas_mozambique_send_email', 'tendas_mozambique_ajax_send_email');
add_action('wp_ajax_nopriv_tendas_mozambique_send_email', 'tendas_mozambique_ajax_send_email');
