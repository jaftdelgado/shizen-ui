<script lang="ts">
  import { getContext } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { descriptionStyles } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  interface Props extends HTMLAttributes<HTMLParagraphElement> {
    children: Snippet;
    disabled?: boolean;
    id?: string;
  }

  let { children, class: className, disabled = false, id: propId, ...rest }: Props = $props();

  const FIELD_STATE_CTX_KEY = "field-state";

  const fieldState = getContext<{
    invalid?: boolean;
    disabled?: boolean;
    id?: string;
    keepDescription?: boolean;
  }>(FIELD_STATE_CTX_KEY);

  const finalInvalid = $derived(fieldState?.invalid ?? false);
  const finalDisabled = $derived(fieldState?.disabled ?? disabled);
  const finalId = $derived(propId ?? (fieldState?.id ? `${fieldState.id}-description` : undefined));

  const shouldShow = $derived(!finalInvalid || fieldState?.keepDescription);
</script>

{#if shouldShow}
  <p
    id={finalId}
    class={cn(
      descriptionStyles({
        disabled: finalDisabled
      }),
      className
    )}
    data-slot="description"
    data-disabled={finalDisabled}
    data-invalid={finalInvalid}
    {...rest}
  >
    {@render children()}
  </p>
{/if}
