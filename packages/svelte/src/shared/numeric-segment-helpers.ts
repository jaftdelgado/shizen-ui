export interface SegmentConfig {
  min: number;
  max: number;
  autoFocusThreshold: number;
}

export interface SegmentInputResult {
  value: string;
  pending: string;
  shouldFocusNext: boolean;
}

export function getNextCyclicValue(
  current: number,
  delta: 1 | -1,
  min: number,
  max: number
): number {
  const range = max - min + 1;
  return ((current - min + delta + range) % range) + min;
}

export function processSegmentInput(
  char: string,
  pending: string,
  config: SegmentConfig
): SegmentInputResult {
  const { min, max, autoFocusThreshold } = config;
  const next = pending + char;
  const digit = parseInt(char);
  const digits = String(max).length;

  if (next.length === 1) {
    const value = String(digit).padStart(2, "0");

    if (digit > autoFocusThreshold) {
      const clamped = Math.max(min, Math.min(max, digit));
      return {
        value: String(clamped).padStart(2, "0"),
        pending: "",
        shouldFocusNext: true
      };
    }

    if (digit === 0 && min > 0) {
      return { value, pending: next, shouldFocusNext: false };
    }

    return { value, pending: next, shouldFocusNext: false };
  }

  if (next.length === digits) {
    let n = parseInt(next);
    n = Math.max(min, Math.min(max, n));
    return {
      value: String(n).padStart(2, "0"),
      pending: "",
      shouldFocusNext: true
    };
  }

  return {
    value: String(parseInt(next)).padStart(2, "0"),
    pending: next,
    shouldFocusNext: false
  };
}
