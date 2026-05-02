import { selectStyles } from "@shizen-ui/styles";
import { OverlayState, type OverlayPlacement } from "../../../shared/overlay.svelte.js";
import { ItemRegistryBehavior } from "../../../shared/collections/item-registry.svelte.js";
import { TypeaheadBehavior } from "../../../shared/collections/typeahead.svelte.js";
import { SelectionBehavior } from "../../../shared/collections/selection.svelte.js";
import type { Strategy } from "@floating-ui/dom";
import { setSelectContext } from "./select.context.svelte.js";
import type { Key, Selection, SelectionMode } from "./select.types.js";

export class SelectState {
  #disabled: () => boolean;
  #invalid: () => boolean;
  #placeholder: () => string | undefined;
  #disabledKeys: () => Set<Key>;
  #isOpen: () => boolean;
  #setIsOpen: (val: boolean) => void;
  #focusedKey = $state<Key | null>(null);

  readonly registry: ItemRegistryBehavior<Key>;
  readonly typeahead: TypeaheadBehavior<Key>;
  readonly selection: SelectionBehavior<Key>;
  readonly overlay: OverlayState;

  get styles() {
    return selectStyles({});
  }

  get isOpen(): boolean {
    return this.#isOpen();
  }

  get focusedKey(): Key | null {
    return this.#focusedKey;
  }

  get placeholder(): string | undefined {
    return this.#placeholder();
  }

  get disabled(): boolean {
    return this.#disabled();
  }

  get invalid(): boolean {
    return this.#invalid();
  }

  isDisabled(key: Key): boolean {
    return this.#disabledKeys().has(key);
  }

  isSelected(key: Key): boolean {
    return this.selection.isSelected(key);
  }

  selectKey(key: Key): void {
    this.selection.select(key);
    if (this.selection.mode === "single") {
      this.#setIsOpen(false);
    }
  }

  activateKey(key: Key): void {
    this.selection.activate(key);
  }

  setFocusedKey(key: Key | null): void {
    this.#focusedKey = key;
  }

  getRegisteredKeys(): Key[] {
    return this.registry.orderedKeys();
  }

  handleTypeahead(char: string): Key | null {
    return this.typeahead.handle(char);
  }

  constructor(props: {
    selectionMode: () => SelectionMode;
    selectedKeys: () => Selection;
    disabledKeys: () => Set<Key>;
    disabled: () => boolean;
    invalid: () => boolean;
    placeholder: () => string | undefined;
    setSelectedKeys: (keys: Selection) => void;
    onaction: () => ((key: Key) => void) | undefined;
    isOpen: () => boolean;
    setIsOpen: (val: boolean) => void;
    onOpenChange: () => ((val: boolean) => void) | undefined;
  }) {
    this.#disabled = props.disabled;
    this.#invalid = props.invalid;
    this.#placeholder = props.placeholder;
    this.#disabledKeys = props.disabledKeys;
    this.#isOpen = props.isOpen;
    this.#setIsOpen = props.setIsOpen;

    this.registry = new ItemRegistryBehavior<Key>();

    this.typeahead = new TypeaheadBehavior<Key>({
      getEntries: () => this.registry.entries(),
      isDisabled: (key) => this.isDisabled(key)
    });

    this.selection = new SelectionBehavior<Key>({
      getMode: props.selectionMode,
      getSelected: props.selectedKeys,
      isDisabled: (key) => this.isDisabled(key),
      onSelectionChange: props.setSelectedKeys,
      onActivate: (key) => props.onaction()?.(key)
    });

    this.overlay = new OverlayState({
      get placement(): OverlayPlacement {
        return "bottom";
      },
      get strategy(): Strategy {
        return "absolute";
      },
      get offsetVal() {
        return 8;
      },
      get closeOnScroll() {
        return true;
      },
      get isOpen() {
        return props.isOpen();
      },
      set isOpen(val: boolean) {
        props.setIsOpen(val);
        props.onOpenChange()?.(val);
      },
      get onOpenChange() {
        return props.onOpenChange();
      }
    });

    const self = this;

    setSelectContext({
      get isOpen() {
        return self.isOpen;
      },
      get selectedKeys() {
        return self.selection.selected;
      },
      get disabledKeys() {
        return self.#disabledKeys();
      },
      get selectionMode() {
        return self.selection.mode;
      },
      get placeholder() {
        return self.placeholder;
      },
      get disabled() {
        return self.disabled;
      },
      get invalid() {
        return self.invalid;
      },
      get registry() {
        return self.registry;
      },
      get focusedKey() {
        return self.focusedKey;
      },
      isSelected: (key) => self.isSelected(key),
      isDisabled: (key) => self.isDisabled(key),
      selectKey: (key) => self.selectKey(key),
      activateKey: (key) => self.activateKey(key),
      registerItem: (key, textValue) => self.registry.register(key, textValue),
      unregisterItem: (key) => self.registry.unregister(key),
      setFocusedKey: (key) => self.setFocusedKey(key),
      open: () => self.#setIsOpen(true),
      close: () => self.#setIsOpen(false),
      toggle: () => self.#setIsOpen(!self.isOpen),
      setTriggerEl: (el) => {
        self.overlay.referenceEl = el;
      },
      setContentEl: (el) => {
        self.overlay.floatingEl = el;
      }
    });
  }
}

export type SelectStateInstance = InstanceType<typeof SelectState>;
