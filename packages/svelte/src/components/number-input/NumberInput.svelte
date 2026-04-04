<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { numberInputStyles, type NumberInputVariants } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { NumberInputState } from "./NumberInput.svelte.js";
  import { setNumberInputContext } from "../../contexts/internal/index.js";
  import { useFieldStateContext, useSurfaceContext } from "../../contexts/index.js";

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    size?: NumberInputVariants["size"];
    variant?: NumberInputVariants["variant"];
    disabled?: boolean;
    invalid?: boolean;
    id?: string;
    formatOptions?: Intl.NumberFormatOptions;
    locale?: string;
    children?: Snippet;
  }

  let {
    class: className,
    value = $bindable(0),
    min,
    max,
    step = 1,
    size = "md",
    variant = undefined,
    disabled = false,
    invalid = false,
    id: propId,
    formatOptions,
    locale,
    children,
    ...rest
  }: Props = $props();

  const fieldContext = useFieldStateContext();
  const surfaceContext = useSurfaceContext();

  const finalVariant = $derived(variant ?? (surfaceContext.exists ? "secondary" : "default"));

  const state = new NumberInputState({ value });

  $effect(() => {
    state.value = value;
  });
  $effect(() => {
    state.min = min;
  });
  $effect(() => {
    state.max = max;
  });
  $effect(() => {
    state.step = step;
  });
  $effect(() => {
    state.disabled = fieldContext.exists ? fieldContext.disabled : disabled;
  });
  $effect(() => {
    state.invalid = fieldContext.exists ? fieldContext.invalid : invalid;
  });

  $effect(() => {
    value = state.value;
  });

  const finalId = $derived(propId ?? (fieldContext.exists ? fieldContext.id : undefined));

  const ariaDescribedBy = $derived.by(() => {
    if (!fieldContext.exists || !fieldContext.id) return undefined;
    const descId = `${fieldContext.id}-description`;
    const errId = `${fieldContext.id}-error`;
    return state.invalid ? errId : descId;
  });

  setNumberInputContext({
    get value() {
      return state.value;
    },
    get min() {
      return state.min;
    },
    get max() {
      return state.max;
    },
    get step() {
      return state.step;
    },
    get size() {
      return size ?? "md";
    },
    get variant() {
      return finalVariant;
    },
    get disabled() {
      return state.disabled;
    },
    get invalid() {
      return state.invalid;
    },
    get canIncrement() {
      return state.canIncrement;
    },
    get canDecrement() {
      return state.canDecrement;
    },
    get id() {
      return finalId;
    },
    get formatOptions() {
      return formatOptions;
    },
    get locale() {
      return locale;
    },
    increment() {
      state.increment();
    },
    decrement() {
      state.decrement();
    },
    setValue(v: number) {
      state.value = v;
    }
  });

  const baseClass = $derived(numberInputStyles({ size, variant: finalVariant }).base());
</script>

<div
  role="group"
  aria-labelledby={finalId ? `${finalId}-label` : undefined}
  aria-describedby={ariaDescribedBy}
  data-invalid={state.invalid}
  data-disabled={state.disabled}
  class={cn(baseClass, className)}
  {...rest}
>
  {@render children?.()}
</div>
