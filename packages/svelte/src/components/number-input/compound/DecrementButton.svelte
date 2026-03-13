<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { numberInputStyles } from "@shizen-ui/styles";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { useNumberInputContext } from "../../../contexts/internal/index.js";

  interface Props extends Omit<HTMLButtonAttributes, "disabled" | "onclick"> {
    children?: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();

  const ctx = useNumberInputContext();

  const { button } = numberInputStyles();
</script>

<button
  type="button"
  aria-label="Decrement"
  disabled={!ctx.canDecrement}
  onclick={() => ctx.decrement()}
  class={cn(button({ position: "left" }), className)}
  {...rest}
>
  {#if children}
    {@render children()}
  {:else}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
    </svg>
  {/if}
</button>
