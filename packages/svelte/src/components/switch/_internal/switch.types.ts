import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import type { SwitchSize } from "../../../contexts/internal/index.js";

export interface SwitchProps extends Omit<HTMLAttributes<HTMLDivElement>, "checked"> {
  value?: string;
  invalid?: boolean;
  disabled?: boolean;
  checked?: boolean;
  children: Snippet;
  name?: string;
  id?: string;
  size?: SwitchSize;
}
