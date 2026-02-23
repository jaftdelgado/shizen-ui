<script lang="ts">
  import { getContext } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { textAreaStyles } from "@shizen-ui/styles";
  import type { HTMLTextareaAttributes } from "svelte/elements";

  interface Props extends HTMLTextareaAttributes {
    fullWidth?: boolean;
    value?: string;
    invalid?: boolean;
  }

  let {
    class: className,
    fullWidth = false,
    disabled = false,
    invalid = false,
    id: propId,
    value = $bindable(""),
    rows = 3,
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

<textarea
  id={finalId}
  disabled={finalDisabled}
  bind:value
  {rows}
  class={cn(
    textAreaStyles({
      fullWidth
    }),
    className
  )}
  aria-invalid={finalInvalid}
  aria-describedby={!finalInvalid ? descriptionId : undefined}
  aria-errormessage={finalInvalid ? errorId : undefined}
  data-invalid={finalInvalid}
  {...rest}
></textarea>
