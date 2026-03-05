<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { textAreaStyles } from "@shizen-ui/styles";
  import { useFieldStateContext } from "../../contexts/field-state.context";
  import { useInputGroupContext } from "../input-group/input-group.context";
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

  const fieldContext = useFieldStateContext();
  const groupContext = useInputGroupContext();

  const finalInvalid = $derived(fieldContext.exists ? fieldContext.invalid : invalid);
  const finalDisabled = $derived(fieldContext.exists ? fieldContext.disabled : disabled);
  const finalId = $derived(propId ?? (fieldContext.exists ? fieldContext.id : undefined));

  const descriptionId = $derived(
    fieldContext.exists && fieldContext.id ? `${fieldContext.id}-description` : undefined
  );
  const errorId = $derived(
    fieldContext.exists && fieldContext.id ? `${fieldContext.id}-error` : undefined
  );
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
  data-in-group={groupContext.inGroup}
  {...rest}
></textarea>
