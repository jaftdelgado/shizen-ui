<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { useTagContext } from "../../../contexts/internal/index.js";
  import CloseButton from "../../close-button/CloseButton.svelte";

  const keys = ["Enter", " ", "Backspace", "Delete"];

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
    onclick={(e) => {
      e.stopPropagation();
      tag.onClose?.();
    }}
    onkeydown={(e) => {
      if (keys.includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        tag.onClose?.();
        return;
      }

      if (e.key === "Tab" && e.shiftKey) {
        e.preventDefault();
        const tagEl = (e.currentTarget as HTMLElement).closest<HTMLElement>("[role='checkbox']");
        tagEl?.focus();
        return;
      }
    }}
    {children}
  />
{/snippet}
