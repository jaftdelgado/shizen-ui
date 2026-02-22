<script lang="ts">
  import { getContext } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { fieldErrorStyles, type FieldErrorVariants } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  interface Props extends HTMLAttributes<HTMLParagraphElement> {
    children: Snippet;
    truncate?: boolean;
    invalid?: boolean;
    id?: string;
  }

  let {
    children,
    class: className,
    truncate = false,
    invalid = false,
    id: propId,
    ...rest
  }: Props = $props();

  const FIELD_STATE_CTX_KEY = "field-state";

  const fieldState = getContext<{
    invalid?: boolean;
    id?: string;
  }>(FIELD_STATE_CTX_KEY);

  const finalInvalid = $derived(fieldState?.invalid ?? invalid);

  const finalId = $derived(propId ?? (fieldState?.id ? `${fieldState.id}-error` : undefined));
</script>

{#if finalInvalid}
  <p
    id={finalId}
    class={cn(
      fieldErrorStyles({
        truncate
      }),
      className
    )}
    data-slot="error-message"
    role="alert"
    {...rest}
  >
    {@render children()}
  </p>
{/if}
