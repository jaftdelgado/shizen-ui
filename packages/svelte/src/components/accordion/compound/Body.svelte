<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { accordionBodyStyles } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends HTMLAttributes<HTMLDivElement> {}

  let { class: className, children, ...rest }: Props = $props();
</script>

<div class={cn(accordionBodyStyles(), className)} {...rest}>
  {@render children?.()}
</div>
