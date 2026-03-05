<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { radioStyles } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";
  import { setRadioContext } from "./radio.context";
  import { useRadioGroupContext } from "../radio-group/radio-group.context";
  import { setFieldStateContext, useFieldStateContext } from "../../contexts/field-state.context";

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

  const groupCtx = useRadioGroupContext();
  const parentFieldContext = useFieldStateContext();

  const finalDisabled = $derived(
    parentFieldContext.exists
      ? parentFieldContext.disabled
      : groupCtx.exists
        ? groupCtx.disabled
        : disabled
  );
  const finalInvalid = $derived(
    parentFieldContext.exists
      ? parentFieldContext.invalid
      : groupCtx.exists
        ? groupCtx.invalid
        : invalid
  );
  const activeName = $derived(groupCtx.exists ? groupCtx.name : name);
  const isChecked = $derived(groupCtx.exists ? groupCtx.value === value : checked);

  setRadioContext({
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
      return id as string;
    }
  });

  setFieldStateContext({
    get invalid() {
      return finalInvalid;
    },
    get disabled() {
      return finalDisabled;
    },
    get required() {
      return false;
    },
    get id() {
      return id as string;
    },
    get keepDescription() {
      return true;
    }
  });

  const styles = $derived(radioStyles());

  function handleChange() {
    if (finalDisabled) return;
    if (groupCtx.exists) {
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

  function handleContainerClick(e: MouseEvent & { currentTarget: HTMLDivElement }) {
    const target = e.target as HTMLElement;
    if (target.closest("label")) return;
    handleChange();
    const input = e.currentTarget.querySelector('input[type="radio"]') as HTMLInputElement | null;
    input?.focus();
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
    tabindex={isChecked || !groupCtx.exists ? 0 : -1}
    onkeydown={handleKeyDown}
    onmousedown={(e) => e.preventDefault()}
    {...rest}
  />
  {@render children()}
</div>
