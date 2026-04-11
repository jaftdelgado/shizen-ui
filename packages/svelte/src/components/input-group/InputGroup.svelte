<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { inputGroupStyles, type InputGroupVariants } from "@shizen-ui/styles";
  import { useFieldStateContext, useSurfaceContext } from "../../contexts/index.js";
  import { setInputGroupContext } from "../../contexts/internal/index.js";
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    class?: string;
    size?: InputGroupVariants["size"];
    variant?: InputGroupVariants["variant"];
    disabled?: boolean;
    fullWidth?: boolean;
    invalid?: boolean;
  }

  let {
    children,
    class: className,
    size = "md",
    variant = undefined,
    fullWidth = false,
    disabled = false,
    invalid = false,
    ...rest
  }: Props = $props();

  const fieldContext = useFieldStateContext();
  const surfaceContext = useSurfaceContext();

  const finalVariant = $derived(variant ?? (surfaceContext.exists ? "secondary" : "default"));

  const finalInvalid = $derived(fieldContext.exists ? fieldContext.invalid : invalid);
  const finalDisabled = $derived(
    fieldContext.exists ? fieldContext.disabled || disabled : disabled
  );

  setInputGroupContext({
    get size() {
      return size;
    },
    get inGroup() {
      return true;
    },
    get disabled() {
      return finalDisabled;
    },
    get invalid() {
      return finalInvalid;
    }
  });
</script>

<div
  class={cn(inputGroupStyles({ size, variant: finalVariant, fullWidth }), className)}
  data-invalid={finalInvalid}
  data-disabled={finalDisabled}
  {...rest}
>
  {@render children()}
</div>
