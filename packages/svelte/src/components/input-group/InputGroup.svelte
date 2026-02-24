<script lang="ts">
  //TO DO: Agregar disabled y invalid a través de contexto
  import { getContext, setContext } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { inputGroupStyles, type InputGroupVariants } from "@shizen-ui/styles";

  let {
    children,
    class: className,
    size = "md",
    fullWidth = false,
    hasTextArea = false,
    ...rest
  }: {
    children: any;
    class?: string;
    size?: InputGroupVariants["size"];
    fullWidth?: boolean;
    hasTextArea?: boolean;
    [key: string]: any;
  } = $props();

  const FIELD_STATE_CTX_KEY = "field-state";
  const fieldState = getContext<{ invalid?: boolean; disabled?: boolean }>(FIELD_STATE_CTX_KEY);

  const finalInvalid = $derived(fieldState?.invalid);
  const finalDisabled = $derived(fieldState?.disabled);

  setContext("input-group-context", {
    get size() {
      return size;
    },
    inGroup: true
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
