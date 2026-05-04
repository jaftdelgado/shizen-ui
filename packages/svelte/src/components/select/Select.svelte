<script lang="ts">
  import { cn, selectStyles } from "@shizen-ui/styles";
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
    placement,
    strategy,
    offset,
    onOpenChange,
    onaction,
    children,
    ...rest
  }: SelectProps = $props();

  let isOpen = $state(false);
  const disabledKeysSet = $derived(new Set<Key>(disabledKeys ?? []));

  const select = new SelectState({
    selectionMode: () => selectionMode,
    selectedKeys: () => selectedKeys,
    disabledKeys: () => disabledKeysSet,
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
    onOpenChange: () => onOpenChange,
    placement: () => placement,
    strategy: () => strategy,
    offset: () => offset
  });
</script>

<div
  class={cn(selectStyles({}).base(), className)}
  data-disabled={disabled ? "" : undefined}
  data-invalid={invalid ? "" : undefined}
  {...rest}
>
  {#if children}
    {@render children()}
  {/if}
</div>
