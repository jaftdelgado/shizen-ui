import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface RadioProps extends Omit<HTMLAttributes<HTMLDivElement>, "checked"> {
  value: string;
  invalid?: boolean;
  disabled?: boolean;
  checked?: boolean;
  children: Snippet;
  name?: string;
  id?: string;
}

export interface RadioContext {
  readonly checked: boolean;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly id: string;
}

export interface RadioStateProps {
  readonly value: string;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly name: string | undefined;
  readonly id: string;
  readonly checked: boolean;
}
