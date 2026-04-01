<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { alertStyles } from "@shizen-ui/styles";
  import {
    setAlertContext,
    type AlertVariant,
    type AlertStatus
  } from "../../contexts/internal/index.js";

  interface Props {
    variant?: AlertVariant;
    status?: AlertStatus;
    children: Snippet;
    class?: string;
  }

  let { variant = "default", status = "default", children, class: className }: Props = $props();

  setAlertContext({
    get variant() {
      return variant;
    },
    get status() {
      return status;
    }
  });

  const styles = $derived(alertStyles({ variant, status }));
</script>

<div class={cn(styles.base(), className)} role="alert" data-variant={variant} data-status={status}>
  {@render children()}
</div>
