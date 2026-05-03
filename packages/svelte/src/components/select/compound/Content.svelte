<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { useSelectContext } from "../_internal/index.js";
  import type { SelectContentProps } from "../_internal/index.js";

  let { class: className, children }: SelectContentProps = $props();

  const ctx = useSelectContext();

  let el = $state<HTMLDivElement | undefined>();
  let didFocusOnOpen = $state(false);

  $effect(() => {
    if (!ctx.isOpen) {
      didFocusOnOpen = false;
      return;
    }
    if (!el || !ctx.openedByKeyboard || didFocusOnOpen) return;

    const keys = ctx.registry.orderedKeys();
    const firstKey = keys[0];
    if (firstKey === undefined) return;

    const selectedKeys = ctx.selectedKeys;
    const targetKey =
      selectedKeys !== "all" && selectedKeys.size > 0 ? Array.from(selectedKeys)[0] : firstKey;

    if (targetKey === undefined) return;

    didFocusOnOpen = true;

    requestAnimationFrame(() => {
      const target = el?.querySelector<HTMLElement>(`[data-key="${targetKey}"]`);
      target?.focus();
      ctx.setFocusedKey(targetKey ?? null);
    });
  });
</script>

<div
  bind:this={el}
  role="listbox"
  tabindex="-1"
  aria-multiselectable={ctx.selectionMode === "multiple" || undefined}
  class={cn("select__content", className)}
  onkeydown={(e) => {
    if (["ArrowDown", "ArrowUp", "Home", "End", "Enter", " "].includes(e.key)) {
      e.preventDefault();
    }
    ctx.handleContentKeydown(e);
  }}
>
  {#if children}
    {@render children()}
  {/if}
</div>
