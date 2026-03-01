<script lang="ts">
  import { setContext, type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { radioStyles, type RadioVariants } from "@shizen-ui/styles";

  interface Props extends RadioVariants {
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
    name = `radio-group-${Math.random().toString(36).slice(2, 9)}`,
    invalid = false,
    disabled = false,
    required = false,
    orientation = "vertical",
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

  const styles = $derived(radioStyles({ orientation }));
</script>

<div
  {id}
  class={cn(styles.group(), className)}
  role="radiogroup"
  data-invalid={invalid}
  data-disabled={disabled}
  data-orientation={orientation}
  {...rest}
>
  {@render children()}
</div>
