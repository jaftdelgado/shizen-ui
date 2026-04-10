<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { tagGroupStyles } from "@shizen-ui/styles";
  import type { TagGroupProps } from "./tag-group.svelte.js";
  import { createTagGroupState } from "./tag-group.svelte.js";

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
  }: TagGroupProps = $props();

  const state = createTagGroupState(
    {
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
      get onSelectedValuesChange() {
        return onSelectedValuesChange;
      },
      get disabled() {
        return disabled;
      }
    },
    (values) => {
      selectedValues = values;
    }
  );

  const styles = tagGroupStyles();
</script>

<div class={cn(styles.base(), className)} role="group" data-disabled={state.disabled} {...rest}>
  {@render children()}
</div>
