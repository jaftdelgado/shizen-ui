<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { ListBoxState, createListBoxHandlers } from "./_internal/index.js";
  import type { ListBoxProps, Key, Selection } from "./_internal/index.js";

  let {
    class: className,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    selectionMode = "single",
    selectedKeys = $bindable(new Set<Key>()),
    disabledKeys,
    variant = "default",
    onaction,
    children,
    ...rest
  }: ListBoxProps = $props();

  const listBox = new ListBoxState({
    selectionMode: () => selectionMode,
    selectedKeys: () => selectedKeys,
    disabledKeys: () => new Set<Key>(disabledKeys ?? []),
    variant: () => variant,
    setSelectedKeys: (keys: Selection) => {
      selectedKeys = keys;
    },
    onaction: () => onaction
  });

  const { handleKeyDown } = createListBoxHandlers(listBox);

  let listEl = $state<HTMLUListElement | undefined>();

  function getOptionEls(): HTMLLIElement[] {
    if (!listEl) return [];
    return Array.from<HTMLLIElement>(listEl.querySelectorAll("[role='option'][data-key]"));
  }

  function getItemKeys(): Key[] {
    return getOptionEls().map((el) => {
      const raw = el.dataset.key!;
      return isNaN(Number(raw)) ? raw : Number(raw);
    });
  }

  function getTextValueMap(): { key: Key; textValue: string }[] {
    return getOptionEls().map((el) => ({
      key: isNaN(Number(el.dataset.key!)) ? el.dataset.key! : Number(el.dataset.key!),
      textValue: el.dataset.textvalue ?? ""
    }));
  }

  function onKeyDown(e: KeyboardEvent & { currentTarget: HTMLUListElement }) {
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      const matched = listBox.handleTypeahead(e.key, getTextValueMap());
      if (matched !== null) {
        listBox.setFocusedKey(matched);
        const el = e.currentTarget.querySelector<HTMLLIElement>(`[data-key="${matched}"]`);
        el?.focus();
      }
      return;
    }

    handleKeyDown(e, getItemKeys());
  }
</script>

<ul
  bind:this={listEl}
  role="listbox"
  aria-label={ariaLabel}
  aria-labelledby={ariaLabelledBy}
  aria-multiselectable={selectionMode === "multiple" || undefined}
  class={cn(listBox.styles.base(), className)}
  onkeydown={onKeyDown}
  {...rest}
>
  {#if children}
    {@render children()}
  {/if}
</ul>
