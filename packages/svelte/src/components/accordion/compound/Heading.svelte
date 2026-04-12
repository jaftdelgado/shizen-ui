<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { accordionHeadingStyles } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends HTMLAttributes<HTMLParagraphElement> {}

  let { class: className, children, ...rest }: Props = $props();
</script>

<p class={cn(accordionHeadingStyles(), className)} {...rest}>
  {@render children?.()}
</p>
