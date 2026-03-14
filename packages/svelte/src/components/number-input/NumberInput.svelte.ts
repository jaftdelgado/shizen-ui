export interface NumberInputStateProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  invalid?: boolean;
}

export class NumberInputState {
  #value = $state(0);
  #min = $state<number | undefined>(undefined);
  #max = $state<number | undefined>(undefined);
  #step = $state(1);
  #disabled = $state(false);
  #invalid = $state(false);

  constructor(props: NumberInputStateProps = {}) {
    this.#value = props.value ?? 0;
    this.#min = props.min;
    this.#max = props.max;
    this.#step = props.step ?? 1;
    this.#disabled = props.disabled ?? false;
    this.#invalid = props.invalid ?? false;
  }

  get value(): number {
    return this.#value;
  }

  set value(v: number) {
    this.#value = this.#clamp(v);
  }

  get min(): number | undefined {
    return this.#min;
  }

  set min(v: number | undefined) {
    this.#min = v;
  }

  get max(): number | undefined {
    return this.#max;
  }

  set max(v: number | undefined) {
    this.#max = v;
  }

  get step(): number {
    return this.#step;
  }

  set step(v: number) {
    this.#step = v;
  }

  get disabled(): boolean {
    return this.#disabled;
  }

  set disabled(v: boolean) {
    this.#disabled = v;
  }

  get invalid(): boolean {
    return this.#invalid;
  }

  set invalid(v: boolean) {
    this.#invalid = v;
  }

  get canIncrement(): boolean {
    return !this.#disabled && (this.#max === undefined || this.#value < this.#max);
  }

  get canDecrement(): boolean {
    return !this.#disabled && (this.#min === undefined || this.#value > this.#min);
  }

  increment(): void {
    if (!this.canIncrement) return;
    this.value = this.#value + this.#step;
  }

  decrement(): void {
    if (!this.canDecrement) return;
    this.value = this.#value - this.#step;
  }

  #snapToStep(v: number): number {
    if (this.#step <= 1) return v;
    const base = this.#min ?? 0;
    return Math.round((v - base) / this.#step) * this.#step + base;
  }

  #clamp(v: number): number {
    let result = this.#snapToStep(v);
    if (this.#min !== undefined) result = Math.max(this.#min, result);
    if (this.#max !== undefined) result = Math.min(this.#max, result);
    return result;
  }
}
