<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { passwordInputStyles, type PasswordInputVariants } from "@shizen-ui/styles";
  import { setPasswordInputContext } from "../../contexts/internal/index.js";
  import { useFieldStateContext, useSurfaceContext } from "../../contexts/index.js";
  import { useInputGroupContext } from "../../contexts/internal/index.js";
  import type { Snippet } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";

  interface Props extends Omit<HTMLInputAttributes, "size" | "type"> {
    size?: PasswordInputVariants["size"];
    variant?: PasswordInputVariants["variant"];
    value?: string;
    invalid?: boolean;
    children?: Snippet;
  }

  let {
    class: className,
    size = "md",
    variant = undefined,
    disabled = false,
    invalid = false,
    id: propId,
    value = $bindable(""),
    children,
    ...rest
  }: Props = $props();

  const fieldContext = useFieldStateContext();
  const groupContext = useInputGroupContext();
  const surfaceContext = useSurfaceContext();

  let visible = $state(false);

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
  const activeSize = $derived(groupContext.exists ? groupContext.size : size);

  const descriptionId = $derived(
    fieldContext.exists && fieldContext.id ? `${fieldContext.id}-description` : undefined
  );
  const errorId = $derived(
    fieldContext.exists && fieldContext.id ? `${fieldContext.id}-error` : undefined
  );

  setPasswordInputContext({
    get visible() {
      return visible;
    },
    get disabled() {
      return finalDisabled;
    },
    toggle() {
      if (!finalDisabled) visible = !visible;
    }
  });
</script>

<div
  class={cn(passwordInputStyles({ size: activeSize, variant: finalVariant }), className)}
  data-invalid={finalInvalid}
  data-in-group={groupContext.inGroup}
  data-slot={groupContext.inGroup ? "input-group-input" : undefined}
>
  <input
    id={finalId}
    type={visible ? "text" : "password"}
    disabled={finalDisabled}
    bind:value
    class="password-input__field"
    aria-invalid={finalInvalid}
    aria-describedby={!finalInvalid ? descriptionId : undefined}
    aria-errormessage={finalInvalid ? errorId : undefined}
    {...rest}
  />

  {@render children?.()}
</div>
