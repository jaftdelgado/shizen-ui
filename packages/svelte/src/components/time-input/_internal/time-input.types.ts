import type { InputVariants } from "@shizen-ui/styles";

export interface TimeInputProps {
  size?: InputVariants["size"];
  variant?: InputVariants["variant"];
  value?: string;
  invalid?: boolean;
  disabled?: boolean;
  showSeconds?: boolean;
  hour12?: boolean;
  id?: string;
  class?: string;
  onchange?: (value: string) => void;
}

export interface TimeSegments {
  hh: string;
  mm: string;
  ss: string;
  ap: "AM" | "PM" | "";
}

export type PropsGetters = {
  readonly size: InputVariants["size"];
  readonly variant: InputVariants["variant"] | undefined;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly id: string | undefined;
};

export type RefsGetters = {
  readonly hhInput: HTMLElement | null;
  readonly mmInput: HTMLElement | null;
  readonly ssInput: HTMLElement | null;
  readonly apInput: HTMLElement | null;
};

export type DerivedGetters = {
  readonly finalDisabled: boolean;
};

export const HH12_CONFIG = { min: 1, max: 12, autoFocusThreshold: 1 } as const;
export const HH24_CONFIG = { min: 0, max: 23, autoFocusThreshold: 2 } as const;
export const MM_CONFIG = { min: 0, max: 59, autoFocusThreshold: 5 } as const;
export const SS_CONFIG = { min: 0, max: 59, autoFocusThreshold: 5 } as const;
export const AP_OPTIONS = ["AM", "PM"] as const;
export const AP_KEY_MAP = { a: "AM", p: "PM" } as const;
