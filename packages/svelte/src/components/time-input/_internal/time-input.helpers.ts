import type { TimeSegments } from "./time-input.types.js";

function isoToSegments12h(hh24: number, mm: string, ss: string): TimeSegments {
  const ap = hh24 >= 12 ? "PM" : "AM";
  const hh12 = hh24 % 12 === 0 ? 12 : hh24 % 12;
  return { hh: String(hh12).padStart(2, "0"), mm, ss, ap };
}

function isoToSegments24h(hh24: number, mm: string, ss: string): TimeSegments {
  return { hh: String(hh24).padStart(2, "0"), mm, ss, ap: "" };
}

function segments12hToIso(segments: TimeSegments, showSeconds: boolean): string {
  const hh = parseInt(segments.hh);
  const ap = segments.ap as "AM" | "PM";
  let hh24: number;

  if (ap === "AM") {
    hh24 = hh === 12 ? 0 : hh;
  } else {
    hh24 = hh === 12 ? 12 : hh + 12;
  }

  const base = `${String(hh24).padStart(2, "0")}:${segments.mm}`;
  return showSeconds ? `${base}:${segments.ss}` : base;
}

function segments24hToIso(segments: TimeSegments, showSeconds: boolean): string {
  const base = `${segments.hh}:${segments.mm}`;
  return showSeconds ? `${base}:${segments.ss}` : base;
}

export function parseValue(v: string, hour12: boolean): TimeSegments {
  const isoS = v.match(/^(\d{1,2}):(\d{2}):(\d{2})$/);
  if (isoS) {
    const [, hh, mm, ss] = isoS as [string, string, string, string];
    const hh24 = parseInt(hh);
    return hour12 ? isoToSegments12h(hh24, mm, ss) : isoToSegments24h(hh24, mm, ss);
  }

  const iso = v.match(/^(\d{1,2}):(\d{2})$/);
  if (iso) {
    const [, hh, mm] = iso as [string, string, string];
    const hh24 = parseInt(hh);
    return hour12 ? isoToSegments12h(hh24, mm, "") : isoToSegments24h(hh24, mm, "");
  }

  return { hh: "", mm: "", ss: "", ap: hour12 ? "AM" : "" };
}

export function buildTimeString(
  segments: TimeSegments,
  showSeconds: boolean,
  hour12: boolean
): string {
  return hour12 ? segments12hToIso(segments, showSeconds) : segments24hToIso(segments, showSeconds);
}
