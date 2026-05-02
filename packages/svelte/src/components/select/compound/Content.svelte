<script lang="ts">
  import { cn, portal } from "@shizen-ui/styles";
  import { useSelectContext } from "../_internal/index.js";
  import type { SelectContentProps } from "../_internal/index.js";

  let { class: className, children }: SelectContentProps = $props();

  const ctx = useSelectContext();

  let el = $state<HTMLDivElement | undefined>();

  $effect(() => {
    ctx.setContentEl(el ?? null);
    return () => ctx.setContentEl(null);
  });

  $effect(() => {
    if (!ctx.isOpen || !el) return;

    const keys = ctx.registry.orderedKeys();
    const firstKey = keys[0];
    if (firstKey === undefined) return;

    const selectedKeys = ctx.selectedKeys;
    const targetKey =
      selectedKeys !== "all" && selectedKeys.size > 0 ? Array.from(selectedKeys)[0] : firstKey;

    if (targetKey === undefined) return;

    requestAnimationFrame(() => {
      const target = el?.querySelector<HTMLElement>(`[data-key="${targetKey}"]`);
      target?.focus();
      ctx.setFocusedKey(targetKey ?? null);
    });
  });
</script>

{#if ctx.isOpen}
  <div
    use:portal
    bind:this={el}
    role="listbox"
    tabindex="-1"
    aria-multiselectable={ctx.selectionMode === "multiple" || undefined}
    class={cn("select__content", className)}
    data-state="open"
    onkeydown={(e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        ctx.close();
      }
    }}
  >
    {#if children}
      {@render children()}
    {/if}
  </div>
{/if}
