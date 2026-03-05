<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { inputGroupStyles, type InputGroupVariants } from "@shizen-ui/styles";
  import { useFieldStateContext } from "../../contexts/field-state.context";
  import { setInputGroupContext } from "./input-group.context";
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    class?: string;
    size?: InputGroupVariants["size"];
    fullWidth?: boolean;
    hasTextArea?: boolean;
  }

  let {
    children,
    class: className,
    size = "md",
    fullWidth = false,
    hasTextArea = false,
    ...rest
  }: Props = $props();

  const fieldContext = useFieldStateContext();

  const finalInvalid = $derived(fieldContext.exists ? fieldContext.invalid : false);
  const finalDisabled = $derived(fieldContext.exists ? fieldContext.disabled : false);

  setInputGroupContext({
    get size() {
      return size;
    },
    get inGroup() {
      return true;
    }
  });
</script>

<div
  class={cn(inputGroupStyles({ size, fullWidth, hasTextArea }), className)}
  data-invalid={finalInvalid}
  data-disabled={finalDisabled}
  data-has-textarea={hasTextArea}
  {...rest}
>
  {@render children()}
</div>
