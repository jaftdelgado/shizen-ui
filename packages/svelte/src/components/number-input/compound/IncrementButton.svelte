<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { numberInputStyles } from "@shizen-ui/styles";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { useNumberInputContext } from "../../../contexts/internal/index.js";
  import { useHoldRepeat } from "../../../shared/use-hold-repeat.js";
  import { PlusIcon } from "../../../shared/icons";

  interface Props extends Omit<HTMLButtonAttributes, "disabled" | "onclick"> {
    children?: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();

  const ctx = useNumberInputContext();

  const { button } = numberInputStyles();

  const { start, stop } = useHoldRepeat(
    () => ctx.increment(),
    () => ctx.canIncrement
  );
</script>

<button
  type="button"
  aria-label="Increment"
  disabled={!ctx.canIncrement}
  onpointerdown={start}
  onpointerup={stop}
  onpointerleave={stop}
  oncontextmenu={(e) => e.preventDefault()}
  class={cn(button({ position: "right" }), className)}
  {...rest}
>
  {#if children}
    {@render children()}
  {:else}
    <PlusIcon aria-hidden="true" />
  {/if}
</button>
