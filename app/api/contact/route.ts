import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Rate limiting: track requests per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3; // max 3 requests per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (record.count >= MAX_REQUESTS) {
    return true;
  }

  record.count++;
  return false;
}

// Sanitize HTML to prevent XSS
function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char]);
}

// Validate phone format
function isValidPhone(phone: string): boolean {
  const cleanPhone = phone.replace(/[\s-]/g, "");
  return /^(07[0-9]{8}|(\+40|0040)7[0-9]{8})$/.test(cleanPhone);
}

// Validate email format
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ||
               request.headers.get("x-real-ip") ||
               "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Prea multe cereri. Încercați din nou într-un minut." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, phone, email, service, message } = body;

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Numele și telefonul sunt obligatorii" },
        { status: 400 }
      );
    }

    // Validate phone format
    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: "Număr de telefon invalid" },
        { status: 400 }
      );
    }

    // Validate email if provided
    if (email && !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Adresă de email invalidă" },
        { status: 400 }
      );
    }

    // Sanitize all user inputs
    const safeName = escapeHtml(name.trim());
    const safePhone = escapeHtml(phone.trim());
    const safeEmail = email ? escapeHtml(email.trim()) : "";
    const safeService = service ? escapeHtml(service.trim()) : "";
    const safeMessage = message ? escapeHtml(message.trim()).replace(/\n/g, "<br>") : "";

    // Create transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email content with sanitized inputs
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      replyTo: safeEmail || undefined,
      subject: `Programare Nouă - ${safeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3EB489; border-bottom: 2px solid #3EB489; padding-bottom: 10px;">
            Cerere Nouă de Programare
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 150px;">
                Nume:
              </td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                ${safeName}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">
                Telefon:
              </td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                <a href="tel:${safePhone}" style="color: #3EB489;">${safePhone}</a>
              </td>
            </tr>
            ${safeEmail ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">
                Email:
              </td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                <a href="mailto:${safeEmail}" style="color: #3EB489;">${safeEmail}</a>
              </td>
            </tr>
            ` : ""}
            ${safeService ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">
                Serviciu dorit:
              </td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                ${safeService}
              </td>
            </tr>
            ` : ""}
            ${safeMessage ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; vertical-align: top;">
                Mesaj:
              </td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                ${safeMessage}
              </td>
            </tr>
            ` : ""}
          </table>

          <p style="margin-top: 30px; padding: 15px; background-color: #f5f5f5; border-radius: 5px; font-size: 14px; color: #666;">
            Acest email a fost trimis automat de pe site-ul Studio de Zâmbete.
          </p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email trimis cu succes!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Eroare la trimiterea emailului. Încercați din nou." },
      { status: 500 }
    );
  }
}
