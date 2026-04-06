<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { useTagContext } from "../../../contexts/internal/index.js";
  import CloseButton from "../../close-button/CloseButton.svelte";

  interface Props extends HTMLButtonAttributes {
    children?: Snippet;
  }

  let { children, class: className, ...rest }: Props = $props();

  const tag = useTagContext();

  tag.registerRemoveButton(buttonSnippet);
</script>

{#snippet buttonSnippet()}
  <CloseButton
    {...rest}
    class={className}
    aria-label="Remove tag"
    tabindex={-1}
    onclick={(e) => {
      e.stopPropagation();
      tag.onClose?.();
    }}
    {children}
  />
{/snippet}
