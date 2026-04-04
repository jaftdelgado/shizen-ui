export function formatTime(
  iso: string,
  options: Intl.DateTimeFormatOptions = {},
  locale: string | string[] | undefined = undefined
): string {
  if (!iso) return "";

  const parts = iso.split(":").map(Number);
  const [h = 0, m = 0, s = 0] = parts;

  const hasSeconds = parts.length === 3;

  const resolved: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    ...(hasSeconds && { second: "2-digit" }),
    ...options
  };

  return new Intl.DateTimeFormat(locale, resolved).format(new Date(0, 0, 0, h, m, s));
}
