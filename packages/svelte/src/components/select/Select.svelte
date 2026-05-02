<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { SelectState } from "./_internal/index.js";
  import type { SelectProps, Key, Selection } from "./_internal/index.js";

  let {
    class: className,
    selectionMode = "single",
    selectedKeys = $bindable(new Set<Key>()),
    disabledKeys,
    placeholder,
    disabled = false,
    invalid = false,
    onaction,
    children,
    ...rest
  }: SelectProps = $props();

  let isOpen = $state(false);

  const select = new SelectState({
    selectionMode: () => selectionMode,
    selectedKeys: () => selectedKeys,
    disabledKeys: () => new Set<Key>(disabledKeys ?? []),
    disabled: () => disabled,
    invalid: () => invalid,
    placeholder: () => placeholder,
    setSelectedKeys: (keys: Selection) => {
      selectedKeys = keys;
    },
    onaction: () => onaction,
    isOpen: () => isOpen,
    setIsOpen: (val) => {
      isOpen = val;
    },
    onOpenChange: () => undefined
  });
</script>

<div
  class={cn(select.styles.base(), className)}
  data-disabled={disabled ? "" : undefined}
  data-invalid={invalid ? "" : undefined}
  {...rest}
>
  {#if children}
    {@render children()}
  {/if}
</div>
