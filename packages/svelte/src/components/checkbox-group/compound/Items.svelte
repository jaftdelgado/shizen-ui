<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";
  import { checkboxGroupStyles } from "@shizen-ui/styles";
  import { useCheckboxGroupContext } from "../checkbox-group.context";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children: Snippet;
  }

  let { children, class: className, ...rest }: Props = $props();

  const groupCtx = useCheckboxGroupContext();
  const orientation = $derived(groupCtx.orientation);

  const styles = $derived(checkboxGroupStyles({ orientation }));
</script>

<div class={cn(styles.items(), className)} {...rest}>
  {@render children()}
</div>
