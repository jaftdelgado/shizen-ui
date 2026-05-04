<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { useSelectContext } from "../_internal/index.js";
  import type { SelectValueProps } from "../_internal/index.js";

  let { class: className, children }: SelectValueProps = $props();

  const ctx = useSelectContext();

  const selectedKeys = $derived(ctx.selectedKeys);

  const hasValue = $derived(selectedKeys !== "all" ? selectedKeys.size > 0 : true);

  const displayText = $derived.by(() => {
    if (selectedKeys === "all") return "All";
    if (selectedKeys.size === 0) return null;
    return Array.from(selectedKeys)
      .map((key) => ctx.getTextValue(key) ?? String(key))
      .join(", ");
  });
</script>

{#if children}
  {@render children({ selectedKeys, hasValue })}
{:else if hasValue && displayText}
  <span class={cn("select__value", className)}>
    {displayText}
  </span>
{:else}
  <span class={cn("select__placeholder", className)}>
    {ctx.placeholder ?? ""}
  </span>
{/if}
