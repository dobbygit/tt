/**
 * Email Service Adapter
 *
 * This file provides a unified interface for sending emails using Supabase.
 */

import {
  sendEmail,
  sendQuoteRequestEmail,
  sendContactFormEmail,
  QuoteRequestData,
  ContactFormData,
  EmailData,
} from "./emailService";

/**
 * Send an email
 */
export async function sendEmailAdapted(
  data: EmailData
): Promise<{ success: boolean; message: string }> {
  return sendEmail(data);
}

/**
 * Send a quote request email
 */
export async function sendQuoteRequestEmailAdapted(
  data: QuoteRequestData
): Promise<{ success: boolean; message: string }> {
  return sendQuoteRequestEmail(data);
}

/**
 * Send a contact form email
 */
export async function sendContactFormEmailAdapted(
  data: ContactFormData
): Promise<{ success: boolean; message: string }> {
  return sendContactFormEmail(data);
}
