<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";
  import { tabsStyles } from "@shizen-ui/styles";

  interface Props extends HTMLAttributes<HTMLSpanElement> {}

  let { class: className, ...rest }: Props = $props();

  const styles = tabsStyles();
</script>

<span aria-hidden="true" class={cn(styles.indicator(), className)} {...rest}></span>
