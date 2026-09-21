# WhatsApp reservation notifications (Twilio)

When a customer books at **/visit#reserve**, the site sends a WhatsApp message
with the reservation details (name, date, time, guests, seating, phone, notes)
to the bar's number. Delivery uses **Twilio WhatsApp**.

Without Twilio credentials the site still works — it falls back to opening a
pre-filled `wa.me` link in the customer's browser. Configure Twilio below to get
automatic, hands-off delivery to **+383 48 809097**.

---

## Option A — Twilio Sandbox (free, ~5 minutes, best for testing)

1. Create a free account at <https://www.twilio.com/try-twilio>.
2. In the Console, open **Messaging → Try it out → Send a WhatsApp message**.
3. You'll see a sandbox number (usually `+1 415 523 8886`) and a **join code**
   like `join <two-words>`.
4. From the WhatsApp app on **+383 48 809097**, send that exact join message to
   the sandbox number. This opts the number in to receive messages.
5. Copy these three values into your `.env` (see `.env.example`):

   ```
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
   TWILIO_WHATSAPP_TO=whatsapp:+38348809097
   ```

   - `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN` are on the Console dashboard.
   - `TWILIO_WHATSAPP_FROM` is the sandbox number, prefixed with `whatsapp:`.
   - `TWILIO_WHATSAPP_TO` is the bar's number, prefixed with `whatsapp:`.

6. Restart the dev server. Submit a test reservation — the message lands on
   +383 48 809097 automatically.

> Sandbox note: each recipient must (re)join the sandbox, and the opt-in expires
> after 72 hours of inactivity. Fine for testing; use production for go-live.

---

## Option B — Production WhatsApp sender (for go-live)

1. In the Twilio Console, register a **WhatsApp Sender** (your own business
   number) under **Messaging → Senders → WhatsApp senders**. Requires a Meta
   Business verification — Twilio walks you through it.
2. Replace `TWILIO_WHATSAPP_FROM` with `whatsapp:+<your approved number>`.
3. Recipients no longer need to join a sandbox. Note that business-initiated
   messages outside a 24-hour window require an approved **template**; owner
   notifications to a single fixed number are easiest if that number has the
   chat open, otherwise create a template in the Twilio Console.

---

## How it works in the code

- `src/lib/whatsapp.ts` — `sendWhatsApp()` posts to the Twilio Messages API when
  credentials are present; otherwise returns a `wa.me` deep link.
- `src/app/api/reserve/route.ts` — validates the booking, appends it to
  `data/reservations.jsonl`, then calls `sendWhatsApp()`.
- Credentials are read from environment variables only — never commit `.env`.
