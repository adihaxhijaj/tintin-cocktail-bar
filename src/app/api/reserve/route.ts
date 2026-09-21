import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { validate } from "@/lib/reservations";
import { buildMessage, sendWhatsApp } from "@/lib/whatsapp";

export const runtime = "nodejs";

// Append the reservation to a local JSONL log. Best-effort — a write failure
// must not block the WhatsApp notification.
async function persist(record: object) {
  try {
    const dir = path.join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "reservations.jsonl"), JSON.stringify(record) + "\n", "utf8");
  } catch (err) {
    console.error("[reserve] persist failed:", err);
  }
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = validate(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  const reservation = parsed.value;
  const message = buildMessage(reservation);

  await persist({ ...reservation, receivedAt: new Date().toISOString() });

  let delivery;
  try {
    delivery = await sendWhatsApp(message);
  } catch (err) {
    console.error("[reserve] whatsapp send threw:", err);
    delivery = { delivered: false, channel: "link" as const };
  }

  return NextResponse.json({
    ok: true,
    delivered: delivery.delivered,
    channel: delivery.channel,
    whatsappUrl: delivery.whatsappUrl,
  });
}
