<script lang="ts">
  import { getContext, type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";
  import { radioStyles } from "@shizen-ui/styles";
  import { RADIO_GROUP_CONTEXT_KEY } from "../radio.context";
  import type { RadioGroupContextValue } from "../radio.types";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children: Snippet;
  }

  let { children, class: className, ...rest }: Props = $props();

  const groupCtx = getContext<RadioGroupContextValue | undefined>(RADIO_GROUP_CONTEXT_KEY);
  const orientation = $derived(groupCtx?.orientation ?? "vertical");

  const styles = $derived(radioStyles({ orientation }));
</script>

<div class={cn(styles.items(), className)} {...rest}>
  {@render children()}
</div>
