// WhatsApp delivery for new reservations.
//
// Two paths, tried in order:
//   1. Server-side send via Twilio WhatsApp, using credentials from env. Real,
//      automatic notification to the venue — the owner gets a WhatsApp message.
//   2. If Twilio is not configured, we return a wa.me deep link the customer's
//      browser opens — the reservation message still lands in WhatsApp.
//
// Default recipient is the test number; override with WHATSAPP_RECIPIENT.

import type { ReservationInput } from "@/lib/reservations";

const NOTIFY = (process.env.WHATSAPP_RECIPIENT || "38348809097").replace(/\D/g, "");

export function buildMessage(r: ReservationInput): string {
  return [
    "New reservation — Tintin",
    `Name: ${r.name}`,
    `Date: ${r.date}`,
    `Time: ${r.time}`,
    `Guests: ${r.guests}`,
    `Seating: ${r.seating === "inside" ? "Inside" : "Outside"}`,
    r.phone ? `Phone: ${r.phone}` : null,
    r.notes ? `Notes: ${r.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export function waLink(message: string, to: string = NOTIFY): string {
  return `https://wa.me/${to}?text=${encodeURIComponent(message)}`;
}

export interface DeliveryResult {
  delivered: boolean; // true = sent server-side by Twilio
  channel: "twilio" | "link";
  // present when not delivered server-side — the client opens it
  whatsappUrl?: string;
}

export async function sendWhatsApp(message: string): Promise<DeliveryResult> {
  // ── Twilio WhatsApp ─────────────────────────────────────────────
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM } = process.env;
  if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_WHATSAPP_FROM) {
    const to = process.env.TWILIO_WHATSAPP_TO || `whatsapp:+${NOTIFY}`;
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic " + Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ From: TWILIO_WHATSAPP_FROM, To: to, Body: message }),
      },
    );
    if (res.ok) return { delivered: true, channel: "twilio" };
    console.error("[whatsapp] Twilio send failed:", res.status, await res.text());
  }

  // ── Fallback: deep link the client opens ────────────────────────
  return { delivered: false, channel: "link", whatsappUrl: waLink(message) };
}
