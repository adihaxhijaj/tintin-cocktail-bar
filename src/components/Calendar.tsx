"use client";

import { useMemo, useState } from "react";
import { toDateKey, startOfToday } from "@/lib/reservations";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface CalendarProps {
  selected: string | null; // YYYY-MM-DD
  onSelect: (date: string) => void;
}

// A compact, bespoke month picker. Mondays-first (European), past dates muted
// and unclickable. No external date library — keeps the bundle and the look ours.
export function Calendar({ selected, onSelect }: CalendarProps) {
  const today = startOfToday();
  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const cells = useMemo(() => {
    const year = view.getFullYear();
    const month = view.getMonth();
    const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7; // Mon = 0
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const out: (Date | null)[] = Array.from({ length: firstWeekday }, () => null);
    for (let d = 1; d <= daysInMonth; d++) out.push(new Date(year, month, d));
    return out;
  }, [view]);

  const atCurrentMonth =
    view.getFullYear() === today.getFullYear() && view.getMonth() === today.getMonth();

  return (
    <div className="rounded-[3px] border border-bone/12 bg-noir/40 p-4">
      {/* Month nav */}
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
          disabled={atCurrentMonth}
          aria-label="Previous month"
          className="flex h-8 w-8 items-center justify-center rounded-full text-bone transition-colors hover:bg-bone/10 disabled:pointer-events-none disabled:opacity-25"
        >
          ‹
        </button>
        <span className="font-display text-lg text-bone" aria-live="polite">
          {MONTHS[view.getMonth()]} {view.getFullYear()}
        </span>
        <button
          type="button"
          onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
          aria-label="Next month"
          className="flex h-8 w-8 items-center justify-center rounded-full text-bone transition-colors hover:bg-bone/10"
        >
          ›
        </button>
      </div>

      {/* Weekday header */}
      <div className="mb-1 grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((d) => (
          <span key={d} className="py-1 text-[0.65rem] uppercase tracking-wider text-muted">
            {d}
          </span>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <span key={`pad-${i}`} />;
          const key = toDateKey(date);
          const isPast = date < today;
          const isSelected = key === selected;
          return (
            <button
              key={key}
              type="button"
              disabled={isPast}
              aria-pressed={isSelected}
              aria-label={key}
              onClick={() => onSelect(key)}
              className={`aspect-square rounded-full text-sm transition-colors ${
                isSelected
                  ? "bg-brass font-medium text-noir"
                  : isPast
                    ? "cursor-not-allowed text-muted/40"
                    : "text-bone hover:bg-bone/10"
              }`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
