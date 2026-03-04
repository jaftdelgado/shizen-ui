<script lang="ts">
  import { getContext, type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";
  import { checkboxStyles } from "@shizen-ui/styles";
  import { CHECKBOX_GROUP_CONTEXT_KEY, type CheckboxGroupContextValue } from "../checkbox.context";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children: Snippet;
  }

  let { children, class: className, ...rest }: Props = $props();

  const groupCtx = getContext<CheckboxGroupContextValue | undefined>(CHECKBOX_GROUP_CONTEXT_KEY);
  const orientation = $derived(groupCtx?.orientation ?? "vertical");

  const styles = $derived(checkboxStyles({ orientation }));
</script>

<div class={cn(styles.items(), className)} {...rest}>
  {@render children()}
</div>
