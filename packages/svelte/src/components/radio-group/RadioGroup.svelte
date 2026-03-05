<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { radioGroupStyles, type RadioGroupVariants } from "@shizen-ui/styles";
  import { setRadioGroupContext } from "./radio-group.context";
  import { setFieldStateContext } from "../../contexts/field-state.context";

  interface Props extends RadioGroupVariants {
    children: Snippet;
    class?: string;
    value?: string;
    name?: string;
    invalid?: boolean;
    disabled?: boolean;
    required?: boolean;
    id?: string;
  }

  let {
    children,
    class: className,
    value = $bindable(),
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

  setRadioGroupContext({
    get value() {
      return value;
    },
    setValue(v) {
      value = v;
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
    }
  });

  const styles = $derived(radioGroupStyles({ orientation }));
</script>

<div
  {id}
  class={cn(styles.base(), className)}
  role="radiogroup"
  data-invalid={invalid}
  data-disabled={disabled}
  data-orientation={orientation}
  {...rest}
>
  {@render children()}
</div>
