import type { Snippet } from "svelte";
import type { HTMLAttributes, HTMLButtonAttributes } from "svelte/elements";

export type IconContent = Snippet<[]> | string;

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange?: (value: string) => void;
}

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  "aria-label"?: string;
  iconOnly?: boolean;
  children: Snippet;
}

interface TabBaseProps extends Omit<HTMLButtonAttributes, "role" | "children"> {
  value: string;
  disabled?: boolean;
}

interface NormalTabProps extends TabBaseProps {
  iconOnly?: false;
  children?: Snippet;
  startContent?: IconContent;
  endContent?: IconContent;
}

interface IconOnlyTabProps extends TabBaseProps {
  iconOnly: true;
  children: Snippet;
  startContent?: never;
  endContent?: never;
}

export type TabProps = NormalTabProps | IconOnlyTabProps;
