<script lang="ts">
  import { getContext, type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { checkboxStyles } from "@shizen-ui/styles";

  let { children, class: className }: { children?: Snippet; class?: string } = $props();

  const ctx = getContext<any>("checkbox-context");
  const styles = $derived(checkboxStyles({}));

  const isCustom = $derived(!!children);
</script>

{#if ctx.checked === true || ctx.checked === "mixed"}
  <span
    class={cn(!isCustom && styles.indicator(), className)}
    data-checked={ctx.checked}
    data-custom={isCustom}
  >
    {#if children}
      {@render children()}
    {:else if ctx.checked === "mixed"}
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 5H8"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    {:else}
      <svg
        width="12"
        height="12"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.5 5L4 7.5L8.5 2.5"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    {/if}
  </span>
{/if}
