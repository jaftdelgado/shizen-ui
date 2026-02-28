<script lang="ts">
  import { getContext, setContext, type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { radioStyles, type RadioVariants } from "@shizen-ui/styles";
  import type { HTMLInputAttributes } from "svelte/elements";

  interface Props extends Omit<HTMLInputAttributes, "size" | "checked"> {
    value: string;
    size?: RadioVariants["size"];
    variant?: RadioVariants["variant"];
    invalid?: boolean;
    disabled?: boolean;
    checked?: boolean;
    children: Snippet;
    class?: string;
  }

  let {
    class: className,
    value,
    size = "md",
    variant = "primary",
    disabled = false,
    invalid = false,
    name,
    id = crypto.randomUUID(),
    checked = $bindable(false),
    children,
    ...rest
  }: Props = $props();

  const FIELD_STATE_CTX_KEY = "field-state";
  const fieldState = getContext<{ invalid?: boolean; disabled?: boolean; id?: string }>(
    FIELD_STATE_CTX_KEY
  );
  const groupCtx = getContext<any>("radio-group-context");

  const finalDisabled = $derived(fieldState?.disabled ?? groupCtx?.disabled ?? disabled);
  const finalInvalid = $derived(fieldState?.invalid ?? groupCtx?.invalid ?? invalid);
  const finalId = $derived(id ?? fieldState?.id);
  const activeSize = $derived(groupCtx?.size ?? size);
  const activeVariant = $derived(groupCtx?.variant ?? variant);
  const activeName = $derived(groupCtx?.name ?? name);

  const isChecked = $derived(groupCtx ? groupCtx.value === value : checked);

  setContext("radio-context", {
    get checked() {
      return isChecked;
    },
    get disabled() {
      return finalDisabled;
    },
    get invalid() {
      return finalInvalid;
    },
    get size() {
      return activeSize;
    },
    get variant() {
      return activeVariant;
    },
    get id() {
      return finalId;
    }
  });

  const styles = $derived(radioStyles({ size: activeSize, variant: activeVariant }));

  function handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (groupCtx) {
      groupCtx.value = value;
    } else {
      checked = target.checked;
    }
  }
</script>

<label
  class={cn(styles.base(), className)}
  data-disabled={finalDisabled}
  data-invalid={finalInvalid}
  data-checked={isChecked}
>
  <input
    type="radio"
    {value}
    name={activeName}
    id={finalId}
    checked={isChecked}
    disabled={finalDisabled}
    onchange={handleChange}
    class="radio__input"
    {...rest}
  />
  {@render children()}
</label>
