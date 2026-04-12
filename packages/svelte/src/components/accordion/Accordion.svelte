<script lang="ts">
  import { untrack } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { accordionStyles } from "@shizen-ui/styles";
  import { setAccordionContext, type AccordionType } from "../../contexts/internal/index.js";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    expandeMode?: AccordionType;
    disabled?: boolean;
    value?: string | string[];
  }

  let {
    class: className,
    expandeMode = "single",
    disabled = false,
    value: controlledValue,
    children,
    ...rest
  }: Props = $props();

  function toSet(value: string | string[] | undefined): Set<string> {
    if (value == null) return new Set();
    return new Set(Array.isArray(value) ? value : [value]);
  }

  let openItems = $state<Set<string>>(untrack(() => toSet(controlledValue)));

  $effect(() => {
    if (controlledValue !== undefined) {
      openItems = toSet(controlledValue);
    }
  });

  function toggleItem(id: string): void {
    if (disabled) return;

    if (expandeMode === "single") {
      openItems = openItems.has(id) ? new Set() : new Set([id]);
    } else {
      const next = new Set(openItems);
      next.has(id) ? next.delete(id) : next.add(id);
      openItems = next;
    }
  }

  setAccordionContext({
    get type() {
      return expandeMode;
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

<div class={cn(accordionStyles(), className)} {...rest}>
  {@render children?.()}
</div>
