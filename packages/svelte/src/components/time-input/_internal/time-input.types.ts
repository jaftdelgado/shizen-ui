import type { InputVariants } from "@shizen-ui/styles";

export interface TimeInputProps {
  size?: InputVariants["size"];
  variant?: InputVariants["variant"];
  value?: string;
  invalid?: boolean;
  disabled?: boolean;
  id?: string;
  class?: string;
  onchange?: (value: string) => void;
}

export interface TimeSegments {
  hh: string;
  mm: string;
  ap: "AM" | "PM";
}

export type PropsGetters = {
  readonly size: InputVariants["size"];
  readonly variant: InputVariants["variant"] | undefined;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly id: string | undefined;
};

export type RefsGetters = {
  readonly hhInput: HTMLInputElement | null;
  readonly mmInput: HTMLInputElement | null;
  readonly apInput: HTMLInputElement | null;
};

export type DerivedGetters = {
  readonly finalDisabled: boolean;
};

export const HH_CONFIG = { min: 1, max: 12, autoFocusThreshold: 1 } as const;
export const MM_CONFIG = { min: 0, max: 59, autoFocusThreshold: 5 } as const;
export const AP_OPTIONS = ["AM", "PM"] as const;
export const AP_KEY_MAP = { a: "AM", p: "PM" } as const;
