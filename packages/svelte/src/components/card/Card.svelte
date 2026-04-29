<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { cardStyles } from "@shizen-ui/styles";
  import type { CardProps } from "./_internal/card.types.js";

  let { class: className, variant = "default", children, ...rest }: CardProps = $props();

  const styles = $derived(cardStyles({ variant }));
</script>

<div class={cn(styles.base(), className)} {...rest}>
  {@render children()}
</div>
