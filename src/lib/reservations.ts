// Reservation domain — shared by the form (client) and the API route (server).
// Slot times are derived from the venue's real opening hours (see site.ts / hours).

export type Seating = "inside" | "outside";

export interface ReservationInput {
  date: string; // YYYY-MM-DD (local)
  time: string; // HH:mm
  guests: number; // 1–20
  seating: Seating;
  name: string;
  phone: string;
  notes?: string;
}

export const MAX_GUESTS = 20;

// Opening hours keyed by JS weekday (0 = Sunday … 6 = Saturday).
// Mirrors `hours` in site.ts. `null` = closed.
const WEEKLY: Record<number, { open: string; close: string } | null> = {
  0: { open: "10:00", close: "18:00" }, // Sunday
  1: { open: "07:00", close: "23:30" }, // Monday
  2: { open: "07:00", close: "23:30" },
  3: { open: "07:00", close: "23:30" },
  4: { open: "07:00", close: "23:30" },
  5: { open: "07:00", close: "23:30" }, // Friday
  6: { open: "16:00", close: "23:30" }, // Saturday
};

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

const toHHMM = (min: number) =>
  `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

// Bookable slots for a given date: every 30 min from open to one hour before
// close (last seating). Returns [] when the venue is closed that day.
export function slotsForDate(dateStr: string): string[] {
  const day = new Date(`${dateStr}T00:00:00`).getDay();
  const h = WEEKLY[day];
  if (!h) return [];
  const start = toMin(h.open);
  const lastSeating = toMin(h.close) - 60;
  const out: string[] = [];
  for (let t = start; t <= lastSeating; t += 30) out.push(toHHMM(t));
  return out;
}

// Local YYYY-MM-DD (avoids the UTC shift of toISOString()).
export function toDateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

// Validate a raw payload coming off the wire. Returns a clean object or an error.
export function validate(
  body: unknown,
): { ok: true; value: ReservationInput } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid request body." };
  const b = body as Record<string, unknown>;

  const date = String(b.date ?? "").trim();
  const time = String(b.time ?? "").trim();
  const seating = String(b.seating ?? "").trim();
  const name = String(b.name ?? "").trim();
  const phone = String(b.phone ?? "").trim();
  const notes = String(b.notes ?? "").trim();
  const guests = Number(b.guests);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { ok: false, error: "Pick a valid date." };
  if (new Date(`${date}T00:00:00`) < startOfToday())
    return { ok: false, error: "The date can't be in the past." };
  if (!slotsForDate(date).includes(time)) return { ok: false, error: "Pick an available time." };
  if (!Number.isInteger(guests) || guests < 1 || guests > MAX_GUESTS)
    return { ok: false, error: `Guests must be between 1 and ${MAX_GUESTS}.` };
  if (seating !== "inside" && seating !== "outside")
    return { ok: false, error: "Choose inside or outside seating." };
  if (name.length < 2) return { ok: false, error: "Please add a name for the table." };
  if (phone.replace(/\D/g, "").length < 6)
    return { ok: false, error: "Please add a phone number we can reach you on." };
  if (notes.length > 500) return { ok: false, error: "Notes are too long." };

  return {
    ok: true,
    value: { date, time, guests, seating, name, phone, notes: notes || undefined },
  };
}

export function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}
