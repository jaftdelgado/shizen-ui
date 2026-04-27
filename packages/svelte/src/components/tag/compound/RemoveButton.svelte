<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { useTagContext } from "../_internal/index.js";
  import CloseButton from "../../close-button/CloseButton.svelte";

  interface Props extends HTMLButtonAttributes {
    children?: Snippet;
  }

  let { children, class: className, tabindex = -1, ...rest }: Props = $props();

  const tag = useTagContext();

  tag.registerRemoveButton(buttonSnippet);
</script>

{#snippet buttonSnippet()}
  <CloseButton
    {...rest}
    class={className}
    aria-label="Remove tag"
    {tabindex}
    data-remove-button
    onclick={tag.onRemoveButtonClick}
    onkeydown={tag.onRemoveButtonKeyDown}
    {children}
  />
{/snippet}
