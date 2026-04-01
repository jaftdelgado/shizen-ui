import { useFieldStateContext, useSurfaceContext } from "../../../contexts/index.js";
import { useInputGroupContext } from "../../../contexts/internal/index.js";
import { parseValue } from "./time-input.helpers.js";
import type { TimeSegments } from "./time-input.types.js";

export function useTimeInputContext() {
  const fieldContext = useFieldStateContext();
  const groupContext = useInputGroupContext();
  const surfaceContext = useSurfaceContext();
  return { fieldContext, groupContext, surfaceContext };
}

export function useSegments(getValue: () => string) {
  let segments = $state<TimeSegments>(parseValue(getValue()));
  let hhPending = $state("");
  let mmPending = $state("");

  const externalSegments = $derived(parseValue(getValue()));

  $effect(() => {
    if (!hhPending && !mmPending) {
      Object.assign(segments, externalSegments);
    }
  });

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
