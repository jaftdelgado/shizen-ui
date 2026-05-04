import { ItemRegistryBehavior } from "../../../shared/collections/item-registry.svelte.js";
import { TypeaheadBehavior } from "../../../shared/collections/typeahead.svelte.js";
import { SelectionBehavior } from "../../../shared/collections/selection.svelte.js";
import { OpenStateBehavior } from "../../../shared/overlays/open-state.svelte.js";
import { PositionBehavior } from "../../../shared/overlays/position.svelte.js";
import { ClickOutsideBehavior } from "../../../shared/overlays/click-outside.svelte.js";
import { FocusManagerBehavior } from "../../../shared/overlays/focus-manager.svelte.js";
import { FocusTrapBehavior } from "../../../shared/overlays/focus-trap.svelte.js";
import { KeyboardBehavior } from "../../../shared/overlays/keyboard.svelte.js";
import { KeyboardNavBehavior } from "../../../shared/collections/keyboard-nav.svelte.js";
import { createSelectKeyboardNav } from "./select.handlers.svelte.js";
import { ScrollCloseBehavior } from "../../../shared/overlays/scroll.svelte.js";
import { MountBehavior } from "../../../shared/overlays/mount.svelte.js";
import { setSelectContext } from "./select.context.svelte.js";
import type { Strategy } from "@floating-ui/dom";
import type {
  CloseReason,
  Key,
  SelectContextValue,
  Selection,
  SelectionMode
} from "./select.types.js";
import type { OverlayPlacement } from "../../../shared/overlays/position.svelte.js";

const DEFAULT_SELECT_PLACEMENT: OverlayPlacement = "bottom";
const DEFAULT_SELECT_STRATEGY: Strategy = "absolute";
const DEFAULT_SELECT_OFFSET = 8;

export class SelectState {
  #disabled: () => boolean;
  #invalid: () => boolean;
  #placeholder: () => string | undefined;
  #disabledKeys: () => Set<Key>;
  #focusedKey = $state<Key | null>(null);
  #triggerEl = $state<HTMLElement | null>(null);
  #contentEl = $state<HTMLElement | null>(null);
  #suppressFocusRing: (() => void) | null = null;

  readonly registry: ItemRegistryBehavior<Key>;
  readonly typeahead: TypeaheadBehavior<Key>;
  readonly selection: SelectionBehavior<Key>;
  readonly openState: OpenStateBehavior;
  readonly position: PositionBehavior;
  readonly clickOutside: ClickOutsideBehavior;
  readonly focusManager: FocusManagerBehavior;
  readonly focusTrap: FocusTrapBehavior;
  readonly keyboard: KeyboardBehavior;
  readonly keyboardNav: KeyboardNavBehavior<Key>;
  readonly scrollClose: ScrollCloseBehavior;
  readonly mount: MountBehavior;

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
      this.close("other");
    }
  }

  close(reason: CloseReason = "other"): void {
    if (!this.openState.isOpen) return;
    this.openState.close();
    this.setFocusedKey(null);
    this.focusManager.restoreFocus(reason);
  }

  setFocusedKey(key: Key | null): void {
    this.#focusedKey = key;
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
    placement: () => OverlayPlacement | undefined;
    strategy: () => Strategy | undefined;
    offset: () => number | undefined;
  }) {
    this.#disabled = props.disabled;
    this.#invalid = props.invalid;
    this.#placeholder = props.placeholder;
    this.#disabledKeys = props.disabledKeys;

    this.registry = new ItemRegistryBehavior<Key>();

    this.keyboardNav = createSelectKeyboardNav({
      getKeys: () => this.registry.orderedKeys(),
      isDisabled: (key) => this.isDisabled(key),
      getFocusedKey: () => this.focusedKey,
      getSelectionMode: () => this.selection.mode,
      navigate: (key) => this.setFocusedKey(key),
      triggerAction: (key) => this.selection.activate(key),
      selectKey: (key) => this.selectKey(key),
      selectRange: (range) => this.selection.selectRange(range)
    });

    this.typeahead = new TypeaheadBehavior<Key>({
      getEntries: () => this.registry.entries(),
      isDisabled: (key) => this.isDisabled(key)
    });

    $effect(() => {
      return () => {
        this.typeahead.destroy();
      };
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
      setIsOpen: (val) => props.setIsOpen(val),
      onOpenChange: (val) => props.onOpenChange()?.(val)
    });

    this.position = new PositionBehavior({
      getIsOpen: () => props.isOpen(),
      getReferenceEl: () => this.#triggerEl,
      getFloatingEl: () => this.#contentEl,
      getPlacement: () => props.placement() ?? DEFAULT_SELECT_PLACEMENT,
      getStrategy: () => props.strategy() ?? DEFAULT_SELECT_STRATEGY,
      getOffset: () => props.offset() ?? DEFAULT_SELECT_OFFSET
    });

    this.clickOutside = new ClickOutsideBehavior({
      getEnabled: () => props.isOpen(),
      getReferenceEl: () => this.#triggerEl,
      getFloatingEl: () => this.#contentEl,
      onClickOutside: () => this.close("click-outside")
    });

    this.focusManager = new FocusManagerBehavior({
      getEnabled: () => props.isOpen(),
      shouldRestoreFocus: (reason) => reason === "escape" || reason === "other",
      suppressFocusRing: () => this.#suppressFocusRing?.()
    });

    this.focusTrap = new FocusTrapBehavior({
      getEnabled: () => false,
      getContainerEl: () => this.#contentEl
    });

    this.keyboard = new KeyboardBehavior({
      onEscape: () => this.close("escape")
    });

    this.scrollClose = new ScrollCloseBehavior({
      getEnabled: () => props.isOpen(),
      onClose: () => this.close("other")
    });

    this.mount = new MountBehavior({
      getIsOpen: () => props.isOpen(),
      getEl: () => this.#contentEl,
      exitDurationVar: "--select-exit-duration"
    });

    setSelectContext(this.#createContext(props));
  }

  #createContext(props: {
    isOpen: () => boolean;
    disabledKeys: () => Set<Key>;
  }): SelectContextValue & { readonly registry: ItemRegistryBehavior<Key> } {
    const self = this;

    return {
      get isOpen() {
        return props.isOpen();
      },
      get openedByKeyboard() {
        return self.openState.openedByKeyboard;
      },
      get isMounted() {
        return self.mount.isMounted;
      },
      get selectedKeys() {
        return self.selection.selected;
      },
      get disabledKeys() {
        return props.disabledKeys();
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
      get registry() {
        return self.registry;
      },
      getFirstSelectableKey: () =>
        self.registry.orderedKeys().find((key) => !self.isDisabled(key)) ?? null,
      getTextValue: (key) => self.registry.getTextValue(key),
      handleTypeahead: (char) => self.typeahead.handle(char),
      selectKey: (key) => self.selectKey(key),
      triggerAction: (key) => self.selection.activate(key),
      registerItem: (key, textValue) => self.registry.register(key, textValue),
      unregisterItem: (key) => self.registry.unregister(key),
      setFocusedKey: (key) => self.setFocusedKey(key),
      open: () => self.openState.open(),
      close: (reason) => self.close(reason),
      toggle: () => self.openState.toggle(),
      setOpenedByKeyboard: (val) => self.openState.setOpenedByKeyboard(val),
      handleKeydown: (e) => self.keyboard.handleKeydown(e),
      handleContentKeydown: (e) => self.keyboardNav.handleKeyDown(e),
      setTriggerEl: (el) => {
        self.#triggerEl = el;
      },
      setSuppressFocusRing: (fn) => {
        self.#suppressFocusRing = fn;
      },
      setContentEl: (el) => {
        self.#contentEl = el;
      },
      getContentEl: () => self.#contentEl,
      updatePosition: () => self.position.updatePosition()
    };
  }
}

export type SelectStateInstance = InstanceType<typeof SelectState>;
