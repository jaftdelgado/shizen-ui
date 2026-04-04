<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import {
    toggleGroupStyles,
    type ToggleGroupVariants,
    type ToggleVariants
  } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { setToggleGroupContext, type ToggleGroupType } from "../../contexts/internal/index.js";

  // Dos interfaces para type safety en el value según el tipo
  interface SingleProps extends HTMLAttributes<HTMLDivElement> {
    children: Snippet;
    type: "single";
    value?: string | null;
    onValueChange?: (value: string | null) => void;
    variant?: ToggleVariants["variant"];
    size?: ToggleVariants["size"];
    orientation?: ToggleGroupVariants["orientation"];
    hideSeparator?: boolean;
    disabled?: boolean;
  }

  interface MultipleProps extends HTMLAttributes<HTMLDivElement> {
    children: Snippet;
    type: "multiple";
    value?: string[];
    onValueChange?: (value: string[]) => void;
    variant?: ToggleVariants["variant"];
    size?: ToggleVariants["size"];
    orientation?: ToggleGroupVariants["orientation"];
    hideSeparator?: boolean;
    disabled?: boolean;
  }

  type Props = SingleProps | MultipleProps;

  let {
    children,
    class: className,
    type,
    value = $bindable(type === "multiple" ? [] : null),
    onValueChange,
    variant = "default",
    size = "md",
    orientation = "horizontal",
    hideSeparator = false,
    disabled = false,
    ...rest
  }: Props = $props();

  function isPressed(itemValue: string): boolean {
    if (type === "multiple") {
      return (value as string[]).includes(itemValue);
    }
    return value === itemValue;
  }

  function toggle(itemValue: string): void {
    if (type === "multiple") {
      const current = value as string[];
      const next = current.includes(itemValue)
        ? current.filter((v) => v !== itemValue)
        : [...current, itemValue];
      value = next;
      (onValueChange as ((v: string[]) => void) | undefined)?.(next);
    } else {
      // single: deseleccionar si ya está activo, seleccionar si no
      const next = value === itemValue ? null : itemValue;
      value = next;
      (onValueChange as ((v: string | null) => void) | undefined)?.(next);
    }
  }

  setToggleGroupContext({
    get type() {
      return type;
    },
    get variant() {
      return variant;
    },
    get size() {
      return size;
    },
    get disabled() {
      return disabled;
    },
    isPressed,
    toggle
  });
</script>

<div
  role="group"
  {...rest}
  aria-disabled={disabled}
  class={cn(toggleGroupStyles({ variant, size, orientation, hideSeparator }), className)}
>
  {@render children()}
</div>
