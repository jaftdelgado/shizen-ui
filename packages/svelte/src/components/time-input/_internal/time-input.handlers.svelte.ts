import {
  createSegmentKeydownHandler,
  createSegmentBlurHandler,
  createSegmentMousedownHandler
} from "../../../shared/segment-navigation.js";
import {
  HH12_CONFIG,
  HH24_CONFIG,
  MM_CONFIG,
  SS_CONFIG,
  AP_OPTIONS,
  AP_KEY_MAP
} from "./time-input.types.js";
import type { RefsGetters, DerivedGetters } from "./time-input.types.js";
import type { useSegments } from "./time-input.state.svelte.js";

export function useTimeInputHandlers(
  state: ReturnType<typeof useSegments>,
  refs: RefsGetters,
  derived: DerivedGetters,
  emitFn: () => void,
  getShowSeconds: () => boolean,
  getHour12: () => boolean
) {
  const onHhKeydown = createSegmentKeydownHandler({
    type: "numeric",
    get config() {
      return getHour12() ? HH12_CONFIG : HH24_CONFIG;
    },
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
    refs: {
      prev: () => refs.hhInput,
      next: () => refs.ssInput ?? refs.apInput
    },
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

  const onSsKeydown = createSegmentKeydownHandler({
    type: "numeric",
    config: SS_CONFIG,
    refs: {
      prev: () => refs.mmInput,
      next: () => refs.apInput
    },
    getValue: () => state.segments.ss,
    getPending: () => state.ssPending,
    setValue: (v) => state.setSegments({ ss: v }),
    setPending: (v) => state.setSsPending(v),
    onCommit: emitFn
  });

  const onSsBlur = createSegmentBlurHandler({
    getValue: () => state.segments.ss,
    setValue: (v) => state.setSegments({ ss: v }),
    getPending: () => state.ssPending,
    setPending: (v) => state.setSsPending(v)
  });

  const onApKeydown = createSegmentKeydownHandler({
    type: "options",
    options: AP_OPTIONS,
    keyMap: AP_KEY_MAP,
    refs: {
      prev: () => refs.ssInput ?? refs.mmInput,
      next: () => null
    },
    getValue: () => state.segments.ap,
    setValue: (v) => state.setSegments({ ap: v as "AM" | "PM" }),
    onCommit: emitFn
  });

  const onSegmentMousedown = createSegmentMousedownHandler(() => derived.finalDisabled);

  return {
    onHhKeydown,
    onHhBlur,
    onMmKeydown,
    onMmBlur,
    onSsKeydown,
    onSsBlur,
    onApKeydown,
    onSegmentMousedown
  };
}
