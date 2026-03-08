<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { textFieldStyles } from "@shizen-ui/styles";
  import { setFieldStateContext } from "../../contexts/index.js";
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    class?: string;
    invalid?: boolean;
    disabled?: boolean;
    required?: boolean;
    fullWidth?: boolean;
    id?: string;
  }

  let {
    children,
    class: className,
    invalid = false,
    disabled = false,
    required = false,
    fullWidth = false,
    id = `field-${Math.random().toString(36).slice(2, 9)}`,
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
    }
  });
</script>

<div
  {id}
  class={cn(textFieldStyles({ fullWidth, disabled }), className)}
  data-invalid={invalid}
  data-disabled={disabled}
  {...rest}
>
  {@render children()}
</div>
