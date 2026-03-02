<script lang="ts">
  import { getContext, setContext, type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { checkboxStyles } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "checked"> {
    value?: string;
    invalid?: boolean;
    disabled?: boolean;
    checked?: boolean | "mixed";
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

  const FIELD_STATE_CTX_KEY = "field-state";
  const groupCtx = getContext<any>("checkbox-group-context");
  const parentFieldState = getContext<any>(FIELD_STATE_CTX_KEY);

  const finalDisabled = $derived(parentFieldState?.disabled ?? groupCtx?.disabled ?? disabled);
  const finalInvalid = $derived(parentFieldState?.invalid ?? groupCtx?.invalid ?? invalid);
  const activeName = $derived(groupCtx?.name ?? name);

  let isChecked = $derived.by(() => {
    if (groupCtx && value !== undefined) {
      return groupCtx.value.includes(value);
    }
    return checked;
  });

  setContext("checkbox-context", {
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

  const styles = $derived(checkboxStyles());

  function handleChange() {
    if (finalDisabled) return;
    if (groupCtx && value !== undefined) {
      if (isChecked) {
        groupCtx.value = groupCtx.value.filter((v: string) => v !== value);
      } else {
        groupCtx.value = [...groupCtx.value, value];
      }
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
    type="checkbox"
    {value}
    name={activeName}
    {id}
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
