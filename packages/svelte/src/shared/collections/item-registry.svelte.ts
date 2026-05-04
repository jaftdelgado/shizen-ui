export type Key = string | number;

export class ItemRegistryBehavior<K extends Key = Key> {
  #registry = $state.raw(new Map<K, string>());
  #version = $state(0);

  get version(): number {
    return this.#version;
  }

  register(key: K, textValue: string): void {
    this.#registry.set(key, textValue);
    this.#version++;
  }

  unregister(key: K): void {
    this.#registry.delete(key);
    this.#version++;
  }

  getTextValue(key: K): string | undefined {
    return this.#registry.get(key);
  }

  orderedKeys(): K[] {
    void this.#version;
    return Array.from(this.#registry.keys());
  }

  entries(): IterableIterator<[K, string]> {
    void this.#version;
    return this.#registry.entries();
  }

  has(key: K): boolean {
    // Keep `has()` reactive for consumers that read membership in effects or derived state.
    void this.#version;
    return this.#registry.has(key);
  }

  get size(): number {
    void this.#version;
    return this.#registry.size;
  }
}
