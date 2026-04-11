<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { textAreaStyles, type TextAreaVariants } from "@shizen-ui/styles";
  import { useFieldStateContext, useSurfaceContext } from "../../contexts/index.js";
  import { useInputGroupContext } from "../../contexts/internal/index.js";
  import type { HTMLTextareaAttributes } from "svelte/elements";

  interface Props extends HTMLTextareaAttributes {
    fullWidth?: boolean;
    variant?: TextAreaVariants["variant"];
    value?: string;
    invalid?: boolean;
  }

  let {
    class: className,
    fullWidth = false,
    variant = undefined,
    disabled = false,
    invalid = false,
    id: propId,
    value = $bindable(""),
    rows = 3,
    ...rest
  }: Props = $props();

  const fieldContext = useFieldStateContext();
  const groupContext = useInputGroupContext();
  const surfaceContext = useSurfaceContext();

  const finalVariant = $derived(variant ?? (surfaceContext.exists ? "secondary" : "default"));

  const finalInvalid = $derived(
    fieldContext.exists
      ? fieldContext.invalid
      : groupContext.exists
        ? groupContext.invalid || invalid
        : invalid
  );

  const finalDisabled = $derived(
    fieldContext.exists
      ? fieldContext.disabled
      : groupContext.exists
        ? groupContext.disabled || disabled
        : disabled
  );

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
  class={cn(textAreaStyles({ fullWidth, variant: finalVariant }), className)}
  aria-invalid={finalInvalid}
  aria-describedby={!finalInvalid ? descriptionId : undefined}
  aria-errormessage={finalInvalid ? errorId : undefined}
  data-invalid={finalInvalid}
  data-in-group={groupContext.inGroup}
  data-slot={groupContext.inGroup ? "input-group-textarea" : undefined}
  {...rest}
></textarea>
