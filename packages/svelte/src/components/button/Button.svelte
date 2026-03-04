<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { buttonStyles, type ButtonVariants } from "@shizen-ui/styles";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { useButtonGroupContext } from "../button-group/button-group.context";

  type IconContent = Snippet<[]> | string;

  interface BaseProps extends HTMLButtonAttributes {
    variant?: ButtonVariants["variant"];
    size?: ButtonVariants["size"];
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
    type = "button",
    variant,
    size,
    disabled,
    iconOnly = false,
    ...rest
  }: Props = $props();

  const group = useButtonGroupContext();

  const finalVariant = $derived(group.variant ?? variant ?? "primary");
  const finalSize = $derived(group.size ?? size ?? "md");
  const isCurrentlyDisabled = $derived(group.disabled || (disabled ?? false));
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
  {type}
  {onclick}
  disabled={isCurrentlyDisabled}
  {...rest}
  class={cn(
    buttonStyles({
      variant: finalVariant,
      size: finalSize,
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
