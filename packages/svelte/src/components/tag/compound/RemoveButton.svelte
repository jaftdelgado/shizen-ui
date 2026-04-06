<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { useTagContext } from "../../../contexts/internal/index.js";
  import { cn } from "@shizen-ui/styles";

  interface Props extends HTMLButtonAttributes {
    children?: Snippet;
  }

  let { children, class: className, ...rest }: Props = $props();

  const tag = useTagContext();
</script>

<button
  {...rest}
  class={cn("tag__close", className)}
  onclick={(e) => {
    e.stopPropagation();
    tag.onClose?.();
  }}
  aria-label="Remove tag"
  tabindex={-1}
>
  {#if children}
    {@render children()}
  {:else}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      width="100%"
      height="100%"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  {/if}
</button>
