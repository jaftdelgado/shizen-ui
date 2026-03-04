export type RadioOrientation = "horizontal" | "vertical";

export interface RadioContextValue {
  readonly checked: boolean;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly id: string;
}

export interface RadioGroupContextValue {
  readonly value: string | undefined;
  readonly name: string;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly orientation: RadioOrientation;
  setValue: (value: string) => void;
}

export const RADIO_CONTEXT_KEY = Symbol("radio-context");
export const RADIO_GROUP_CONTEXT_KEY = Symbol("radio-group-context");
