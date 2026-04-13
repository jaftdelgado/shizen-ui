export function toSet(value: string | string[] | undefined): Set<string> {
  if (value == null) return new Set();
  return new Set(Array.isArray(value) ? value : [value]);
}
