<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { switchStyles } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";
  import { setSwitchContext } from "./switch.context";
  import { setFieldStateContext, useFieldStateContext } from "../../contexts/field-state.context";

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "checked"> {
    invalid?: boolean;
    disabled?: boolean;
    checked?: boolean;
    children: Snippet;
    class?: string;
    name?: string;
    value?: string;
  }

  let {
    class: className,
    disabled = false,
    invalid = false,
    name,
    value,
    id = crypto.randomUUID(),
    checked = $bindable(false),
    children,
    ...rest
  }: Props = $props();

  const parentFieldContext = useFieldStateContext();

  const finalDisabled = $derived(
    parentFieldContext.exists ? parentFieldContext.disabled : disabled
  );
  const finalInvalid = $derived(parentFieldContext.exists ? parentFieldContext.invalid : invalid);

  setSwitchContext({
    get checked() {
      return checked;
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

  const styles = $derived(switchStyles());

  function handleChange() {
    if (finalDisabled) return;
    checked = !checked;
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
    const input = e.currentTarget.querySelector(
      'input[type="checkbox"]'
    ) as HTMLInputElement | null;
    input?.focus();
  }
</script>

<div
  class={cn(styles.base(), className)}
  data-disabled={finalDisabled}
  data-invalid={finalInvalid}
  data-checked={checked}
  onclick={handleContainerClick}
  role="none"
>
  <input
    type="checkbox"
    role="switch"
    {name}
    {value}
    {id}
    {checked}
    disabled={finalDisabled}
    onchange={handleChange}
    class="switch__input"
    tabindex={!finalDisabled ? 0 : -1}
    onkeydown={handleKeyDown}
    onmousedown={(e) => e.preventDefault()}
    aria-checked={checked}
    {...rest}
  />
  {@render children()}
</div>
