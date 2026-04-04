<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { toggleStyles, type ToggleVariants } from "@shizen-ui/styles";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { useToggleGroupContext } from "../../contexts/internal/index.js";

  type IconContent = Snippet<[]> | string;
  type ButtonClickEvent = MouseEvent & { currentTarget: EventTarget & HTMLButtonElement };

  interface BaseProps extends HTMLButtonAttributes {
    value?: string;
    variant?: ToggleVariants["variant"];
    size?: ToggleVariants["size"];
    pressed?: boolean;
    onPressedChange?: (pressed: boolean) => void;
  }

  interface NormalProps extends BaseProps {
    iconOnly?: false;
    children?: Snippet;
    startContent?: IconContent;
    endContent?: IconContent;
  }

  interface IconOnlyProps extends BaseProps {
    iconOnly: true;
    children: Snippet;
    startContent?: never;
    endContent?: never;
  }

  type Props = NormalProps | IconOnlyProps;

  let {
    children,
    startContent,
    endContent,
    onclick,
    class: className,
    variant,
    size,
    disabled,
    iconOnly = false,
    pressed = $bindable(false),
    onPressedChange,
    value,
    ...rest
  }: Props = $props();

  const group = useToggleGroupContext();

  // Si estamos en un grupo, el estado de pressed lo manda el grupo
  const isPressed = $derived(
    group.exists && value !== undefined ? group.isPressed(value) : pressed
  );

  const isDisabled = $derived(disabled || (group.exists && group.disabled));
  const resolvedVariant = $derived(variant ?? group.variant ?? "default");
  const resolvedSize = $derived(size ?? group.size ?? "md");

  function handleClick(event: ButtonClickEvent) {
    if (isDisabled) return;

    if (group.exists && value !== undefined) {
      group.toggle(value);
    } else {
      pressed = !pressed;
      onPressedChange?.(pressed);
    }

    onclick?.(event);
  }
</script>

{#snippet renderIcon(content: IconContent | undefined)}
  {#if typeof content === "string"}
    <i class={content}></i>
  {:else if content}
    <span class="button__icon">
      {@render content()}
    </span>
  {/if}
{/snippet}

<button
  type="button"
  disabled={isDisabled}
  aria-pressed={isPressed}
  onclick={handleClick}
  {...rest}
  class={cn(
    toggleStyles({
      variant: resolvedVariant,
      size: resolvedSize,
      iconOnly
    }),
    className
  )}
>
  <span class="button__content">
    {#if iconOnly}
      <span class="button__icon">
        {@render children?.()}
      </span>
    {:else}
      {@render renderIcon(startContent)}

      {#if children}
        <span class="button__label">
          {@render children()}
        </span>
      {/if}

      {@render renderIcon(endContent)}
    {/if}
  </span>
</button>
