<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { accordionStyles, type AccordionStyleVariants } from "@shizen-ui/styles";
  import {
    setAccordionContext,
    type AccordionType,
    type AccordionVariant
  } from "../../contexts/internal/index.js";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    variant?: AccordionStyleVariants["variant"];
    type?: AccordionType;
    disabled?: boolean;
    defaultValue?: string | string[];
    value?: string | string[];
  }

  let {
    class: className,
    variant = "default",
    type = "single",
    disabled = false,
    defaultValue,
    value: controlledValue,
    children,
    ...rest
  }: Props = $props();

  let openItems = $state<Set<string>>(
    new Set(
      controlledValue != null
        ? Array.isArray(controlledValue)
          ? controlledValue
          : [controlledValue]
        : defaultValue != null
          ? Array.isArray(defaultValue)
            ? defaultValue
            : [defaultValue]
          : []
    )
  );

  function toggleItem(id: string): void {
    if (disabled) return;

    if (type === "single") {
      if (openItems.has(id)) {
        openItems = new Set();
      } else {
        openItems = new Set([id]);
      }
    } else {
      const next = new Set(openItems);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      openItems = next;
    }
  }

  setAccordionContext({
    get type() {
      return type;
    },
    get variant() {
      return variant as AccordionVariant;
    },
    get disabled() {
      return disabled;
    },
    get openItems() {
      return openItems;
    },
    get toggleItem() {
      return toggleItem;
    }
  });
</script>

<div class={cn(accordionStyles({ variant }), className)} data-variant={variant} {...rest}>
  {@render children?.()}
</div>
