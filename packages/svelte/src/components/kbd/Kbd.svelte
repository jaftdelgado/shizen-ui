<script lang="ts">
  import { cn, kbdStyles } from "@shizen-ui/styles";
  import type { KbdProps } from "./_internal/kbd.types.js";

  let { class: className, children, ...rest }: KbdProps = $props();

  const styles = kbdStyles();
</script>

<kbd class={cn(styles.base(), className)} {...rest}>
  {@render children?.()}
</kbd>
