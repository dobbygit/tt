/**
 * WordPress-compatible email service
 * This replaces the Supabase functions with WordPress AJAX/REST API
 */

import { QuoteRequestData, ContactFormData } from "./emailService";

// WordPress data interface (passed from wp_localize_script)
declare global {
  interface Window {
    wpData?: {
      siteUrl: string;
      restUrl: string;
      nonce: string;
      ajaxUrl: string;
    };
  }
}

/**
 * Send an email using WordPress REST API
 */
export async function sendEmailWordPress(data: {
  to: string;
  subject: string;
  body: string;
  from?: string;
  replyTo?: string;
  name?: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    // Check if running in WordPress environment
    if (!window.wpData) {
      throw new Error(
        "WordPress data not available. Are you running in WordPress?",
      );
    }

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

/**
 * Send a quote request email using WordPress
 */
export async function sendQuoteRequestEmailWordPress(
  data: QuoteRequestData,
): Promise<{ success: boolean; message: string }> {
  try {
    // Email to business
    const businessEmailData = {
      to: "garethmostert20@gmail.com", // Business email
      subject: `New Quote Request: ${data.productName}`,
      body: `
        <h2>New Quote Request</h2>
        <p><strong>Product:</strong> ${data.productName}</p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
      replyTo: data.email,
      name: data.name,
    };

    // Email to customer
    const customerEmailData = {
      to: data.email,
      subject: `Your Quote Request for ${data.productName}`,
      body: `
        <h2>Thank You for Your Quote Request</h2>
        <p>Dear ${data.name},</p>
        <p>We have received your request for a quote for ${data.productName}. Our team will review your request and get back to you within 24 hours.</p>
        <p><strong>Your Request Details:</strong></p>
        <p><strong>Product:</strong> ${data.productName}</p>
        <p><strong>Message:</strong> ${data.message}</p>
        <p>If you have any questions in the meantime, please don't hesitate to contact us.</p>
        <p>Best regards,</p>
        <p>The Team</p>
      `,
      from: "noreply@tendasdemozambique.com", // From email
    };

    // Send both emails
    const [businessResponse, customerResponse] = await Promise.all([
      sendEmailWordPress(businessEmailData),
      sendEmailWordPress(customerEmailData),
    ]);

    if (!businessResponse.success || !customerResponse.success) {
      return {
        success: false,
        message: "Failed to send one or more emails",
      };
    }

    return { success: true, message: "Quote request sent successfully" };
  } catch (error) {
    console.error("Error sending quote request emails:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Send a contact form email using WordPress
 */
export async function sendContactFormEmailWordPress(
  data: ContactFormData,
): Promise<{ success: boolean; message: string }> {
  try {
    // Email to business
    const businessEmailData = {
      to: "garethmostert20@gmail.com", // Business email
      subject: `New Contact Form Submission: ${data.subject}`,
      body: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
      replyTo: data.email,
      name: data.name,
    };

    // Email to customer
    const customerEmailData = {
      to: data.email,
      subject: `Your Contact Form Submission: ${data.subject}`,
      body: `
        <h2>Thank You for Contacting Us</h2>
        <p>Dear ${data.name},</p>
        <p>We have received your message. Our team will review it and get back to you as soon as possible.</p>
        <p><strong>Your Message Details:</strong></p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong> ${data.message}</p>
        <p>If you have any additional questions, please don't hesitate to contact us.</p>
        <p>Best regards,</p>
        <p>The Team</p>
      `,
      from: "noreply@tendasdemozambique.com", // From email
    };

    // Send both emails
    const [businessResponse, customerResponse] = await Promise.all([
      sendEmailWordPress(businessEmailData),
      sendEmailWordPress(customerEmailData),
    ]);

    if (!businessResponse.success || !customerResponse.success) {
      return {
        success: false,
        message: "Failed to send one or more emails",
      };
    }

    return { success: true, message: "Contact form submitted successfully" };
  } catch (error) {
    console.error("Error sending contact form emails:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
