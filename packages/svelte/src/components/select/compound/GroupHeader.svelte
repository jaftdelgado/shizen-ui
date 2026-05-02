<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import type { SelectGroupHeaderProps } from "../_internal/index.js";

  let { class: className, children }: SelectGroupHeaderProps = $props();
</script>

<div class={cn("select__group-header", className)} aria-hidden="true">
  {#if children}
    {@render children()}
  {/if}
</div>
