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
      ctx.registerContent(el);
    }
  });
</script>

{#if ctx.exists}
  <div
    bind:this={el}
    id={ctx.contentId}
    role="tooltip"
    class={cn(styles.content(), className)}
    data-state={ctx.open ? "visible" : "hidden"}
    data-placement={ctx.placement}
    style="position: fixed; left: 0; top: 0;"
    aria-hidden={!ctx.open}
    inert={!ctx.open || undefined}
  >
    {@render children()}
  </div>
{/if}
