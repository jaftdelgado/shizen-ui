<script lang="ts">
  import { setContext, type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { radioStyles, type RadioVariants } from "@shizen-ui/styles";

  interface Props {
    children: Snippet;
    class?: string;
    value?: string;
    name?: string;
    size?: RadioVariants["size"];
    variant?: RadioVariants["variant"];
    orientation?: RadioVariants["orientation"];
    invalid?: boolean;
    disabled?: boolean;
    required?: boolean;
    id?: string;
  }

  let {
    children,
    class: className,
    value = $bindable(),
    name = `radio-group-${Math.random().toString(36).slice(2, 9)}`,
    size = "md",
    variant = "primary",
    orientation = "vertical",
    invalid = false,
    disabled = false,
    required = false,
    id = `field-${Math.random().toString(36).slice(2, 9)}`,
    ...rest
  }: Props = $props();

  setContext("field-state", {
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

  setContext("radio-group-context", {
    get value() {
      return value;
    },
    set value(v) {
      value = v;
    },
    get name() {
      return name;
    },
    get size() {
      return size;
    },
    get variant() {
      return variant;
    },
    get disabled() {
      return disabled;
    },
    get invalid() {
      return invalid;
    }
  });

  const styles = $derived(radioStyles({ orientation }));
</script>

<div
  {id}
  class={cn(styles.group(), className)}
  role="radiogroup"
  data-invalid={invalid}
  data-disabled={disabled}
  {...rest}
>
  <div class={styles.wrapper()}>
    {@render children()}
  </div>
</div>
