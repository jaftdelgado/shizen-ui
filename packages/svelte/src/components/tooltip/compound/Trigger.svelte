<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { tooltipStyles } from "@shizen-ui/styles";
  import { useTooltipContext } from "../../../contexts/internal/index.js";

  interface Props {
    children: Snippet;
    class?: string;
  }

  let { children, class: className }: Props = $props();

  const ctx = useTooltipContext();
  const styles = $derived(tooltipStyles());

  let el = $state<HTMLElement | null>(null);

  $effect(() => {
    if (el) {
      ctx.registerTrigger(el);
    }
  });
</script>

<span
  bind:this={el}
  id={ctx.triggerId}
  class={cn(styles.trigger(), className)}
  aria-describedby={ctx.open ? ctx.contentId : undefined}
  onmouseenter={ctx.show}
  onmouseleave={ctx.hide}
  onfocus={ctx.show}
  onblur={ctx.hide}
  role="none"
>
  {@render children()}
</span>
