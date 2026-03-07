<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { switchGroupStyles, type SwitchGroupVariants } from "@shizen-ui/styles";
  import { setSwitchGroupContext, type SwitchGroupOrientation } from "./switch-group.context";
  import { setFieldStateContext } from "../../contexts/field-state.context";
  import type { SwitchSize } from "../switch/switch.context";

  interface Props extends SwitchGroupVariants {
    children: Snippet;
    class?: string;
    invalid?: boolean;
    disabled?: boolean;
    required?: boolean;
    id?: string;
    size?: SwitchSize;
    orientation?: SwitchGroupOrientation;
  }

  let {
    children,
    class: className,
    invalid = false,
    disabled = false,
    required = false,
    size = "md",
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
      return false;
    }
  });

  setSwitchGroupContext({
    get disabled() {
      return disabled;
    },
    get invalid() {
      return invalid;
    },
    get size() {
      return size;
    },
    get orientation() {
      return orientation;
    }
  });

  const styles = $derived(switchGroupStyles({ orientation }));
</script>

<div
  {id}
  class={cn(styles.base(), className)}
  data-invalid={invalid}
  data-disabled={disabled}
  data-orientation={orientation}
  {...rest}
>
  {@render children()}
</div>
