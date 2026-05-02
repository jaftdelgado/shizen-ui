<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import type { SelectGroupProps } from "../_internal/index.js";

  let { class: className, children }: SelectGroupProps = $props();
</script>

<div role="group" class={cn("select__group", className)}>
  {#if children}
    {@render children()}
  {/if}
</div>
