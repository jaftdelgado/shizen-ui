<script lang="ts">
  import { getContext } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { descriptionStyles } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  interface Props extends HTMLAttributes<HTMLParagraphElement> {
    children: Snippet;
    disabled?: boolean;
  }

  let { children, class: className, disabled = false, ...rest }: Props = $props();

  const FIELD_STATE_CTX_KEY = "field-state";

  const fieldState = getContext<{
    invalid?: boolean;
    disabled?: boolean;
  }>(FIELD_STATE_CTX_KEY);

  // Derivamos estados finales
  const finalInvalid = $derived(fieldState?.invalid ?? false);
  const finalDisabled = $derived(fieldState?.disabled ?? disabled);
</script>

{#if !finalInvalid}
  <p
    class={cn(
      descriptionStyles({
        disabled: finalDisabled
      }),
      className
    )}
    data-slot="description"
    data-disabled={finalDisabled}
    {...rest}
  >
    {@render children()}
  </p>
{/if}
