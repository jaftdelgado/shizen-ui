<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { tagStyles, type TagVariants } from "@shizen-ui/styles";
  import { useTagGroupContext, setTagContext } from "../../contexts/internal/index.js";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import RemoveButton from "./compound/RemoveButton.svelte";

  type IconContent = Snippet<[]> | string;
  type SelectionMode = "none" | "single" | "multiple";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    variant?: TagVariants["variant"];
    size?: TagVariants["size"];
    value?: string;
    children?: Snippet;
    startContent?: IconContent;
    endContent?: IconContent;
    // Selection
    selectionMode?: SelectionMode;
    selected?: boolean;
    onSelectedChange?: (selected: boolean) => void;
    // Remove
    onClose?: () => void;
  }

  let {
    children,
    startContent,
    endContent,
    class: className,
    variant = "secondary",
    size = "md",
    value,
    selectionMode = "single",
    selected = $bindable(false),
    onSelectedChange,
    onClose,
    onclick,
    ...rest
  }: Props = $props();

  const group = useTagGroupContext();

  const resolvedVariant = $derived(group.exists ? (group.variant ?? variant) : variant);
  const resolvedSize = $derived(group.exists ? (group.size ?? size) : size);
  const resolvedMode = $derived(group.exists ? group.selectionMode : selectionMode);

  const isSelected = $derived(
    group.exists && value != null ? group.selectedValues.includes(value) : selected
  );

  const isInteractive = $derived(resolvedMode !== "none");

  setTagContext({ onClose: () => onClose?.() });

  function handleClick(event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) {
    if (isInteractive) {
      if (group.exists && value != null) {
        group.toggleValue(value);
      } else {
        const next = !selected;
        selected = next;
        onSelectedChange?.(next);
      }
    }
    if (typeof onclick === "function") onclick(event);
  }

  function handleKeyDown(event: KeyboardEvent & { currentTarget: EventTarget & HTMLDivElement }) {
    if (isInteractive && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      if (group.exists && value != null) {
        group.toggleValue(value);
      } else {
        const next = !selected;
        selected = next;
        onSelectedChange?.(next);
      }
    }
  }
</script>

{#snippet renderIcon(content: IconContent | undefined)}
  {#if typeof content === "string"}
    <i class={cn("flex items-center justify-center shrink-0", content)}></i>
  {:else if content}
    <span class="flex items-center justify-center shrink-0">
      {@render content()}
    </span>
  {/if}
{/snippet}

{#snippet tagContent()}
  <span class="tag__content">
    {@render renderIcon(startContent)}

    {#if children}
      <span class="flex items-center">
        {@render children()}
      </span>
    {/if}

    {@render renderIcon(endContent)}
  </span>
{/snippet}

{#if isInteractive}
  <div
    {...rest}
    class={cn(
      tagStyles({ variant: resolvedVariant, size: resolvedSize }),
      "tag--interactive",
      isSelected && "tag--selected",
      group.exists && group.disabled && "tag--disabled",
      className
    )}
    role="checkbox"
    aria-checked={isSelected}
    aria-disabled={group.exists && group.disabled ? true : undefined}
    tabindex={!(group.exists && group.disabled) ? 0 : undefined}
    onclick={handleClick}
    onkeydown={handleKeyDown}
  >
    {@render tagContent()}
  </div>
{:else}
  <div
    {...rest}
    class={cn(
      tagStyles({ variant: resolvedVariant, size: resolvedSize }),
      isSelected && "tag--selected",
      group.exists && group.disabled && "tag--disabled",
      className
    )}
  >
    {@render tagContent()}
  </div>
{/if}
