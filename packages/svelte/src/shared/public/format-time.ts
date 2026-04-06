export function formatTime(
  iso: string,
  options: Intl.DateTimeFormatOptions = {},
  locale: string | string[] | undefined = undefined
): string {
  if (!iso) return "";

  // Reject values that don't match HH:MM or HH:MM:SS
  if (!/^\d{1,2}:\d{2}(:\d{2})?$/.test(iso)) return "";

  const parts = iso.split(":").map(Number);
  const [h = 0, m = 0, s = 0] = parts;

  // Validate ranges to prevent Date overflow arithmetic (e.g. "25:99" → 2:39 AM)
  if (h > 23 || m > 59 || s > 59) return "";

  const hasSeconds = parts.length === 3;

  const resolved: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    ...(hasSeconds && { second: "2-digit" }),
    ...options
  };

  return new Intl.DateTimeFormat(locale, resolved).format(new Date(0, 0, 0, h, m, s));
}
