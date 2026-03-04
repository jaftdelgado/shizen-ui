export type CheckboxCheckedState = boolean | "mixed";
export type CheckboxOrientation = "horizontal" | "vertical";

export interface CheckboxContextValue {
  readonly checked: CheckboxCheckedState;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly id: string;
}

export interface CheckboxGroupContextValue {
  readonly value: string[];
  readonly name: string;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly orientation: CheckboxOrientation;
  toggleValue: (val: string) => void;
}

export const CHECKBOX_CONTEXT_KEY = Symbol("checkbox-context");
export const CHECKBOX_GROUP_CONTEXT_KEY = Symbol("checkbox-group-context");
