<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { numberInputStyles } from "@shizen-ui/styles";
  import type { HTMLInputAttributes } from "svelte/elements";
  import { useNumberInputContext } from "../../../contexts/internal/index.js";
  import { resolveLocale, formatValue, parseValue } from "../../../shared/number-format.js";

  type Props = Omit<
    HTMLInputAttributes,
    "type" | "value" | "min" | "max" | "step" | "disabled" | "size"
  >;

  let { class: className, ...rest }: Props = $props();

  const ctx = useNumberInputContext();

  const inputClass = $derived(numberInputStyles({ size: ctx.size }).input());

  let editing = $state(false);
  let draft = $state("");

  const locale = $derived(resolveLocale(ctx.locale));

  const displayValue = $derived(
    editing ? draft : formatValue(ctx.value, locale, ctx.formatOptions)
  );

  function handleFocus() {
    editing = true;
    draft = String(ctx.value);
  }

  function handleInput(event: Event) {
    draft = (event.currentTarget as HTMLInputElement).value;
  }

  function commit(target: HTMLInputElement) {
    const parsed = parseValue(target.value, locale, ctx.formatOptions);
    if (parsed !== null) {
      ctx.setValue(parsed);
    }
    editing = false;
    target.value = formatValue(ctx.value, locale, ctx.formatOptions);
  }

  function handleChange(event: Event) {
    const target = event.currentTarget as HTMLInputElement;
    if (ctx.formatOptions) {
      commit(target);
    } else {
      const parsed = parseFloat(target.value);
      if (!Number.isNaN(parsed)) {
        ctx.setValue(parsed);
        target.value = String(ctx.value);
      } else {
        target.value = String(ctx.value);
      }
    }
  }

  function handleBlur(event: FocusEvent) {
    if (editing) {
      commit(event.currentTarget as HTMLInputElement);
    }
  }
</script>

<input
  id={ctx.id}
  type={ctx.formatOptions ? "text" : "number"}
  inputmode="decimal"
  value={displayValue}
  min={ctx.min}
  max={ctx.max}
  step={ctx.step}
  disabled={ctx.disabled}
  aria-invalid={ctx.invalid}
  data-invalid={ctx.invalid}
  class={cn(inputClass, className)}
  onfocus={ctx.formatOptions ? handleFocus : undefined}
  oninput={ctx.formatOptions ? handleInput : undefined}
  onchange={handleChange}
  onblur={ctx.formatOptions ? handleBlur : undefined}
  {...rest}
/>
