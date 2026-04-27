import { setTagGroupContext } from "../../../contexts/internal/index.js";
import type { TagGroupStateProps } from "./tag-group.types.js";
import type { TagFocusEntry } from "../../../contexts/internal/index.js";

export class TagGroupState {
  #props: TagGroupStateProps;
  #setSelectedValues: (values: string[]) => void;

  #entries = $state<TagFocusEntry[]>([]);

  constructor(props: TagGroupStateProps, setSelectedValues: (values: string[]) => void) {
    this.#props = props;
    this.#setSelectedValues = setSelectedValues;

    const self = this;

    setTagGroupContext({
      get variant() {
        return self.#props.variant;
      },
      get size() {
        return self.#props.size;
      },
      get selectionMode() {
        return self.#props.selectionMode;
      },
      get selectedValues() {
        return self.#props.selectedValues;
      },
      get disabled() {
        return self.#props.disabled;
      },
      toggleValue: (v) => self.toggleValue(v),
      registerTag: (e) => self.registerTag(e),
      unregisterTag: (el) => self.unregisterTag(el),
      registerRemoveButton: (el, btn) => self.registerRemoveButton(el, btn),
      focusNext: (from) => self.focusNext(from),
      focusPrev: (from) => self.focusPrev(from),
      isFirstTag: (el) => self.isFirstTag(el),
      getSortedEntries: () => self.getSortedEntries()
    });
  }

  get disabled(): boolean {
    return this.#props.disabled ?? false;
  }

  getSortedEntries(): TagFocusEntry[] {
    return [...this.#entries].sort((a, b) => {
      const pos = a.tagEl.compareDocumentPosition(b.tagEl);
      return pos & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    });
  }

  registerTag(entry: TagFocusEntry): void {
    this.#entries = [...this.#entries, entry];
  }

  unregisterTag(tagEl: HTMLElement): void {
    this.#entries = this.#entries.filter((e) => e.tagEl !== tagEl);
  }

  registerRemoveButton(tagEl: HTMLElement, removeButtonEl: HTMLElement): void {
    this.#entries = this.#entries.map((e) => (e.tagEl === tagEl ? { ...e, removeButtonEl } : e));
  }

  isFirstTag(tagEl: HTMLElement): boolean {
    const sorted = this.getSortedEntries();
    return sorted[0]?.tagEl === tagEl;
  }

  focusNext(from: HTMLElement): void {
    const sorted = this.getSortedEntries();
    const idx = sorted.findIndex((e) => e.tagEl === from || e.removeButtonEl === from);
    if (idx === -1) return;
    sorted[idx + 1]?.tagEl.focus();
  }

  focusPrev(from: HTMLElement): void {
    const sorted = this.getSortedEntries();
    const idx = sorted.findIndex((e) => e.tagEl === from || e.removeButtonEl === from);
    if (idx === -1) return;
    sorted[idx - 1]?.tagEl.focus();
  }

  toggleValue(nextValue: string): void {
    if (this.#props.disabled) return;

    const { selectionMode, selectedValues, onSelectedValuesChange } = this.#props;

    if (selectionMode === "single") {
      const next = selectedValues[0] === nextValue ? [] : [nextValue];
      this.#setSelectedValues(next);
      onSelectedValuesChange?.(next);
      return;
    }

    if (selectionMode === "multiple") {
      const next = selectedValues.includes(nextValue)
        ? selectedValues.filter((v) => v !== nextValue)
        : [...selectedValues, nextValue];
      this.#setSelectedValues(next);
      onSelectedValuesChange?.(next);
    }
  }
}

export type TagGroupStateInstance = InstanceType<typeof TagGroupState>;
