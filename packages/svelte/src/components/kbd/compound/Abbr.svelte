<script lang="ts">
  import { cn, kbdStyles } from "@shizen-ui/styles";
  import type { KbdAbbrProps } from "../_internal/kbd.types.js";

  let { class: className, title, children, ...rest }: KbdAbbrProps = $props();

  const styles = kbdStyles();
</script>

<abbr class={cn(styles.abbr(), className)} {title} {...rest}>
  {@render children?.()}
</abbr>
