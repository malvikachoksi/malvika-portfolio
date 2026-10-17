import { NextResponse } from "next/server";

// Every submit hits EmailJS, so this route can never be prerendered.
export const dynamic = "force-dynamic";

const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

// Where the contact form lands. Overridable, but this is the real inbox.
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "malvikachoksi55@gmail.com";

const MAX_LENGTHS = { name: 100, email: 254, subject: 150, message: 5000 };

// The endpoint is public now that sending moved server-side (EmailJS's
// allowed-domains list only guards browser calls), so cap submissions per IP.
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

export async function POST(request: Request) {
    const { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, EMAILJS_PRIVATE_KEY } = process.env;

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY || !EMAILJS_PRIVATE_KEY) {
        console.error("[contact] EmailJS env vars are missing — see .env.local");
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
        const res = await fetch(EMAILJS_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // EmailJS rejects server-side calls without a browser-ish origin.
                origin: "http://localhost",
            },
            body: JSON.stringify({
                service_id: EMAILJS_SERVICE_ID,
                template_id: EMAILJS_TEMPLATE_ID,
                user_id: EMAILJS_PUBLIC_KEY,
                // Private key — this is what makes non-browser calls legal.
                accessToken: EMAILJS_PRIVATE_KEY,
                template_params: {
                    to_email: TO_EMAIL,
                    from_name: name,
                    reply_to: email,
                    subject,
                    message,
                },
            }),
        });

        if (!res.ok) {
            const detail = await res.text();
            console.error(`[contact] EmailJS responded ${res.status}: ${detail}`);
            return NextResponse.json({ error: "Could not send your message right now." }, { status: 502 });
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("[contact] EmailJS request failed:", err);
        return NextResponse.json({ error: "Could not send your message right now." }, { status: 502 });
    }
}
