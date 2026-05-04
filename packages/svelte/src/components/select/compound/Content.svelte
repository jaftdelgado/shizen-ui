<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { tick } from "svelte";
  import { SELECT_NAV_KEYS, useSelectContext } from "../_internal/index.js";
  import type { Key, SelectContentProps } from "../_internal/index.js";

  let { class: className, children }: SelectContentProps = $props();

  const ctx = useSelectContext();

  let el = $state<HTMLDivElement | undefined>();
  let didFocusOnOpen = $state(false);

  async function focusInitialItem(key: Key): Promise<void> {
    await tick();
    const target = el?.querySelector<HTMLElement>(`[data-key="${key}"]`);
    target?.focus({ preventScroll: true });
    ctx.setFocusedKey(key);
  }

  $effect(() => {
    if (!ctx.isOpen) {
      didFocusOnOpen = false;
      return;
    }
    if (!el || !ctx.openedByKeyboard || didFocusOnOpen) return;

    const selectedKeys = ctx.selectedKeys;
    const firstSelectableKey = ctx.getFirstSelectableKey();
    const targetKey =
      selectedKeys !== "all" && selectedKeys.size > 0
        ? (Array.from(selectedKeys)[0] ?? firstSelectableKey)
        : firstSelectableKey;

    if (targetKey === null || targetKey === undefined) return;

    didFocusOnOpen = true;

    void focusInitialItem(targetKey);
  });

  $effect(() => {
    const key = ctx.focusedKey;
    if (key === null || !el) return;
    const target = el.querySelector<HTMLElement>(`[data-key="${key}"]`);
    if (target && document.activeElement !== target) {
      target.focus({ preventScroll: true });
    }
  });
</script>

<div
  bind:this={el}
  role="listbox"
  tabindex="-1"
  aria-multiselectable={ctx.selectionMode === "multiple" || undefined}
  class={cn("select__content", className)}
  onkeydown={(e) => {
    if (SELECT_NAV_KEYS.includes(e.key as (typeof SELECT_NAV_KEYS)[number])) {
      e.preventDefault();
      e.stopPropagation();
    }
    ctx.handleContentKeydown(e);
  }}
>
  {#if children}
    {@render children()}
  {/if}
</div>
