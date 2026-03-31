<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { chipStyles, type ChipVariants } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  type IconContent = Snippet<[]> | string;

  interface Props extends HTMLAttributes<HTMLDivElement> {
    variant?: ChipVariants["variant"];
    color?: ChipVariants["color"];
    size?: ChipVariants["size"];
    children?: Snippet;
    startContent?: IconContent;
    endContent?: IconContent;
  }

  let {
    children,
    startContent,
    endContent,
    class: className,
    variant = "secondary",
    color = "default",
    size = "md",
    ...rest
  }: Props = $props();
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

<div {...rest} class={cn(chipStyles({ variant, color, size }), className)}>
  <span class="chip__content">
    {@render renderIcon(startContent)}

    {#if children}
      <span class="flex items-center">
        {@render children()}
      </span>
    {/if}

    {@render renderIcon(endContent)}
  </span>
</div>
