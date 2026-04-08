import type { Snippet } from "svelte";
import type { HTMLInputAttributes } from "svelte/elements";

export type CheckboxCheckedState = boolean | "mixed";

export interface CheckboxProps extends Omit<HTMLInputAttributes, "type" | "checked"> {
  value?: string;
  invalid?: boolean;
  disabled?: boolean;
  checked?: CheckboxCheckedState;
  children: Snippet;
  name?: string;
  id?: string;
}

export interface CheckboxContext {
  readonly checked: CheckboxCheckedState;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly id: string;
}

export interface FieldStateContext {
  readonly invalid: boolean;
  readonly disabled: boolean;
  readonly required: boolean;
  readonly id: string;
  readonly keepDescription: boolean;
}
