<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";
  import { radioGroupStyles } from "@shizen-ui/styles";
  import { useRadioGroupContext } from "../radio-group.context";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children: Snippet;
  }

  let { children, class: className, ...rest }: Props = $props();

  const groupCtx = useRadioGroupContext();
  const orientation = $derived(groupCtx.orientation);
  const styles = $derived(radioGroupStyles({ orientation }));
</script>

<div class={cn(styles.items(), className)} {...rest}>
  {@render children()}
</div>
