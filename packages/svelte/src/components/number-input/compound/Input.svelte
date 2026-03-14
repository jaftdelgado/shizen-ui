<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { numberInputStyles } from "@shizen-ui/styles";
  import type { HTMLInputAttributes } from "svelte/elements";
  import { useNumberInputContext } from "../../../contexts/internal/index.js";

  type Props = Omit<
    HTMLInputAttributes,
    "type" | "value" | "min" | "max" | "step" | "disabled" | "size"
  >;

  let { class: className, ...rest }: Props = $props();

  const ctx = useNumberInputContext();

  const inputClass = $derived(numberInputStyles({ size: ctx.size }).input());

  function handleChange(event: Event) {
    const target = event.currentTarget as HTMLInputElement;
    const parsed = parseFloat(target.value);

    if (!Number.isNaN(parsed)) {
      ctx.setValue(parsed);
      target.value = String(ctx.value);
    } else {
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
  class={cn(inputClass, className)}
  onchange={handleChange}
  {...rest}
/>
