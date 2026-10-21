import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Every submit sends mail, so this route can never be prerendered.
export const dynamic = "force-dynamic";

// Where the contact form lands. Overridable, but this is the real inbox.
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "malvikachoksi55@gmail.com";

const MAX_LENGTHS = { name: 100, email: 254, subject: 150, message: 5000 };

// The endpoint is public, so cap submissions per IP.
// In-memory: resets on redeploy and is per-instance, which is fine for a
// portfolio — swap for Upstash/Redis if this ever runs multi-region.
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
    if (recent.length >= RATE_LIMIT.max) {
        hits.set(ip, recent);
        return true;
    }
    recent.push(now);
    hits.set(ip, recent);
    // Keep the map from growing without bound on a long-lived instance.
    if (hits.size > 500) {
        for (const [key, times] of hits) {
            if (times.every((t) => now - t >= RATE_LIMIT.windowMs)) hits.delete(key);
        }
    }
    return false;
}

function clean(value: unknown, max: number) {
    return typeof value === "string" ? value.trim().slice(0, max) : "";
}

// Every field is visitor-controlled and ends up in HTML.
function escapeHtml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// Tables + inline styles: Gmail and Outlook strip <style> blocks and flexbox.
function renderEmail({ name, email, subject, message }: Record<"name" | "email" | "subject" | "message", string>) {
    const row = (label: string, value: string) => `
        <tr>
            <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;width:90px;vertical-align:top;font-size:13px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">${label}</td>
            <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;font-size:15px;color:#0f172a;">${value}</td>
        </tr>`;
    const safeEmail = escapeHtml(email);
    const sentAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });

    return `<!doctype html>
<html>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
                    <tr>
                        <td style="background:#0f172a;padding:24px 32px;">
                            <div style="font-size:20px;font-weight:700;color:#60a5fa;">Malvika.</div>
                            <div style="margin-top:4px;font-size:14px;color:#cbd5e1;">New message from your portfolio contact form</div>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:24px 32px 8px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                ${row("Name", escapeHtml(name))}
                                ${row("Email", `<a href="mailto:${safeEmail}" style="color:#2563eb;text-decoration:none;">${safeEmail}</a>`)}
                                ${row("Subject", escapeHtml(subject))}
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:16px 32px 8px;">
                            <div style="font-size:13px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Message</div>
                            <div style="margin-top:8px;padding:16px;background:#f8fafc;border-left:4px solid #60a5fa;border-radius:6px;font-size:15px;line-height:1.6;color:#0f172a;white-space:pre-wrap;">${escapeHtml(message)}</div>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:24px 32px 32px;">
                            <a href="mailto:${safeEmail}?subject=${encodeURIComponent(`Re: ${subject}`)}" style="display:inline-block;padding:12px 24px;background:#60a5fa;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;border-radius:8px;">Reply to ${escapeHtml(name)}</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:16px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;font-size:12px;color:#94a3b8;">Received ${sentAt} IST</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}

export async function POST(request: Request) {
    const { SMTP_USER, SMTP_PASS } = process.env;

    if (!SMTP_USER || !SMTP_PASS) {
        console.error("[contact] SMTP env vars are missing — see .env.local");
        return NextResponse.json({ error: "Email is not configured on the server." }, { status: 500 });
    }

    const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
        request.headers.get("x-real-ip") ||
        "unknown";

    if (isRateLimited(ip)) {
        return NextResponse.json(
            { error: "Too many messages. Please try again in a few minutes." },
            { status: 429 }
        );
    }

    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const payload = body as Record<string, unknown>;
    const name = clean(payload.name, MAX_LENGTHS.name);
    const email = clean(payload.email, MAX_LENGTHS.email);
    const subject = clean(payload.subject, MAX_LENGTHS.subject);
    const message = clean(payload.message, MAX_LENGTHS.message);

    if (!name || !email || !subject || !message) {
        return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { user: SMTP_USER, pass: SMTP_PASS },
        });

        await transporter.sendMail({
            // Gmail rewrites any other From to the authenticated account anyway.
            from: `"${name.replace(/"/g, "")} via Portfolio" <${SMTP_USER}>`,
            to: TO_EMAIL,
            replyTo: email,
            subject: `[Portfolio] ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
            html: renderEmail({ name, email, subject, message }),
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("[contact] SMTP send failed:", err);
        return NextResponse.json({ error: "Could not send your message right now." }, { status: 502 });
    }
}
