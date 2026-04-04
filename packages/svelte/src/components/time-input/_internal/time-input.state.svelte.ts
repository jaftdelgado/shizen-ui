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

export function useSegments(getValue: () => string, getHour12: () => boolean) {
  let segments = $state<TimeSegments>(parseValue(getValue(), getHour12()));
  let hhPending = $state("");
  let mmPending = $state("");
  let ssPending = $state("");

  const externalSegments = $derived(parseValue(getValue(), getHour12()));

  $effect(() => {
    if (!hhPending && !mmPending && !ssPending) {
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
    get ssPending() {
      return ssPending;
    },
    setSegments(next: Partial<TimeSegments>) {
      Object.assign(segments, next);
    },
    setHhPending(v: string) {
      hhPending = v;
    },
    setMmPending(v: string) {
      mmPending = v;
    },
    setSsPending(v: string) {
      ssPending = v;
    }
  };
}
