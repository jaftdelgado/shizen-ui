<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { ListBoxState, createListBoxKeyboardNav } from "./_internal/index.js";
  import type { ListBoxProps, Key, Selection } from "./_internal/index.js";

  let {
    class: className,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    selectionMode = "single",
    selectedKeys = $bindable(new Set<Key>()),
    disabledKeys,
    variant = "default",
    focusStrategy = "roving",
    onaction,
    children,
    ...rest
  }: ListBoxProps = $props();

  const listBox = new ListBoxState({
    selectionMode: () => selectionMode,
    selectedKeys: () => selectedKeys,
    disabledKeys: () => new Set<Key>(disabledKeys ?? []),
    variant: () => variant,
    focusStrategy: () => focusStrategy,
    setSelectedKeys: (keys: Selection) => {
      selectedKeys = keys;
    },
    onaction: () => onaction
  });

  let listEl = $state<HTMLUListElement | undefined>();

  function focusItemEl(key: Key): void {
    if (focusStrategy !== "roving" || !listEl) return;
    listEl.querySelector<HTMLLIElement>(`[data-key="${key}"]`)?.focus();
  }

  const nav = createListBoxKeyboardNav(listBox, focusItemEl);

  function onKeyDown(e: KeyboardEvent & { currentTarget: HTMLUListElement }) {
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      const matched = listBox.handleTypeahead(e.key);
      if (matched !== null) {
        listBox.setFocusedKey(matched);
        focusItemEl(matched);
      }
      return;
    }

    const handled = nav.handleKeyDown(e);
    if (handled) e.preventDefault();
  }
</script>

<ul
  bind:this={listEl}
  role="listbox"
  aria-label={ariaLabel}
  aria-labelledby={ariaLabelledBy}
  aria-multiselectable={selectionMode === "multiple" || undefined}
  aria-activedescendant={focusStrategy === "activedescendant" && listBox.focusedKey !== null
    ? String(listBox.focusedKey)
    : undefined}
  class={cn(listBox.styles.base(), className)}
  onkeydown={onKeyDown}
  {...rest}
>
  {#if children}
    {@render children()}
  {/if}
</ul>
