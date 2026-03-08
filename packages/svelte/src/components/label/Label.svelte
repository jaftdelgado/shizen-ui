<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { labelStyles } from "@shizen-ui/styles";
  import { useFieldStateContext } from "../../contexts/index.js";
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

  const fieldContext = useFieldStateContext();

  const finalInvalid = $derived(fieldContext.exists ? fieldContext.invalid : invalid);
  const finalDisabled = $derived(fieldContext.exists ? fieldContext.disabled : disabled);
  const finalRequired = $derived(fieldContext.exists ? fieldContext.required : required);
  const finalFor = $derived(htmlFor ?? (fieldContext.exists ? fieldContext.id : undefined));
</script>

<label
  for={finalFor}
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
