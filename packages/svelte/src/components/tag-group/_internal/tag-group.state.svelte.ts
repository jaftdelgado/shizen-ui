import { setTagGroupContext } from "../../../contexts/internal/index.js";
import type { TagGroupStateProps } from "./tag-group.types.js";
import type { TagFocusEntry } from "../../../contexts/internal/index.js";

export function createTagGroupState(
  props: TagGroupStateProps,
  setSelectedValues: (values: string[]) => void
) {
  // Registro de tags en orden DOM. Se usa un array plano de entradas;
  // el orden se mantiene re-ordenando por posición DOM al registrar.
  let entries = $state<TagFocusEntry[]>([]);

  function getSortedEntries(): TagFocusEntry[] {
    return [...entries].sort((a, b) => {
      const pos = a.tagEl.compareDocumentPosition(b.tagEl);
      return pos & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    });
  }

  function registerTag(entry: TagFocusEntry): void {
    entries = [...entries, entry];
  }

  function unregisterTag(tagEl: HTMLElement): void {
    entries = entries.filter((e) => e.tagEl !== tagEl);
  }

  function registerRemoveButton(tagEl: HTMLElement, removeButtonEl: HTMLElement): void {
    entries = entries.map((e) => (e.tagEl === tagEl ? { ...e, removeButtonEl } : e));
  }

  function isFirstTag(tagEl: HTMLElement): boolean {
    const sorted = getSortedEntries();
    return sorted.length > 0 && sorted[0].tagEl === tagEl;
  }

  function focusNext(from: HTMLElement): void {
    const sorted = getSortedEntries();
    // `from` puede ser un tagEl o un removeButtonEl
    const idx = sorted.findIndex((e) => e.tagEl === from || e.removeButtonEl === from);
    if (idx === -1) return;
    const next = sorted[idx + 1];
    if (next) next.tagEl.focus();
  }

  function focusPrev(from: HTMLElement): void {
    const sorted = getSortedEntries();
    const idx = sorted.findIndex((e) => e.tagEl === from || e.removeButtonEl === from);
    if (idx === -1) return;
    const prev = sorted[idx - 1];
    if (prev) {
      // Si el tag anterior tiene remove button, enfocarlo directamente
      // sería confuso — enfocamos el tag en sí, el usuario usa Tab para ir al remove
      prev.tagEl.focus();
    }
  }

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
    toggleValue,
    registerTag,
    unregisterTag,
    registerRemoveButton,
    focusNext,
    focusPrev,
    isFirstTag
  });

  return {
    get disabled() {
      return props.disabled;
    }
  };
}

export type TagGroupStateInstance = ReturnType<typeof createTagGroupState>;
