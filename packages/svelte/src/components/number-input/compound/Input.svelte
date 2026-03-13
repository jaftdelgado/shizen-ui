<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { numberInputStyles, type NumberInputVariants } from "@shizen-ui/styles";
  import type { HTMLInputAttributes } from "svelte/elements";
  import { useNumberInputContext } from "../../../contexts/internal/index.js";

  interface Props extends Omit<
    HTMLInputAttributes,
    "type" | "value" | "min" | "max" | "step" | "disabled" | "size"
  > {
    inputSize?: NumberInputVariants["size"];
  }

  let { class: className, inputSize = "md", ...rest }: Props = $props();

  const ctx = useNumberInputContext();

  const { input } = numberInputStyles();

  function handleChange(event: Event) {
    const target = event.currentTarget as HTMLInputElement;
    const parsed = parseFloat(target.value);

    if (!Number.isNaN(parsed)) {
      ctx.setValue(parsed);
    } else {
      // Reset display to current valid value
      target.value = String(ctx.value);
    }
  }
</script>

<input
  id={ctx.id}
  type="number"
  value={ctx.value}
  min={ctx.min}
  max={ctx.max}
  step={ctx.step}
  disabled={ctx.disabled}
  aria-invalid={ctx.invalid}
  data-invalid={ctx.invalid}
  class={cn(input({ size: inputSize }), className)}
  onchange={handleChange}
  {...rest}
/>
