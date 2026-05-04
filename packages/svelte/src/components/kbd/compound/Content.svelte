<script lang="ts">
  import { cn, kbdStyles } from "@shizen-ui/styles";
  import type { KbdContentProps } from "../_internal/kbd.types.js";

  let { class: className, children, ...rest }: KbdContentProps = $props();

  const styles = kbdStyles();
</script>

<span class={cn(styles.content(), className)} {...rest}>
  {@render children?.()}
</span>
