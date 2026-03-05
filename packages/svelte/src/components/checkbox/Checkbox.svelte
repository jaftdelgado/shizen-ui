<script lang="ts">
  import { getContext, setContext, type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { checkboxStyles } from "@shizen-ui/styles";
  import type { HTMLInputAttributes } from "svelte/elements";
  import { setCheckboxContext, type CheckboxCheckedState } from "./checkbox.context";
  import { useCheckboxGroupContext } from "../checkbox-group/checkbox-group.context";

  interface Props extends Omit<HTMLInputAttributes, "type" | "checked"> {
    value?: string;
    invalid?: boolean;
    disabled?: boolean;
    checked?: CheckboxCheckedState;
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
    id = `checkbox-${Math.random().toString(36).slice(2, 9)}`,
    checked = $bindable<CheckboxCheckedState>(false),
    children,
    ...rest
  }: Props = $props();

  let inputElement = $state<HTMLInputElement | null>(null);

  interface FieldStateContextValue {
    invalid?: boolean;
    disabled?: boolean;
    id?: string;
  }

  const FIELD_STATE_CTX_KEY = "field-state";
  const groupCtx = useCheckboxGroupContext();
  const parentFieldState = getContext<FieldStateContextValue | undefined>(FIELD_STATE_CTX_KEY);

  const finalDisabled = $derived(
    parentFieldState?.disabled ?? (groupCtx.exists ? groupCtx.disabled : disabled)
  );
  const finalInvalid = $derived(
    parentFieldState?.invalid ?? (groupCtx.exists ? groupCtx.invalid : invalid)
  );
  const activeName = $derived(groupCtx.exists ? groupCtx.name : name);

  const isChecked = $derived.by<CheckboxCheckedState>(() => {
    if (groupCtx.exists && value !== undefined) {
      return groupCtx.value.includes(value);
    }
    return checked;
  });

  setCheckboxContext({
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

  setContext<FieldStateContextValue & { keepDescription: boolean }>(FIELD_STATE_CTX_KEY, {
    get invalid() {
      return finalInvalid;
    },
    get disabled() {
      return finalDisabled;
    },
    get id() {
      return id as string;
    },
    keepDescription: true
  });

  const styles = $derived(checkboxStyles());

  $effect(() => {
    if (inputElement) {
      inputElement.indeterminate = isChecked === "mixed";
    }
  });

  function handleChange() {
    if (finalDisabled) return;
    if (groupCtx.exists) {
      if (value === undefined) return;
      groupCtx.toggleValue(value);
    } else {
      checked = isChecked === true ? false : true;
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

    if (target.tagName === "INPUT" || target.closest("label")) return;

    handleChange();

    const container = e.currentTarget as HTMLDivElement;
    const input = container.querySelector("input");
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
    bind:this={inputElement}
    type="checkbox"
    {value}
    name={activeName}
    {id}
    aria-checked={isChecked === "mixed" ? "mixed" : isChecked}
    checked={isChecked === true}
    disabled={finalDisabled}
    onchange={handleChange}
    class="checkbox__input"
    tabindex={!finalDisabled ? 0 : -1}
    onkeydown={handleKeyDown}
    onmousedown={(e) => e.preventDefault()}
    {...rest}
  />
  {@render children()}
</div>
