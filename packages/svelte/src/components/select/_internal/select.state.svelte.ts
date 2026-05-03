import { selectStyles } from "@shizen-ui/styles";
import { ItemRegistryBehavior } from "../../../shared/collections/item-registry.svelte.js";
import { TypeaheadBehavior } from "../../../shared/collections/typeahead.svelte.js";
import { SelectionBehavior } from "../../../shared/collections/selection.svelte.js";
import { OpenStateBehavior } from "../../../shared/overlays/open-state.svelte.js";
import { PositionBehavior } from "../../../shared/overlays/position.svelte.js";
import { ClickOutsideBehavior } from "../../../shared/overlays/click-outside.svelte.js";
import { KeyboardBehavior } from "../../../shared/overlays/keyboard.svelte.js";
import { ScrollCloseBehavior } from "../../../shared/overlays/scroll.svelte.js";
import { MountBehavior } from "../../../shared/overlays/mount.svelte.js";
import { setSelectContext } from "./select.context.svelte.js";
import type { Key, Selection, SelectionMode } from "./select.types.js";

export class SelectState {
  #disabled: () => boolean;
  #invalid: () => boolean;
  #placeholder: () => string | undefined;
  #disabledKeys: () => Set<Key>;
  #focusedKey = $state<Key | null>(null);
  #triggerEl = $state<HTMLElement | null>(null);
  #contentEl = $state<HTMLElement | null>(null);

  readonly registry: ItemRegistryBehavior<Key>;
  readonly typeahead: TypeaheadBehavior<Key>;
  readonly selection: SelectionBehavior<Key>;
  readonly openState: OpenStateBehavior;
  readonly position: PositionBehavior;
  readonly clickOutside: ClickOutsideBehavior;
  readonly keyboard: KeyboardBehavior;
  readonly scrollClose: ScrollCloseBehavior;
  readonly mount: MountBehavior;

  get styles() {
    return selectStyles({});
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
      this.openState.close();
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

    this.openState = new OpenStateBehavior({
      getIsOpen: () => props.isOpen(),
      setIsOpen: (val) => {
        props.setIsOpen(val);
        props.onOpenChange()?.(val);
      }
    });

    this.position = new PositionBehavior({
      getIsOpen: () => props.isOpen(),
      getReferenceEl: () => this.#triggerEl,
      getFloatingEl: () => this.#contentEl,
      getPlacement: () => "bottom",
      getStrategy: () => "fixed",
      getOffset: () => 8
    });

    this.clickOutside = new ClickOutsideBehavior({
      getEnabled: () => props.isOpen(),
      getReferenceEl: () => this.#triggerEl,
      getFloatingEl: () => this.#contentEl,
      onClickOutside: () => this.openState.close()
    });

    this.keyboard = new KeyboardBehavior({
      onEscape: () => this.openState.close()
    });

    this.scrollClose = new ScrollCloseBehavior({
      getEnabled: () => props.isOpen(),
      onClose: () => this.openState.close()
    });

    this.mount = new MountBehavior({
      getIsOpen: () => props.isOpen(),
      getEl: () => this.#contentEl,
      exitDurationVar: "--select-exit-duration"
    });

    const self = this;

    setSelectContext({
      get isOpen() {
        return props.isOpen();
      },
      get isMounted() {
        return self.mount.isMounted;
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
      get transformOrigin() {
        return self.position.transformOrigin;
      },
      get placement() {
        return self.position.resolvedPlacement;
      },
      isSelected: (key) => self.isSelected(key),
      isDisabled: (key) => self.isDisabled(key),
      selectKey: (key) => self.selectKey(key),
      activateKey: (key) => self.activateKey(key),
      registerItem: (key, textValue) => self.registry.register(key, textValue),
      unregisterItem: (key) => self.registry.unregister(key),
      setFocusedKey: (key) => self.setFocusedKey(key),
      open: () => self.openState.open(),
      close: () => self.openState.close(),
      toggle: () => self.openState.toggle(),
      handleKeydown: (e) => self.keyboard.handleKeydown(e),
      setTriggerEl: (el) => {
        self.#triggerEl = el;
      },
      setContentEl: (el) => {
        self.#contentEl = el;
      },
      updatePosition: () => self.position.updatePosition()
    });
  }
}

export type SelectStateInstance = InstanceType<typeof SelectState>;
