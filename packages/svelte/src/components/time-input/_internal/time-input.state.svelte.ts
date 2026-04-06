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
  let editing = $state(false);
  let dirty = $state(false);
  let lastSyncedValue = $state(getValue());
  let selfEmitted = $state(false);
  let wasEdited = $state(false);

  const externalSegments = $derived(parseValue(getValue(), getHour12()));

  $effect(() => {
    const next = externalSegments;
    const currentExternal = getValue();

    if (currentExternal !== lastSyncedValue) {
      if (selfEmitted) {
        lastSyncedValue = currentExternal;
        selfEmitted = false;
        return;
      }
      lastSyncedValue = currentExternal;
      dirty = false;
      editing = false;
      wasEdited = false;
      Object.assign(segments, next);
      return;
    }

    if (!editing && !dirty) {
      Object.assign(segments, next);
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
    get editing() {
      return editing;
    },
    get dirty() {
      return dirty;
    },
    get wasEdited() {
      return wasEdited;
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
    },
    setEditing(v: boolean) {
      editing = v;
    },
    setDirty(v: boolean) {
      dirty = v;
    },
    setWasEdited(v: boolean) {
      wasEdited = v;
    },
    markSelfEmit() {
      selfEmitted = true;
    }
  };
}
