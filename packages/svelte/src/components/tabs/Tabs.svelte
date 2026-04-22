<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { tabsStyles } from "@shizen-ui/styles";
  import { TabsState } from "./_internal/index.js";
  import type { TabsProps } from "./_internal/index.js";

  let {
    children,
    class: className,
    value = $bindable(""),
    onValueChange,
    ...rest
  }: TabsProps & { children: import("svelte").Snippet } = $props();

  const state = new TabsState(
    () => value,
    () => onValueChange
  );

  $effect(() => {
    state.syncFromProp();
  });

  const styles = tabsStyles();
</script>

<div class={cn(styles.base(), className)} {...rest}>
  {@render children()}
</div>
