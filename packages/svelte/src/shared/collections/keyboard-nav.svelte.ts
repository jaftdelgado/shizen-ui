export type Key = string | number;

export type NavDirection = "up" | "down" | "first" | "last";

export interface NavigationKeys {
  next?: string[];
  prev?: string[];
  first?: string[];
  last?: string[];
  nextWithTab?: boolean;
}

export interface ActivationKeys {
  confirm?: string[];
}

export interface KeyboardNavProps<K extends Key = Key> {
  navigationKeys?: NavigationKeys;
  activationKeys?: ActivationKeys;
  blockedKeys?: string[];
  wrapAround?: boolean;
  shiftSelect?: () => boolean;
  getKeys: () => K[];
  isDisabled: (key: K) => boolean;
  getFocusedKey: () => K | null;
  onNavigate: (key: K, direction: NavDirection, isShift: boolean) => void;
  onActivate: (key: K) => void;
  onSelect: (key: K) => void;
  onShiftSelect?: (range: K[]) => void;
}

const DEFAULT_NAV_KEYS: Required<NavigationKeys> = {
  next: ["ArrowDown"],
  prev: ["ArrowUp"],
  first: ["Home"],
  last: ["End"],
  nextWithTab: false
};

const DEFAULT_ACTIVATION_KEYS: Required<ActivationKeys> = {
  confirm: ["Enter", " "]
};

export class KeyboardNavBehavior<K extends Key = Key> {
  #anchorKey = $state<K | null>(null);
  readonly #props: KeyboardNavProps<K>;
  readonly #navKeys: Required<NavigationKeys>;
  readonly #actKeys: Required<ActivationKeys>;

  constructor(props: KeyboardNavProps<K>) {
    this.#props = props;
    this.#navKeys = {
      ...DEFAULT_NAV_KEYS,
      ...props.navigationKeys,
      nextWithTab: props.navigationKeys?.nextWithTab ?? DEFAULT_NAV_KEYS.nextWithTab
    };
    this.#actKeys = {
      ...DEFAULT_ACTIVATION_KEYS,
      ...props.activationKeys
    };
  }

  get anchorKey(): K | null {
    return this.#anchorKey;
  }

  #getEnabledKeys(): K[] {
    return this.#props.getKeys().filter((k) => !this.#props.isDisabled(k));
  }

  #currentIndex(keys: K[]): number {
    const focused = this.#props.getFocusedKey();
    if (focused === null) return -1;
    return keys.indexOf(focused);
  }

  #resolveNext(keys: K[], currentIndex: number): K | null {
    if (keys.length === 0) return null;
    const wrap = this.#props.wrapAround ?? true;
    if (currentIndex < keys.length - 1) return keys[currentIndex + 1]!;
    return wrap ? keys[0]! : (keys[currentIndex] ?? null);
  }

  #resolvePrev(keys: K[], currentIndex: number): K | null {
    if (keys.length === 0) return null;
    const wrap = this.#props.wrapAround ?? true;
    if (currentIndex > 0) return keys[currentIndex - 1]!;
    return wrap ? keys[keys.length - 1]! : (keys[currentIndex] ?? null);
  }

  #buildShiftRange(targetKey: K): K[] {
    const allKeys = this.#props.getKeys();
    const anchor = this.#anchorKey;
    if (anchor === null) return [targetKey];
    const anchorIdx = allKeys.indexOf(anchor);
    const targetIdx = allKeys.indexOf(targetKey);
    if (anchorIdx === -1 || targetIdx === -1) return [targetKey];
    const [from, to] = anchorIdx <= targetIdx ? [anchorIdx, targetIdx] : [targetIdx, anchorIdx];
    return allKeys.slice(from, to + 1);
  }

  handleKeyDown(e: KeyboardEvent): boolean {
    const { key, shiftKey } = e;

    if (this.#props.blockedKeys?.includes(key)) {
      e.preventDefault();
      return true;
    }

    const enabledKeys = this.#getEnabledKeys();
    if (enabledKeys.length === 0) return false;

    const currentIdx = this.#currentIndex(enabledKeys);
    const shiftSelect = this.#props.shiftSelect?.() ?? false;

    const isNext =
      this.#navKeys.next.includes(key) || (this.#navKeys.nextWithTab && key === "Tab" && !shiftKey);

    if (isNext) {
      const target = this.#resolveNext(enabledKeys, currentIdx);
      if (target === null) return false;
      const isShift = shiftSelect && shiftKey;
      if (isShift) {
        if (this.#anchorKey === null) this.#anchorKey = this.#props.getFocusedKey();
        this.#props.onShiftSelect?.(this.#buildShiftRange(target));
      } else {
        this.#anchorKey = null;
      }
      this.#props.onNavigate(target, "down", isShift);
      return true;
    }

    const isPrev =
      this.#navKeys.prev.includes(key) || (this.#navKeys.nextWithTab && key === "Tab" && shiftKey);

    if (isPrev) {
      const target = this.#resolvePrev(enabledKeys, currentIdx);
      if (target === null) return false;
      const isShift = shiftSelect && shiftKey;
      if (isShift) {
        if (this.#anchorKey === null) this.#anchorKey = this.#props.getFocusedKey();
        this.#props.onShiftSelect?.(this.#buildShiftRange(target));
      } else {
        this.#anchorKey = null;
      }
      this.#props.onNavigate(target, "up", isShift);
      return true;
    }

    if (this.#navKeys.first.includes(key)) {
      const target = enabledKeys[0];
      if (target === undefined) return false;
      this.#props.onNavigate(target, "first", false);
      return true;
    }

    if (this.#navKeys.last.includes(key)) {
      const target = enabledKeys[enabledKeys.length - 1];
      if (target === undefined) return false;
      this.#props.onNavigate(target, "last", false);
      return true;
    }

    if (this.#actKeys.confirm.includes(key)) {
      const focused = this.#props.getFocusedKey();
      if (focused === null || this.#props.isDisabled(focused)) return false;
      this.#props.onActivate(focused);
      this.#props.onSelect(focused);
      this.#anchorKey = focused as K;
      return true;
    }

    return false;
  }

  setAnchor(key: K): void {
    this.#anchorKey = key;
  }

  resetAnchor(): void {
    this.#anchorKey = null;
  }
}
