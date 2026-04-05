<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { tagGroupStyles } from "@shizen-ui/styles";
  import type { TagVariants } from "@shizen-ui/styles";
  import { setTagGroupContext, type TagSelectionMode } from "../../contexts/internal/index.js";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children: Snippet;
    class?: string;
    variant?: TagVariants["variant"];
    size?: TagVariants["size"];
    selectionMode?: TagSelectionMode;
    selectedValues?: string[];
    onSelectedValuesChange?: (values: string[]) => void;
    disabled?: boolean;
  }

  let {
    children,
    class: className,
    variant,
    size,
    selectionMode = "single",
    selectedValues = $bindable<string[]>([]),
    onSelectedValuesChange,
    disabled = false,
    ...rest
  }: Props = $props();

  function toggleValue(nextValue: string) {
    if (disabled) return;

    if (selectionMode === "single") {
      selectedValues = selectedValues[0] === nextValue ? [] : [nextValue];
      onSelectedValuesChange?.(selectedValues);
      return;
    }

    if (selectionMode === "multiple") {
      selectedValues = selectedValues.includes(nextValue)
        ? selectedValues.filter((v) => v !== nextValue)
        : [...selectedValues, nextValue];
      onSelectedValuesChange?.(selectedValues);
    }
  }

  setTagGroupContext({
    get variant() {
      return variant;
    },
    get size() {
      return size;
    },
    get selectionMode() {
      return selectionMode;
    },
    get selectedValues() {
      return selectedValues;
    },
    get disabled() {
      return disabled;
    },
    toggleValue
  });

  const styles = tagGroupStyles();
</script>

<div class={cn(styles.base(), className)} role="group" data-disabled={disabled} {...rest}>
  {@render children()}
</div>
