"use client";

import { useMemo, useState } from "react";
import { Calendar } from "@/components/Calendar";
import { slotsForDate, MAX_GUESTS, type Seating } from "@/lib/reservations";

type Status = "idle" | "submitting" | "success" | "error";

const fieldLabel = "mb-3 block text-sm font-medium text-bone";

export function ReserveForm() {
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [seating, setSeating] = useState<Seating>("inside");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const slots = useMemo(() => (date ? slotsForDate(date) : []), [date]);
  const closedDay = date !== null && slots.length === 0;

  function pickDate(next: string) {
    setDate(next);
    setTime((t) => (slotsForDate(next).includes(t) ? t : ""));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!date) return setError("Pick a date for your table.");
    if (!time) return setError("Pick a time.");
    if (name.trim().length < 2) return setError("Add a name for the reservation.");
    if (phone.replace(/\D/g, "").length < 6)
      return setError("Add a phone number we can reach you on.");

    setStatus("submitting");
    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time, guests, seating, name, phone, notes }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");

      // Not sent server-side? Open WhatsApp pre-filled so it still reaches us.
      if (!data.delivered && data.whatsappUrl) {
        window.open(data.whatsappUrl, "_blank", "noopener,noreferrer");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-md rounded-[3px] border border-brass/30 bg-noir/50 p-10 text-center">
        <h3 className="font-display text-3xl text-bone">Request sent</h3>
        <p className="mt-5 text-sm leading-relaxed text-bone-dim">
          You asked for a table for {guests} on {date} at {time},{" "}
          {seating === "inside" ? "inside" : "outside"}. We&apos;ll confirm on WhatsApp.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setTime("");
            setNotes("");
          }}
          className="link-underline mt-6 inline-block text-sm tracking-wide text-brass"
        >
          Book another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl text-left" noValidate>
      <div className="grid gap-8 sm:grid-cols-2">
        {/* Date */}
        <div className="sm:col-span-2">
          <span className={fieldLabel}>Date</span>
          <Calendar selected={date} onSelect={pickDate} />
        </div>

        {/* Time */}
        <div className="sm:col-span-2">
          <span className={fieldLabel}>Time</span>
          {!date ? (
            <p className="text-sm text-muted">Pick a date to see available times.</p>
          ) : closedDay ? (
            <p className="text-sm text-ember">We&apos;re closed that day. Try another date.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {slots.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setTime(s)}
                  aria-pressed={time === s}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    time === s
                      ? "border-brass bg-brass text-noir"
                      : "border-bone/20 text-bone hover:border-bone/50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Guests */}
        <div>
          <label htmlFor="guests" className={fieldLabel}>
            Guests
          </label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
              aria-label="Fewer guests"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/20 text-lg text-bone transition-colors hover:border-bone/50"
            >
              –
            </button>
            <input
              id="guests"
              type="number"
              min={1}
              max={MAX_GUESTS}
              value={guests}
              onChange={(e) =>
                setGuests(Math.min(MAX_GUESTS, Math.max(1, Number(e.target.value) || 1)))
              }
              className="w-16 bg-transparent text-center font-display text-2xl text-bone focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setGuests((g) => Math.min(MAX_GUESTS, g + 1))}
              aria-label="More guests"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/20 text-lg text-bone transition-colors hover:border-bone/50"
            >
              +
            </button>
          </div>
        </div>

        {/* Seating */}
        <div>
          <span className={fieldLabel}>Seating</span>
          <div className="flex gap-2">
            {(["inside", "outside"] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setSeating(opt)}
                aria-pressed={seating === opt}
                className={`flex-1 rounded-[3px] border px-4 py-3 text-sm capitalize transition-colors ${
                  seating === opt
                    ? "border-brass bg-brass/10 text-brass"
                    : "border-bone/20 text-bone hover:border-bone/50"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className={fieldLabel}>
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            placeholder="Your name"
            className="w-full border-b border-bone/20 bg-transparent py-2 text-bone placeholder:text-muted/60 focus:border-brass focus:outline-none"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className={fieldLabel}>
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            placeholder="+383 …"
            className="w-full border-b border-bone/20 bg-transparent py-2 text-bone placeholder:text-muted/60 focus:border-brass focus:outline-none"
          />
        </div>

        {/* Notes */}
        <div className="sm:col-span-2">
          <label htmlFor="notes" className={fieldLabel}>
            Anything to add <span className="text-muted/70 normal-case tracking-normal">(optional)</span>
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            maxLength={500}
            placeholder="Birthday, a quiet corner, allergies, a stroller…"
            className="w-full resize-none rounded-[3px] border border-bone/20 bg-transparent p-3 text-sm text-bone placeholder:text-muted/60 focus:border-brass focus:outline-none"
          />
        </div>
      </div>

      {error && (
        <p className="mt-6 text-center text-sm text-ember" role="alert">
          {error}
        </p>
      )}

      <div className="mt-8 text-center">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-full bg-brass px-9 py-3.5 text-sm font-medium tracking-wide text-noir transition-colors hover:bg-brass-bright disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Reserve a table"}
        </button>
        <p className="mt-4 text-xs text-muted">
          Your request goes to the bar on WhatsApp.
        </p>
      </div>
    </form>
  );
}
