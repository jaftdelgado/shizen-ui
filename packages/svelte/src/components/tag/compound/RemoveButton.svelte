<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { useTagContext } from "../../../contexts/internal/index.js";
  import CloseButton from "../../close-button/CloseButton.svelte";

  const keys = ["Enter", " ", "Backspace", "Delete"];

  interface Props extends HTMLButtonAttributes {
    children?: Snippet;
  }

  let { children, class: className, tabindex = 0, ...rest }: Props = $props();

  const tag = useTagContext();

  tag.registerRemoveButton(buttonSnippet);
</script>

{#snippet buttonSnippet()}
  <CloseButton
    {...rest}
    class={className}
    aria-label="Remove tag"
    {tabindex}
    onclick={(e) => {
      e.stopPropagation();
      tag.onClose?.();
    }}
    onkeydown={(e) => {
      if (keys.includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        tag.onClose?.();
      }
    }}
    {children}
  />
{/snippet}
