<script lang="ts">
  import { getContext, setContext, type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { radioStyles } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";
  import { RADIO_CONTEXT_KEY, RADIO_GROUP_CONTEXT_KEY } from "./radio.context";
  import type { RadioContextValue, RadioGroupContextValue } from "./radio.types";

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "checked"> {
    value: string;
    invalid?: boolean;
    disabled?: boolean;
    checked?: boolean;
    children: Snippet;
    class?: string;
    name?: string;
  }

  let {
    class: className,
    value,
    disabled = false,
    invalid = false,
    name,
    id = crypto.randomUUID(),
    checked = $bindable(false),
    children,
    ...rest
  }: Props = $props();

  interface FieldStateContextValue {
    invalid?: boolean;
    disabled?: boolean;
    id?: string;
  }

  const FIELD_STATE_CTX_KEY = "field-state";
  const groupCtx = getContext<RadioGroupContextValue | undefined>(RADIO_GROUP_CONTEXT_KEY);
  const parentFieldState = getContext<FieldStateContextValue | undefined>(FIELD_STATE_CTX_KEY);

  const finalDisabled = $derived(parentFieldState?.disabled ?? groupCtx?.disabled ?? disabled);
  const finalInvalid = $derived(parentFieldState?.invalid ?? groupCtx?.invalid ?? invalid);
  const activeName = $derived(groupCtx?.name ?? name);
  const isChecked = $derived(groupCtx ? groupCtx.value === value : checked);

  setContext<RadioContextValue>(RADIO_CONTEXT_KEY, {
    get checked() {
      return isChecked;
    },
    get disabled() {
      return finalDisabled;
    },
    get invalid() {
      return finalInvalid;
    },
    get id() {
      return id;
    }
  });

  setContext(FIELD_STATE_CTX_KEY, {
    get invalid() {
      return finalInvalid;
    },
    get disabled() {
      return finalDisabled;
    },
    get id() {
      return id;
    },
    keepDescription: true
  });

  const styles = $derived(radioStyles());

  function handleChange() {
    if (finalDisabled) return;
    if (groupCtx) {
      groupCtx.setValue(value);
    } else {
      checked = true;
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleChange();
    }
  }

  function handleContainerClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.closest("label")) return;
    handleChange();
    const input = e.currentTarget.querySelector("input");
    input?.blur();
  }
</script>

<div
  class={cn(styles.base(), className)}
  data-disabled={finalDisabled}
  data-invalid={finalInvalid}
  data-checked={isChecked}
  onclick={handleContainerClick}
  role="none"
>
  <input
    type="radio"
    {value}
    name={activeName}
    {id}
    checked={isChecked}
    disabled={finalDisabled}
    onchange={handleChange}
    class="radio__input"
    tabindex={isChecked || !groupCtx ? 0 : -1}
    onkeydown={handleKeyDown}
    onmousedown={(e) => e.preventDefault()}
    {...rest}
  />
  {@render children()}
</div>
