import { setTagGroupContext } from "../../../contexts/internal/index.js";
import type { TagGroupStateProps } from "./tag-group.types.js";

export function createTagGroupState(
  props: TagGroupStateProps,
  setSelectedValues: (values: string[]) => void
) {
  function toggleValue(nextValue: string) {
    if (props.disabled) return;

    if (props.selectionMode === "single") {
      const next = props.selectedValues[0] === nextValue ? [] : [nextValue];
      setSelectedValues(next);
      props.onSelectedValuesChange?.(next);
      return;
    }

    if (props.selectionMode === "multiple") {
      const next = props.selectedValues.includes(nextValue)
        ? props.selectedValues.filter((v) => v !== nextValue)
        : [...props.selectedValues, nextValue];
      setSelectedValues(next);
      props.onSelectedValuesChange?.(next);
    }
  }

  setTagGroupContext({
    get variant() {
      return props.variant;
    },
    get size() {
      return props.size;
    },
    get selectionMode() {
      return props.selectionMode;
    },
    get selectedValues() {
      return props.selectedValues;
    },
    get disabled() {
      return props.disabled;
    },
    toggleValue
  });

  return {
    get disabled() {
      return props.disabled;
    }
  };
}

export type TagGroupStateInstance = ReturnType<typeof createTagGroupState>;
