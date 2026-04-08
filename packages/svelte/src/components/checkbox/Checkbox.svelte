<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import type { CheckboxCheckedState, CheckboxProps } from "./checkbox.svelte.js";
  import { createCheckboxState, createCheckboxHandlers } from "./checkbox.svelte.js";

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
  }: CheckboxProps = $props();

  const state = createCheckboxState({
    get value() {
      return value;
    },
    get disabled() {
      return disabled;
    },
    get invalid() {
      return invalid;
    },
    get name() {
      return name;
    },
    get id() {
      return id;
    },
    get checked() {
      return checked;
    }
  });

  const handlers = createCheckboxHandlers(
    state,
    () => checked,
    (val) => {
      checked = val;
    }
  );
</script>

<div
  class={cn(state.styles.base(), className)}
  data-disabled={state.finalDisabled}
  data-invalid={state.finalInvalid}
  data-checked={state.isChecked}
  onclick={handlers.handleContainerClick}
  role="none"
>
  <input
    bind:this={state.inputElement}
    type="checkbox"
    {value}
    name={state.activeName}
    {id}
    aria-checked={state.isChecked === "mixed" ? "mixed" : state.isChecked}
    checked={state.isChecked === true}
    disabled={state.finalDisabled}
    onchange={handlers.handleChange}
    class="checkbox__input"
    tabindex={!state.finalDisabled ? 0 : -1}
    onkeydown={handlers.handleKeyDown}
    onmousedown={(e) => e.preventDefault()}
    {...rest}
  />
  {@render children()}
</div>
