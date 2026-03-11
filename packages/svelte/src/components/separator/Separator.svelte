<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { separatorStyles } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    orientation?: "horizontal" | "vertical";
    decorative?: boolean;
    class?: string;
  }

  let {
    class: className,
    orientation = "horizontal",
    decorative = true,
    ...rest
  }: Props = $props();

  const styles = $derived(separatorStyles({ orientation }));

  const ariaProps = $derived(
    decorative
      ? { role: "none" as const }
      : { role: "separator" as const, "aria-orientation": orientation }
  );
</script>

<div
  class={cn(styles.base(), className)}
  data-orientation={orientation}
  {...ariaProps}
  {...rest}
></div>
