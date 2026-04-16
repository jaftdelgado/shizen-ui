<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { buttonStyles, type ButtonVariants } from "@shizen-ui/styles";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { useButtonGroupContext } from "../../contexts/internal/index.js";

  type IconContent = Snippet<[]> | string;

  interface BaseProps extends Omit<HTMLButtonAttributes, "children"> {
    variant?: ButtonVariants["variant"];
    size?: ButtonVariants["size"];
    loading?: boolean;
  }

  interface NormalProps extends BaseProps {
    iconOnly?: false;
    children?: Snippet<[boolean]>;
    startContent?: IconContent;
    endContent?: IconContent;
  }

  interface IconOnlyProps extends BaseProps {
    iconOnly: true;
    children: Snippet<[boolean]>;
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
    loading = false,
    iconOnly = false,
    ...rest
  }: Props = $props();

  const group = useButtonGroupContext();

  const finalVariant = $derived(group.variant ?? variant ?? "primary");
  const finalSize = $derived(group.size ?? size ?? "md");
  const isCurrentlyDisabled = $derived(group.disabled || (disabled ?? false) || loading);
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
  {type}
  {onclick}
  disabled={isCurrentlyDisabled}
  aria-busy={loading}
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
  <span class="button__content">
    {#if iconOnly}
      <span class="button__icon">
        {@render children?.(loading)}
      </span>
    {:else}
      {@render renderIcon(startContent)}

      {#if children}
        <span class="button__label">
          {@render children(loading)}
        </span>
      {/if}

      {@render renderIcon(endContent)}
    {/if}
  </span>
</button>
