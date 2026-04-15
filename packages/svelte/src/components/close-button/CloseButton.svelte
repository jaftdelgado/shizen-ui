<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { closeButtonStyles } from "@shizen-ui/styles";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import XmarkIcon from "../../shared/icons/XmarkIcon.svelte";

  interface Props extends HTMLButtonAttributes {
    children?: Snippet;
    ref?: HTMLButtonElement | null;
  }

  let { children, class: className, ref = $bindable(null), ...rest }: Props = $props();
</script>

<button
  bind:this={ref}
  type="button"
  aria-label="Close"
  {...rest}
  class={cn(closeButtonStyles(), className)}
>
  <span class="close-button__icon">
    {#if children}
      {@render children()}
    {:else}
      <XmarkIcon size="80%" />
    {/if}
  </span>
</button>
