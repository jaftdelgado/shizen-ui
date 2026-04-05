<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { tagStyles, type TagVariants } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  type IconContent = Snippet<[]> | string;
  type SelectionMode = "none" | "single" | "multiple";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    variant?: TagVariants["variant"];
    size?: TagVariants["size"];
    children?: Snippet;
    startContent?: IconContent;
    endContent?: IconContent;
    // Selection
    selectionMode?: SelectionMode;
    selected?: boolean;
    onSelectedChange?: (selected: boolean) => void;
    // Closable
    closable?: boolean;
    onClose?: () => void;
  }

  let {
    children,
    startContent,
    endContent,
    class: className,
    variant = "secondary",
    size = "md",
    selectionMode = "none",
    selected = $bindable(false),
    onSelectedChange,
    closable = false,
    onClose,
    onclick,
    ...rest
  }: Props = $props();

  const isInteractive = $derived(selectionMode !== "none");

  function handleClick(event: MouseEvent) {
    if (isInteractive) {
      const next = !selected;
      selected = next;
      onSelectedChange?.(next);
    }
    if (typeof onclick === "function") onclick(event);
  }

  function handleClose(event: MouseEvent) {
    event.stopPropagation();
    onClose?.();
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (isInteractive && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      const next = !selected;
      selected = next;
      onSelectedChange?.(next);
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

<div
  {...rest}
  class={cn(
    tagStyles({ variant, size }),
    isInteractive && "tag--interactive",
    selected && "tag--selected",
    className
  )}
  role={isInteractive ? "checkbox" : undefined}
  aria-checked={isInteractive ? selected : undefined}
  tabindex={isInteractive ? 0 : undefined}
  onclick={handleClick}
  onkeydown={handleKeyDown}
>
  <span class="tag__content">
    {@render renderIcon(startContent)}

    {#if children}
      <span class="flex items-center">
        {@render children()}
      </span>
    {/if}

    {@render renderIcon(endContent)}

    {#if closable}
      <button class="tag__close" onclick={handleClose} aria-label="Remove tag" tabindex={-1}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          width="100%"
          height="100%"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    {/if}
  </span>
</div>
