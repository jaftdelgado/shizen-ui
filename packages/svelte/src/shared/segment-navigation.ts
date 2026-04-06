import { getNextCyclicValue, processSegmentInput } from "./numeric-segment-helpers.js";
import type { SegmentConfig } from "./numeric-segment-helpers.js";

export interface SegmentRefs {
  prev: () => HTMLElement | null;
  next: () => HTMLElement | null;
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
  /** Called when a segment is explicitly cleared by the user (Backspace/Delete to empty).
   *  Use this to prevent external value sync from restoring the old value on blur. */
  onDirty?: () => void;
};

export function createSegmentKeydownHandler(opts: SegmentNavigationOptions) {
  return (e: KeyboardEvent) => {
    if (e.key === "Tab") return;
    e.preventDefault();

    if (e.key === "ArrowRight") {
      opts.refs.next()?.focus();
      return;
    }

    if (e.key === "ArrowLeft") {
      opts.refs.prev()?.focus();
      return;
    }

    if (e.key === "Backspace" || e.key === "Delete") {
      if (opts.type === "numeric") {
        const current = opts.getValue();
        const n = parseInt(current);

        if (current === "") {
          // Already empty → go to previous segment
          opts.refs.prev()?.focus();
        } else if (n >= 10) {
          // Two meaningful digits (e.g. "16", "42") → peel last → "01", "04"
          const peeled = Math.floor(n / 10);
          opts.setValue(String(peeled).padStart(2, "0"));
          opts.setPending(String(peeled));
          // Mark dirty so the $effect doesn't restore the old value on blur,
          // and commit so value updates immediately (e.g. "08:30" → "08:03").
          opts.onDirty?.();
          opts.onCommit();
        } else {
          // Single meaningful digit (e.g. "06", "01", "00") → clear → "--"
          opts.setValue("");
          opts.setPending("");
          opts.onDirty?.();
          opts.onCommit();
        }
      } else {
        // Options segment (AM/PM): reset to first option and go back
        opts.setValue(opts.options[0] as string);
        opts.onCommit();
        opts.refs.prev()?.focus();
      }
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

      // Always commit so the parent value updates in real time (e.g. typing "1"
      // shows "01:30" in the description without waiting for focus to move).
      opts.onCommit();

      if (result.shouldFocusNext) {
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
  onCommit?: () => void;
  onDirty?: () => void;
}) {
  return () => {
    const hadPending = !!opts.getPending?.();
    opts.setPending?.("");
    if (!opts.getValue()) {
      opts.setValue("");
    } else if (hadPending) {
      // User blurred mid-entry (e.g. typed "1" without completing to "12").
      // The segment already has a padded value ("01") — commit and mark dirty
      // so the $effect doesn't restore the old external value.
      opts.onDirty?.();
      opts.onCommit?.();
    }
  };
}

export function createSegmentMousedownHandler(isDisabled: () => boolean) {
  return (e: MouseEvent) => {
    if (isDisabled()) {
      // Prevent focus entirely when disabled — contenteditable="false" still
      // allows focus on click without this.
      e.preventDefault();
      return;
    }
    const target = e.target as HTMLElement;
    if (document.activeElement === target) return;
    e.preventDefault();
    target.focus();
  };
}
