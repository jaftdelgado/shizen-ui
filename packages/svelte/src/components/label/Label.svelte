<script lang="ts">
  import { getContext } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { labelStyles } from "@shizen-ui/styles";
  import type { HTMLLabelAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  interface Props extends HTMLLabelAttributes {
    children: Snippet;
    required?: boolean;
    invalid?: boolean;
    disabled?: boolean;
    for?: string;
  }

  let {
    children,
    class: className,
    required = false,
    invalid = false,
    disabled = false,
    for: htmlFor,
    ...rest
  }: Props = $props();

  const FIELD_STATE_CTX_KEY = "field-state";

  const fieldState = getContext<{
    invalid?: boolean;
    disabled?: boolean;
    required?: boolean;
  }>(FIELD_STATE_CTX_KEY);

  const finalInvalid = $derived(fieldState?.invalid ?? invalid);
  const finalDisabled = $derived(fieldState?.disabled ?? disabled);
  const finalRequired = $derived(fieldState?.required ?? required);
</script>

<label
  for={htmlFor}
  class={cn(
    labelStyles({
      invalid: finalInvalid,
      disabled: finalDisabled
    }),
    className
  )}
  data-invalid={finalInvalid}
  data-disabled={finalDisabled}
  data-required={finalRequired}
  {...rest}
>
  {@render children()}

  {#if finalRequired}
    <span class="label__required-indicator" aria-hidden="true" data-slot="required-indicator">
      *
    </span>
  {/if}
</label>
