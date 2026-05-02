import { listBoxStyles } from "@shizen-ui/styles";
import { setListBoxContext } from "./list-box.context.svelte.js";
import type { Key, Selection, SelectionMode, ListBoxVariant } from "./list-box.types.js";

export class ListBoxState {
  #selectionMode: () => SelectionMode;
  #selectedKeys: () => Selection;
  #disabledKeys: () => Set<Key>;
  #variant: () => ListBoxVariant;
  #setSelectedKeys: (keys: Selection) => void;
  #onaction: () => ((key: Key) => void) | undefined;

  // ─── Typeahead ──────────────────────────────────────────────
  #typeaheadBuffer = $state("");
  #typeaheadTimer: ReturnType<typeof setTimeout> | null = null;

  // ─── Roving tabindex ────────────────────────────────────────
  #focusedKey = $state<Key | null>(null);

  get selectionMode(): SelectionMode {
    return this.#selectionMode();
  }

  get selectedKeys(): Selection {
    return this.#selectedKeys();
  }

  get disabledKeys(): Set<Key> {
    return this.#disabledKeys();
  }

  get variant(): ListBoxVariant {
    return this.#variant();
  }

  get focusedKey(): Key | null {
    return this.#focusedKey;
  }

  get styles() {
    return listBoxStyles({ variant: this.#variant() });
  }

  isSelected(key: Key): boolean {
    const keys = this.#selectedKeys();
    if (keys === "all") return true;
    return keys.has(key);
  }

  isDisabled(key: Key): boolean {
    return this.#disabledKeys().has(key);
  }

  selectKey(key: Key): void {
    if (this.isDisabled(key)) return;

    const mode = this.#selectionMode();
    if (mode === "none") return;

    const current = this.#selectedKeys();

    if (mode === "single") {
      // toggle off if already selected, otherwise select
      const next = new Set<Key>();
      if (!(current !== "all" && current.has(key))) next.add(key);
      this.#setSelectedKeys(next);
      return;
    }

    // multiple
    if (current === "all") {
      // "all" → deselect this one (impractical without item list, so just keep "all")
      return;
    }

    const next = new Set<Key>(current);
    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }
    this.#setSelectedKeys(next);
  }

  activateKey(key: Key): void {
    if (this.isDisabled(key)) return;
    this.#onaction()?.(key);
  }

  setFocusedKey(key: Key | null): void {
    this.#focusedKey = key;
  }

  /** Typeahead: accumulate characters and match against provided item textValues */
  handleTypeahead(char: string, items: { key: Key; textValue: string }[]): Key | null {
    this.#typeaheadBuffer += char.toLowerCase();

    if (this.#typeaheadTimer) clearTimeout(this.#typeaheadTimer);
    this.#typeaheadTimer = setTimeout(() => {
      this.#typeaheadBuffer = "";
    }, 500);

    const match = items.find(
      (i) => !this.isDisabled(i.key) && i.textValue.toLowerCase().startsWith(this.#typeaheadBuffer)
    );

    return match?.key ?? null;
  }

  constructor(props: {
    selectionMode: () => SelectionMode;
    selectedKeys: () => Selection;
    disabledKeys: () => Set<Key>;
    variant: () => ListBoxVariant;
    setSelectedKeys: (keys: Selection) => void;
    onaction: () => ((key: Key) => void) | undefined;
  }) {
    this.#selectionMode = props.selectionMode;
    this.#selectedKeys = props.selectedKeys;
    this.#disabledKeys = props.disabledKeys;
    this.#variant = props.variant;
    this.#setSelectedKeys = props.setSelectedKeys;
    this.#onaction = props.onaction;

    const self = this;

    setListBoxContext({
      get selectionMode() {
        return self.selectionMode;
      },
      get selectedKeys() {
        return self.selectedKeys;
      },
      get disabledKeys() {
        return self.disabledKeys;
      },
      get variant() {
        return self.variant;
      },
      isSelected: (key) => self.isSelected(key),
      isDisabled: (key) => self.isDisabled(key),
      selectKey: (key) => self.selectKey(key),
      activateKey: (key) => self.activateKey(key)
    });
  }
}

export type ListBoxStateInstance = InstanceType<typeof ListBoxState>;
