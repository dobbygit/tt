// Follow this setup guide to integrate the Deno runtime into your application:
// https://deno.land/manual/examples/deploy_node_server

interface EmailData {
  to: string;
  from?: string;
  subject: string;
  body: string;
  replyTo?: string;
  name?: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get the email data from the request
    const emailData: EmailData = await req.json();

    // Validate required fields
    if (!emailData.to || !emailData.subject || !emailData.body) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: to, subject, or body",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // In a real implementation, you would use a service like SendGrid, Mailgun, etc.
    // For this example, we'll simulate sending an email

    // Example with SendGrid (commented out as it requires API key setup)
    /*
    const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY');
    if (!SENDGRID_API_KEY) {
      throw new Error('SENDGRID_API_KEY is not set');
    }

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: emailData.to }],
        }],
        from: { email: emailData.from || 'noreply@yourbusiness.com' },
        subject: emailData.subject,
        content: [{
          type: 'text/html',
          value: emailData.body,
        }],
        reply_to: emailData.replyTo ? { email: emailData.replyTo } : undefined,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`SendGrid API error: ${JSON.stringify(errorData)}`);
    }
    */

    // For now, just log the email data and return success
    console.log("Email would be sent with data:", emailData);

    // Return success response
    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    // Return error response
    return new Response(
      JSON.stringify({ error: error.message || "An unknown error occurred" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
