<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { alertStyles } from "@shizen-ui/styles";
  import { useAlertContext } from "../../../contexts/internal/index.js";

  interface Props {
    children: Snippet;
    class?: string;
  }

  let { children, class: className }: Props = $props();

  const ctx = useAlertContext();
  const styles = $derived(alertStyles({ variant: ctx.variant, status: ctx.status }));
</script>

<p class={cn(styles.description(), className)}>
  {@render children()}
</p>
