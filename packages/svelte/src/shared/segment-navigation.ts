import { getNextCyclicValue, processSegmentInput } from "./numeric-segment-helpers.js";
import type { SegmentConfig } from "./numeric-segment-helpers.js";

export interface SegmentRefs {
  prev: () => HTMLInputElement | null;
  next: () => HTMLInputElement | null;
}

interface NumericSegmentOptions {
  type: "numeric";
  config: SegmentConfig;
  getValue: () => string;
  getPending: () => string;
  setValue: (v: string) => void;
  setPending: (v: string) => void;
}

interface OptionsSegmentOptions {
  type: "options";
  options: readonly string[];
  getValue: () => string;
  setValue: (v: string) => void;
  keyMap?: Record<string, string>;
}

export type SegmentNavigationOptions = (NumericSegmentOptions | OptionsSegmentOptions) & {
  refs: SegmentRefs;
  onCommit: () => void;
};

export function createSegmentKeydownHandler(opts: SegmentNavigationOptions) {
  return (e: KeyboardEvent) => {
    if (e.key === "Tab") return;
    e.preventDefault();

    if (e.key === "ArrowRight") {
      opts.refs.next()?.focus();
      return;
    }

    const isEmpty = opts.type === "numeric" ? !opts.getPending() && !opts.getValue() : false;

    if (e.key === "ArrowLeft" || (e.key === "Backspace" && isEmpty)) {
      opts.refs.prev()?.focus();
      return;
    }

    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      const delta = e.key === "ArrowUp" ? 1 : -1;

      if (opts.type === "numeric") {
        const n = parseInt(opts.getValue() || String(opts.config.min));
        const next = getNextCyclicValue(n, delta, opts.config.min, opts.config.max);
        opts.setValue(String(next).padStart(2, "0"));
        opts.onCommit();
      } else {
        const idx = opts.options.indexOf(opts.getValue());
        const next = opts.options[(idx + delta + opts.options.length) % opts.options.length];
        opts.setValue(next as string);
        opts.onCommit();
      }
      return;
    }

    if (opts.type === "numeric" && /^\d$/.test(e.key)) {
      const result = processSegmentInput(e.key, opts.getPending(), opts.config);
      opts.setValue(result.value);
      opts.setPending(result.pending);

      if (result.shouldFocusNext) {
        opts.onCommit();
        opts.refs.next()?.focus();
      }
      return;
    }

    if (opts.type === "options" && opts.keyMap) {
      const mapped = opts.keyMap[e.key.toLowerCase()];
      if (mapped) {
        opts.setValue(mapped);
        opts.onCommit();
      }
    }
  };
}

export function createSegmentBlurHandler(opts: {
  getPending?: () => string;
  setPending?: (v: string) => void;
  getValue: () => string;
  setValue: (v: string) => void;
}) {
  return () => {
    opts.setPending?.("");
    if (!opts.getValue()) opts.setValue("");
  };
}

export function createSegmentMousedownHandler(isDisabled: () => boolean) {
  return (e: MouseEvent) => {
    if (isDisabled()) return;
    const target = e.target as HTMLInputElement;
    if (document.activeElement === target) return;
    e.preventDefault();
    target.focus();
  };
}
