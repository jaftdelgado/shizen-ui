<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { buttonStyles, type ButtonVariants } from "@shizen-ui/styles";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { getContext } from "svelte";

  type IconContent = Snippet | string;

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
    variant = "primary",
    size = "md",
    disabled = false,
    iconOnly = false,
    ...rest
  }: Props = $props();

  const BUTTON_GROUP_CTX_KEY = "button-group";
  const groupContext = getContext<{
    variant: ButtonVariants["variant"];
    size: ButtonVariants["size"];
  }>(BUTTON_GROUP_CTX_KEY);

  const finalVariant = $derived(groupContext?.variant ?? variant);
  const finalSize = $derived(groupContext?.size ?? size);
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
  {disabled}
  {...rest}
  class={cn(
    buttonStyles({
      variant: finalVariant,
      size: finalSize,
      iconOnly: iconOnly as any
    }),
    className
  )}
>
  <span class="button__content relative z-10">
    {#if iconOnly}
      {@render children?.()}
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
