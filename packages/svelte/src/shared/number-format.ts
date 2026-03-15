export function resolveLocale(locale?: string): string {
  return locale ?? (typeof navigator !== "undefined" ? navigator.language : "en");
}

export function formatValue(
  v: number,
  locale: string,
  formatOptions?: Intl.NumberFormatOptions
): string {
  if (!formatOptions) return String(v);
  return new Intl.NumberFormat(locale, formatOptions).format(v);
}

export function parseValue(
  raw: string,
  locale: string,
  formatOptions?: Intl.NumberFormatOptions
): number | null {
  if (!formatOptions) {
    const n = parseFloat(raw);
    return Number.isNaN(n) ? null : n;
  }

  const parts = new Intl.NumberFormat(locale).formatToParts(1234567.89);
  const group = parts.find((p) => p.type === "group")?.value ?? ",";
  const decimal = parts.find((p) => p.type === "decimal")?.value ?? ".";

  const groupRegex = new RegExp(`\\${group}`, "g");
  const cleaned = raw
    .replace(groupRegex, "")
    .replace(decimal, ".")
    .replace(/[^0-9.\-]/g, "");

  const n = parseFloat(cleaned);
  return Number.isNaN(n) ? null : n;
}
