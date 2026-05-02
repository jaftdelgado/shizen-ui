import { listBoxStyles } from "@shizen-ui/styles";
import { setListBoxContext } from "./list-box.context.svelte.js";
import { ItemRegistryBehavior } from "../../../shared/collections/item-registry.svelte.js";
import { TypeaheadBehavior } from "../../../shared/collections/typeahead.svelte.js";
import { SelectionBehavior } from "../../../shared/collections/selection.svelte.js";
import type {
  Key,
  Selection,
  SelectionMode,
  ListBoxVariant,
  FocusStrategy
} from "./list-box.types.js";

export class ListBoxState {
  #variant: () => ListBoxVariant;
  #focusStrategy: () => FocusStrategy;
  #disabledKeys: () => Set<Key>;

  #focusedKey = $state<Key | null>(null);

  readonly registry: ItemRegistryBehavior<Key>;
  readonly typeahead: TypeaheadBehavior<Key>;
  readonly selection: SelectionBehavior<Key>;

  get variant(): ListBoxVariant {
    return this.#variant();
  }

  get focusStrategy(): FocusStrategy {
    return this.#focusStrategy();
  }

  get focusedKey(): Key | null {
    return this.#focusedKey;
  }

  get styles() {
    return listBoxStyles({ variant: this.#variant() });
  }

  isDisabled(key: Key): boolean {
    return this.#disabledKeys().has(key);
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

  isSelected(key: Key): boolean {
    return this.selection.isSelected(key);
  }

  selectKey(key: Key): void {
    this.selection.select(key);
  }

  activateKey(key: Key): void {
    this.selection.activate(key);
  }

  constructor(props: {
    selectionMode: () => SelectionMode;
    selectedKeys: () => Selection;
    disabledKeys: () => Set<Key>;
    variant: () => ListBoxVariant;
    focusStrategy?: () => FocusStrategy;
    setSelectedKeys: (keys: Selection) => void;
    onaction: () => ((key: Key) => void) | undefined;
  }) {
    this.#variant = props.variant;
    this.#focusStrategy = props.focusStrategy ?? (() => "roving");
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

    const self = this;

    setListBoxContext({
      get variant() {
        return self.variant;
      },
      get focusStrategy() {
        return self.focusStrategy;
      },
      get focusedKey() {
        return self.focusedKey;
      },
      get registry() {
        return self.registry;
      },
      get selectionMode() {
        return self.selection.mode;
      },
      get selectedKeys() {
        return self.selection.selected;
      },
      get disabledKeys() {
        return self.#disabledKeys();
      },
      isSelected: (key) => self.selection.isSelected(key),
      isDisabled: (key) => self.isDisabled(key),
      selectKey: (key) => self.selection.select(key),
      activateKey: (key) => self.selection.activate(key),
      registerItem: (key, textValue) => self.registry.register(key, textValue),
      unregisterItem: (key) => self.registry.unregister(key),
      setFocusedKey: (key) => self.setFocusedKey(key)
    });
  }
}

export type ListBoxStateInstance = InstanceType<typeof ListBoxState>;
