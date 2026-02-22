<script lang="ts">
  import { getContext } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { inputStyles, type InputVariants } from "@shizen-ui/styles";
  import type { HTMLInputAttributes } from "svelte/elements";

  interface Props extends Omit<HTMLInputAttributes, "size"> {
    size?: InputVariants["size"];
    value?: string;
    invalid?: boolean;
  }

  let {
    class: className,
    size = "md",
    type = "text",
    disabled = false,
    invalid = false,
    id: propId,
    value = $bindable(""),
    ...rest
  }: Props = $props();

  const FIELD_STATE_CTX_KEY = "field-state";

  const fieldState = getContext<{
    invalid?: boolean;
    disabled?: boolean;
    id?: string;
  }>(FIELD_STATE_CTX_KEY);

  const finalInvalid = $derived(fieldState?.invalid ?? invalid);
  const finalDisabled = $derived(fieldState?.disabled ?? disabled);
  const finalId = $derived(propId ?? fieldState?.id);

  const descriptionId = $derived(fieldState?.id ? `${fieldState.id}-description` : undefined);
  const errorId = $derived(fieldState?.id ? `${fieldState.id}-error` : undefined);
</script>

<input
  id={finalId}
  {type}
  disabled={finalDisabled}
  bind:value
  class={cn(
    inputStyles({
      size
    }),
    className
  )}
  aria-invalid={finalInvalid}
  aria-describedby={!finalInvalid ? descriptionId : undefined}
  aria-errormessage={finalInvalid ? errorId : undefined}
  data-invalid={finalInvalid}
  {...rest}
/>
