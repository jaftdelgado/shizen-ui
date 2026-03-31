import type { InputVariants } from "@shizen-ui/styles";
import { useFieldStateContext, useSurfaceContext } from "../../contexts/index.js";
import { useInputGroupContext } from "../../contexts/internal/index.js";

export interface TimeInputProps {
  size?: InputVariants["size"];
  variant?: InputVariants["variant"];
  value?: string;
  invalid?: boolean;
  disabled?: boolean;
  id?: string;
  class?: string;
  onchange?: (value: string) => void;
}

export interface TimeSegments {
  hh: string;
  mm: string;
  ap: "AM" | "PM";
}

export type PropsGetters = {
  readonly size: InputVariants["size"];
  readonly variant: InputVariants["variant"] | undefined;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly id: string | undefined;
};

export type RefsGetters = {
  readonly hhInput: HTMLInputElement | null;
  readonly mmInput: HTMLInputElement | null;
  readonly apInput: HTMLInputElement | null;
};

export type DerivedGetters = {
  readonly finalDisabled: boolean;
};

export function parseValue(v: string): TimeSegments {
  const m = v.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
  if (!m) return { hh: "", mm: "", ap: "AM" };
  const [, hh, mm, ap] = m as [string, string, string, string];
  return { hh: hh.padStart(2, "0"), mm, ap: ap.toUpperCase() as "AM" | "PM" };
}

export function useTimeInputContext() {
  const fieldContext = useFieldStateContext();
  const groupContext = useInputGroupContext();
  const surfaceContext = useSurfaceContext();
  return { fieldContext, groupContext, surfaceContext };
}

export function useDerivedState(
  props: PropsGetters,
  fieldContext: ReturnType<typeof useFieldStateContext>,
  groupContext: ReturnType<typeof useInputGroupContext>,
  surfaceContext: ReturnType<typeof useSurfaceContext>
) {
  const finalVariant = $derived(props.variant ?? (surfaceContext.exists ? "secondary" : "default"));

  const finalInvalid = $derived(
    fieldContext.exists
      ? fieldContext.invalid
      : groupContext.exists
        ? groupContext.invalid || props.invalid
        : props.invalid
  );

  const finalDisabled = $derived(
    fieldContext.exists
      ? fieldContext.disabled
      : groupContext.exists
        ? groupContext.disabled || props.disabled
        : props.disabled
  );

  const finalId = $derived(props.id ?? (fieldContext.exists ? fieldContext.id : undefined));

  const activeSize = $derived(groupContext.exists ? groupContext.size : props.size);

  const descriptionId = $derived(
    fieldContext.exists && fieldContext.id ? `${fieldContext.id}-description` : undefined
  );

  const errorId = $derived(
    fieldContext.exists && fieldContext.id ? `${fieldContext.id}-error` : undefined
  );

  return {
    get finalVariant() {
      return finalVariant;
    },
    get finalInvalid() {
      return finalInvalid;
    },
    get finalDisabled() {
      return finalDisabled;
    },
    get finalId() {
      return finalId;
    },
    get activeSize() {
      return activeSize;
    },
    get descriptionId() {
      return descriptionId;
    },
    get errorId() {
      return errorId;
    }
  };
}

export function useSegments(initialValue: string) {
  let segments = $state<TimeSegments>(parseValue(initialValue));
  let hhPending = $state("");
  let mmPending = $state("");

  return {
    get segments() {
      return segments;
    },
    get hhPending() {
      return hhPending;
    },
    get mmPending() {
      return mmPending;
    },
    setSegments(next: Partial<TimeSegments>) {
      Object.assign(segments, next);
    },
    setHhPending(v: string) {
      hhPending = v;
    },
    setMmPending(v: string) {
      mmPending = v;
    }
  };
}

export function useTimeInputHandlers(
  state: ReturnType<typeof useSegments>,
  refs: RefsGetters,
  derived: DerivedGetters,
  emitFn: () => void
) {
  function onHhKeydown(e: KeyboardEvent) {
    if (e.key === "Tab") return;
    e.preventDefault();

    if (e.key === "ArrowRight") {
      refs.mmInput?.focus();
      return;
    }
    if (e.key === "ArrowLeft") return;

    if (e.key === "ArrowUp") {
      const n = parseInt(state.segments.hh || "0");
      state.setSegments({ hh: String(n < 12 ? n + 1 : 1).padStart(2, "0") });
      emitFn();
      return;
    }
    if (e.key === "ArrowDown") {
      const n = parseInt(state.segments.hh || "0");
      state.setSegments({ hh: String(n > 1 ? n - 1 : 12).padStart(2, "0") });
      emitFn();
      return;
    }
    if (!/^\d$/.test(e.key)) return;

    const next = state.hhPending + e.key;
    state.setHhPending(next);

    if (next.length === 1) {
      state.setSegments({ hh: "0" + next });
      if (parseInt(next) > 1) {
        state.setHhPending("");
        emitFn();
        refs.mmInput?.focus();
      }
    } else if (next.length === 2) {
      let n = parseInt(next);
      if (n < 1) n = 1;
      if (n > 12) n = 12;
      state.setSegments({ hh: String(n).padStart(2, "0") });
      state.setHhPending("");
      emitFn();
      refs.mmInput?.focus();
    }
  }

  function onHhBlur() {
    state.setHhPending("");
    if (!state.segments.hh) state.setSegments({ hh: "" });
  }

  function onMmKeydown(e: KeyboardEvent) {
    if (e.key === "Tab") return;
    e.preventDefault();

    if (e.key === "ArrowRight") {
      refs.apInput?.focus();
      return;
    }
    if (
      e.key === "ArrowLeft" ||
      (e.key === "Backspace" && !state.mmPending && !state.segments.mm)
    ) {
      refs.hhInput?.focus();
      return;
    }

    if (e.key === "ArrowUp") {
      const n = parseInt(state.segments.mm || "0");
      state.setSegments({ mm: String((n + 1) % 60).padStart(2, "0") });
      emitFn();
      return;
    }
    if (e.key === "ArrowDown") {
      const n = parseInt(state.segments.mm || "0");
      state.setSegments({ mm: String((n + 59) % 60).padStart(2, "0") });
      emitFn();
      return;
    }
    if (!/^\d$/.test(e.key)) return;

    const next = state.mmPending + e.key;
    state.setMmPending(next);

    if (next.length === 1) {
      state.setSegments({ mm: "0" + next });
      if (parseInt(next) > 5) {
        state.setMmPending("");
        emitFn();
        refs.apInput?.focus();
      }
    } else if (next.length === 2) {
      let n = parseInt(next);
      if (n > 59) n = 59;
      state.setSegments({ mm: String(n).padStart(2, "0") });
      state.setMmPending("");
      emitFn();
      refs.apInput?.focus();
    }
  }

  function onMmBlur() {
    state.setMmPending("");
    if (!state.segments.mm) state.setSegments({ mm: "" });
  }

  function onApKeydown(e: KeyboardEvent) {
    if (e.key === "Tab") return;
    e.preventDefault();

    if (e.key === "ArrowLeft" || e.key === "Backspace") {
      refs.mmInput?.focus();
      return;
    }
    if (e.key === "ArrowRight") return;

    if (e.key === "a" || e.key === "A") {
      state.setSegments({ ap: "AM" });
      emitFn();
      return;
    }
    if (e.key === "p" || e.key === "P") {
      state.setSegments({ ap: "PM" });
      emitFn();
      return;
    }
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      state.setSegments({ ap: state.segments.ap === "AM" ? "PM" : "AM" });
      emitFn();
      return;
    }
  }

  function onSegmentMousedown(e: MouseEvent) {
    if (derived.finalDisabled) return;
    const target = e.target as HTMLInputElement;
    if (document.activeElement === target) return;
    e.preventDefault();
    target.focus();
  }

  return { onHhKeydown, onHhBlur, onMmKeydown, onMmBlur, onApKeydown, onSegmentMousedown };
}
