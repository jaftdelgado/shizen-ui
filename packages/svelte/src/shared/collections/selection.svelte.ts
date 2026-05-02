import type { Key } from "./item-registry.svelte.js";

export type SelectionMode = "none" | "single" | "multiple";

export type Selection<K extends Key = Key> = Set<K> | "all";

export interface SelectionProps<K extends Key = Key> {
  getMode: () => SelectionMode;
  getSelected: () => Selection<K>;
  isDisabled: (key: K) => boolean;
  onSelectionChange: (keys: Selection<K>) => void;
  onActivate?: (key: K) => void;
}

export class SelectionBehavior<K extends Key = Key> {
  readonly #props: SelectionProps<K>;

  constructor(props: SelectionProps<K>) {
    this.#props = props;
  }

  get mode(): SelectionMode {
    return this.#props.getMode();
  }

  get selected(): Selection<K> {
    return this.#props.getSelected();
  }

  isSelected(key: K): boolean {
    const s = this.#props.getSelected();
    if (s === "all") return true;
    return s.has(key);
  }

  select(key: K): void {
    if (this.#props.isDisabled(key)) return;

    const mode = this.#props.getMode();
    if (mode === "none") return;

    const current = this.#props.getSelected();

    if (mode === "single") {
      const next = new Set<K>();
      if (!(current !== "all" && current.has(key))) next.add(key);
      this.#props.onSelectionChange(next);
      return;
    }

    if (current === "all") return;

    const next = new Set<K>(current);
    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }
    this.#props.onSelectionChange(next);
  }

  selectRange(range: K[]): void {
    if (this.#props.getMode() !== "multiple") return;

    const current = this.#props.getSelected();
    if (current === "all") return;

    const next = new Set<K>(current);
    for (const key of range) {
      if (!this.#props.isDisabled(key)) next.add(key);
    }
    this.#props.onSelectionChange(next);
  }

  activate(key: K): void {
    if (this.#props.isDisabled(key)) return;
    this.#props.onActivate?.(key);
  }

  clear(): void {
    this.#props.onSelectionChange(new Set<K>());
  }

  selectAll(keys: K[]): void {
    if (this.#props.getMode() !== "multiple") return;
    const next = new Set<K>(keys.filter((k) => !this.#props.isDisabled(k)));
    this.#props.onSelectionChange(next);
  }
}
