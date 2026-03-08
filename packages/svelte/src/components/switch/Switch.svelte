<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { switchStyles } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";
  import { setSwitchContext, type SwitchSize } from "../../contexts/internal/index.js";
  import { setFieldStateContext, useFieldStateContext } from "../../contexts/index.js";
  import { useSwitchGroupContext } from "../../contexts/internal/index.js";

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "checked"> {
    invalid?: boolean;
    disabled?: boolean;
    checked?: boolean;
    children: Snippet;
    class?: string;
    name?: string;
    value?: string;
    size?: SwitchSize;
  }

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
  }: Props = $props();

  const parentFieldContext = useFieldStateContext();
  const groupCtx = useSwitchGroupContext();

  const finalDisabled = $derived(
    groupCtx.exists
      ? groupCtx.disabled
      : parentFieldContext.exists
        ? parentFieldContext.disabled
        : disabled
  );

  const finalInvalid = $derived(
    groupCtx.exists
      ? groupCtx.invalid
      : parentFieldContext.exists
        ? parentFieldContext.invalid
        : invalid
  );

  const finalSize = $derived(groupCtx.exists ? groupCtx.size : size);

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
    },
    get size() {
      return finalSize;
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

  const styles = $derived(switchStyles({ size: finalSize }));

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
    if (finalDisabled) return;

    const target = e.target as HTMLElement;

    if (target.tagName === "INPUT" || target.closest("label")) {
      return;
    }

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
