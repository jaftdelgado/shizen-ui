<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { checkboxGroupStyles, type CheckboxGroupVariants } from "@shizen-ui/styles";
  import { setCheckboxGroupContext } from "../../contexts/internal/index.js";
  import { setFieldStateContext } from "../../contexts/index.js";

  interface Props extends CheckboxGroupVariants {
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
    name = crypto.randomUUID(),
    invalid = false,
    disabled = false,
    required = false,
    orientation = "vertical",
    id = crypto.randomUUID(),
    ...rest
  }: Props = $props();

  setFieldStateContext({
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
    },
    get keepDescription() {
      return true;
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

  setCheckboxGroupContext({
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

  const styles = $derived(checkboxGroupStyles({ orientation }));
</script>

<div
  {id}
  class={cn(styles.base(), className)}
  role="group"
  data-invalid={invalid}
  data-disabled={disabled}
  data-orientation={orientation}
  {...rest}
>
  {@render children()}
</div>
