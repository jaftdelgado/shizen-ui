import type { Key } from "./item-registry.svelte.js";

export interface TypeaheadProps<K extends Key = Key> {
  getEntries: () => IterableIterator<[K, string]>;
  isDisabled: (key: K) => boolean;
  debounceMs?: number;
}

export class TypeaheadBehavior<K extends Key = Key> {
  #buffer = $state("");
  #timer: ReturnType<typeof setTimeout> | null = null;
  readonly #props: TypeaheadProps<K>;

  constructor(props: TypeaheadProps<K>) {
    this.#props = props;
  }

  get buffer(): string {
    return this.#buffer;
  }

  handle(char: string): K | null {
    this.#buffer += char.toLowerCase();

    if (this.#timer) clearTimeout(this.#timer);
    this.#timer = setTimeout(() => {
      this.#buffer = "";
    }, this.#props.debounceMs ?? 500);

    for (const [key, textValue] of this.#props.getEntries()) {
      if (!this.#props.isDisabled(key) && textValue.toLowerCase().startsWith(this.#buffer)) {
        return key;
      }
    }

    return null;
  }

  reset(): void {
    this.#buffer = "";
    if (this.#timer) {
      clearTimeout(this.#timer);
      this.#timer = null;
    }
  }
}
