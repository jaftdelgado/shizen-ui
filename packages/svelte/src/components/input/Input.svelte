<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { inputStyles, type InputVariants } from "@shizen-ui/styles";
  import type { HTMLInputAttributes } from "svelte/elements";

  interface Props extends Omit<HTMLInputAttributes, "size"> {
    size?: InputVariants["size"];
    value?: string;
  }

  let {
    class: className,
    size = "md",
    type = "text",
    disabled = false,
    value = $bindable(""),
    ...rest
  }: Props = $props();
</script>

<input
  {type}
  {disabled}
  bind:value
  class={cn(
    inputStyles({
      size
    }),
    className
  )}
  {...rest}
/>
