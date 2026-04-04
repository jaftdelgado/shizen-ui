<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { toggleStyles, type ToggleVariants } from "@shizen-ui/styles";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  type IconContent = Snippet<[]> | string;
  type ButtonClickEvent = MouseEvent & { currentTarget: EventTarget & HTMLButtonElement };

  interface BaseProps extends HTMLButtonAttributes {
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
    ...rest
  }: Props = $props();

  function handleClick(event: ButtonClickEvent) {
    if (disabled) return;
    pressed = !pressed;
    onPressedChange?.(pressed);
    onclick?.(event);
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

<button
  type="button"
  {disabled}
  aria-pressed={pressed}
  onclick={handleClick}
  {...rest}
  class={cn(
    toggleStyles({
      variant: variant ?? "default",
      size: size ?? "md",
      iconOnly
    }),
    className
  )}
>
  <span class="button__content relative z-10">
    {#if iconOnly}
      <span class="flex items-center justify-center shrink-0">
        {@render children?.()}
      </span>
    {:else}
      {@render renderIcon(startContent)}

      {#if children}
        <span class="flex items-center">
          {@render children()}
        </span>
      {/if}

      {@render renderIcon(endContent)}
    {/if}
  </span>
</button>
