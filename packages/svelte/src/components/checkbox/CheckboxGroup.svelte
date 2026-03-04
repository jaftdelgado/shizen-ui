<script lang="ts">
  import { setContext, type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { checkboxStyles, type CheckboxVariants } from "@shizen-ui/styles";
  import { CHECKBOX_GROUP_CONTEXT_KEY, type CheckboxGroupContextValue } from "./checkbox.context";

  interface Props extends CheckboxVariants {
    children: Snippet;
    class?: string;
    value?: string[];
    name?: string;
    invalid?: boolean;
    disabled?: boolean;
    required?: boolean;
    id?: string;
  }

  let {
    children,
    class: className,
    value = $bindable<string[]>([]),
    name = `checkbox-group-${Math.random().toString(36).slice(2, 9)}`,
    invalid = false,
    disabled = false,
    required = false,
    orientation = "vertical",
    id = `field-${Math.random().toString(36).slice(2, 9)}`,
    ...rest
  }: Props = $props();

  interface FieldStateContextValue {
    readonly invalid?: boolean;
    readonly disabled?: boolean;
    readonly required?: boolean;
    readonly id?: string;
  }

  setContext<FieldStateContextValue>("field-state", {
    get invalid() {
      return invalid;
    },
    get disabled() {
      return disabled;
    },
    get required() {
      return required;
    },
    get id() {
      return id;
    }
  });

  function toggleValue(nextValue: string) {
    if (disabled) return;

    if (value.includes(nextValue)) {
      value = value.filter((entry) => entry !== nextValue);
      return;
    }

    value = [...value, nextValue];
  }

  setContext<CheckboxGroupContextValue>(CHECKBOX_GROUP_CONTEXT_KEY, {
    get value() {
      return value;
    },
    get name() {
      return name;
    },
    get disabled() {
      return disabled;
    },
    get invalid() {
      return invalid;
    },
    get orientation() {
      return orientation;
    },
    toggleValue
  });

  const styles = $derived(checkboxStyles({ orientation }));
</script>

<div
  {id}
  class={cn(styles.group(), className)}
  role="group"
  data-invalid={invalid}
  data-disabled={disabled}
  data-orientation={orientation}
  {...rest}
>
  {@render children()}
</div>
