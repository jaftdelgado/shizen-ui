import type { TimeSegments } from "./time-input.types.js";

export function parseValue(v: string): TimeSegments {
  const m = v.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
  if (!m) return { hh: "", mm: "", ap: "AM" };
  const [, hh, mm, ap] = m as [string, string, string, string];
  return { hh: hh.padStart(2, "0"), mm, ap: ap.toUpperCase() as "AM" | "PM" };
}

export function buildTimeString(segments: TimeSegments): string {
  return `${segments.hh}:${segments.mm} ${segments.ap}`;
}
