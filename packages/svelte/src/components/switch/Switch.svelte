<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { switchStyles } from "@shizen-ui/styles";
  import type { SwitchProps } from "./switch.svelte.js";
  import { SwitchState, SwitchHandlers } from "./switch.svelte.js";

  let {
    class: className,
    disabled = false,
    invalid = false,
    name,
    value,
    id = crypto.randomUUID(),
    checked = $bindable(false),
    size = "md",
    children,
    ...rest
  }: SwitchProps = $props();

  const state = new SwitchState({
    disabled: () => disabled,
    invalid: () => invalid,
    size: () => size,
    id: () => id,
    checked: () => checked
  });

  const handlers = new SwitchHandlers(
    state,
    () => checked,
    (val) => (checked = val)
  );

  const styles = $derived(switchStyles({ size: state.finalSize }));
</script>

<div
  class={cn(styles.base(), className)}
  data-disabled={state.finalDisabled}
  data-invalid={state.finalInvalid}
  data-checked={checked}
  onclick={handlers.handleContainerClick}
  role="none"
>
  <input
    type="checkbox"
    role="switch"
    {name}
    {value}
    {id}
    {checked}
    disabled={state.finalDisabled}
    onchange={handlers.handleChange}
    class="switch__input"
    tabindex={!state.finalDisabled ? 0 : -1}
    onkeydown={handlers.handleKeyDown}
    onmousedown={(e) => e.preventDefault()}
    aria-checked={checked}
    {...rest}
  />
  {@render children()}
</div>
