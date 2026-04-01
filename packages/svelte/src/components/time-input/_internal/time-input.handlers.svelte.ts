import {
  createSegmentKeydownHandler,
  createSegmentBlurHandler,
  createSegmentMousedownHandler
} from "../../../shared/segment-navigation.js";
import { HH_CONFIG, MM_CONFIG, AP_OPTIONS, AP_KEY_MAP } from "./time-input.types.js";
import type { RefsGetters, DerivedGetters } from "./time-input.types.js";
import type { useSegments } from "./time-input.state.svelte.js";

export function useTimeInputHandlers(
  state: ReturnType<typeof useSegments>,
  refs: RefsGetters,
  derived: DerivedGetters,
  emitFn: () => void
) {
  const onHhKeydown = createSegmentKeydownHandler({
    type: "numeric",
    config: HH_CONFIG,
    refs: { prev: () => null, next: () => refs.mmInput },
    getValue: () => state.segments.hh,
    getPending: () => state.hhPending,
    setValue: (v) => state.setSegments({ hh: v }),
    setPending: (v) => state.setHhPending(v),
    onCommit: emitFn
  });

  const onHhBlur = createSegmentBlurHandler({
    getValue: () => state.segments.hh,
    setValue: (v) => state.setSegments({ hh: v }),
    getPending: () => state.hhPending,
    setPending: (v) => state.setHhPending(v)
  });

  const onMmKeydown = createSegmentKeydownHandler({
    type: "numeric",
    config: MM_CONFIG,
    refs: { prev: () => refs.hhInput, next: () => refs.apInput },
    getValue: () => state.segments.mm,
    getPending: () => state.mmPending,
    setValue: (v) => state.setSegments({ mm: v }),
    setPending: (v) => state.setMmPending(v),
    onCommit: emitFn
  });

  const onMmBlur = createSegmentBlurHandler({
    getValue: () => state.segments.mm,
    setValue: (v) => state.setSegments({ mm: v }),
    getPending: () => state.mmPending,
    setPending: (v) => state.setMmPending(v)
  });

  const onApKeydown = createSegmentKeydownHandler({
    type: "options",
    options: AP_OPTIONS,
    keyMap: AP_KEY_MAP,
    refs: { prev: () => refs.mmInput, next: () => null },
    getValue: () => state.segments.ap,
    setValue: (v) => state.setSegments({ ap: v as "AM" | "PM" }),
    onCommit: emitFn
  });

  const onSegmentMousedown = createSegmentMousedownHandler(() => derived.finalDisabled);

  return { onHhKeydown, onHhBlur, onMmKeydown, onMmBlur, onApKeydown, onSegmentMousedown };
}
