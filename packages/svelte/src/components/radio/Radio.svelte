<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import type { RadioProps } from "./radio.svelte.js";
  import { createRadioState, createRadioHandlers } from "./radio.svelte.js";

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
  }: RadioProps = $props();

  const state = createRadioState({
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

  const handlers = createRadioHandlers(state, (val) => {
    checked = val;
  });
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
    type="radio"
    {value}
    name={state.activeName}
    {id}
    checked={state.isChecked}
    disabled={state.finalDisabled}
    onchange={handlers.handleChange}
    class="radio__input"
    tabindex={state.isChecked || !state.groupCtx.exists ? 0 : -1}
    onkeydown={handlers.handleKeyDown}
    onmousedown={(e) => e.preventDefault()}
    {...rest}
  />
  {@render children()}
</div>
