// This file is kept as a placeholder to prevent import errors
// It will be removed in a future cleanup

import { QuoteRequestData, ContactFormData } from "./emailService";

// Empty implementations to prevent errors
export async function sendEmailWordPress(): Promise<{
  success: boolean;
  message: string;
}> {
  return { success: false, message: "WordPress integration removed" };
}

export async function sendQuoteRequestEmailWordPress(): Promise<{
  success: boolean;
  message: string;
}> {
  return { success: false, message: "WordPress integration removed" };
}

export async function sendContactFormEmailWordPress(): Promise<{
  success: boolean;
  message: string;
}> {
  return { success: false, message: "WordPress integration removed" };
}
