import type { Snippet } from "svelte";
import type { TagVariants } from "@shizen-ui/styles";
import { useTagGroupContext } from "../../../contexts/internal/index.js";
import { setTagContext } from "./index.js";
import type { SelectionMode } from "./tag.types.js";

export class TagState {
  #variant: () => TagVariants["variant"];
  #size: () => TagVariants["size"];
  #value: () => string | undefined;
  #selectionMode: () => SelectionMode;
  #selected: () => boolean;
  #onClose: () => (() => void) | undefined;

  #group = useTagGroupContext();
  #removeButtonSnippet = $state<Snippet | undefined>(undefined);
  #tagEl = $state<HTMLElement | null>(null);

  #tabIndex = $derived.by(() => {
    if (!this.#group.exists) return this.isDisabled ? -1 : 0;
    if (this.isDisabled) return -1;
    if (this.#tagEl && this.#group.isFirstTag(this.#tagEl)) return 0;
    return -1;
  });

  get resolvedVariant(): TagVariants["variant"] {
    return this.#group.exists ? (this.#group.variant ?? this.#variant()) : this.#variant();
  }

  get resolvedSize(): TagVariants["size"] {
    return this.#group.exists ? (this.#group.size ?? this.#size()) : this.#size();
  }

  get resolvedMode(): SelectionMode {
    return this.#group.exists ? this.#group.selectionMode : this.#selectionMode();
  }

  get isSelected(): boolean {
    const value = this.#value();
    return this.#group.exists && value != null
      ? this.#group.selectedValues.includes(value)
      : this.#selected();
  }

  get isInteractive(): boolean {
    return this.resolvedMode !== "none";
  }

  get isDisabled(): boolean {
    return this.#group.exists && this.#group.disabled;
  }

  get tabIndex(): number {
    return this.#tabIndex;
  }

  get removeButtonSnippet(): Snippet | undefined {
    return this.#removeButtonSnippet;
  }

  get value(): string | undefined {
    return this.#value();
  }

  get onClose(): (() => void) | undefined {
    return this.#onClose();
  }

  get group() {
    return this.#group;
  }

  constructor(props: {
    variant: () => TagVariants["variant"];
    size: () => TagVariants["size"];
    value: () => string | undefined;
    selectionMode: () => SelectionMode;
    selected: () => boolean;
    onClose: () => (() => void) | undefined;
  }) {
    this.#variant = props.variant;
    this.#size = props.size;
    this.#value = props.value;
    this.#selectionMode = props.selectionMode;
    this.#selected = props.selected;
    this.#onClose = props.onClose;
  }

  // Llamado desde Tag.svelte una vez que los handlers están disponibles
  initContext(handlers: {
    onRemoveButtonClick: (event: MouseEvent) => void;
    onRemoveButtonKeyDown: (event: KeyboardEvent) => void;
  }): void {
    const self = this;
    setTagContext({
      onClose: () => self.close(),
      registerRemoveButton: (snippet: Snippet) => {
        self.#removeButtonSnippet = snippet;
      },
      onRemoveButtonClick: handlers.onRemoveButtonClick,
      onRemoveButtonKeyDown: handlers.onRemoveButtonKeyDown
    });
  }

  close(): void {
    this.#redirectFocusOnClose();
    this.#onClose()?.();
  }

  #redirectFocusOnClose(): void {
    if (!this.#group.exists || !this.#tagEl) return;

    const sorted = this.#group.getSortedEntries();
    const idx = sorted.findIndex((e) => e.tagEl === this.#tagEl);
    if (idx === -1) return;

    const isLast = idx === sorted.length - 1;
    const target = isLast ? sorted[idx - 1]?.tagEl : sorted[idx + 1]?.tagEl;

    if (target) {
      target.setAttribute("tabindex", "0");
      target.dataset.skipKeyUp = "true";
      target.focus();
    }
  }

  mountTag(el: HTMLElement): { destroy: () => void } {
    this.#tagEl = el;
    this.#group.registerTag({ tagEl: el, removeButtonEl: null });

    Promise.resolve().then(() => {
      const removeBtn = el.querySelector<HTMLElement>("[data-remove-button]");
      if (removeBtn) {
        this.#group.registerRemoveButton(el, removeBtn);
      }
    });

    return { destroy: () => this.#unmountTag() };
  }

  #unmountTag(): void {
    if (this.#tagEl) this.#group.unregisterTag(this.#tagEl);
    this.#tagEl = null;
  }
}
