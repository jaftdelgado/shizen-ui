<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { alertStyles } from "@shizen-ui/styles";
  import { useAlertContext } from "../../../contexts/internal/index.js";
  import {
    CheckCircleIcon,
    InfoCircleIcon,
    WarningTriangleIcon,
    XmarkCircleIcon
  } from "../../../shared/icons/index.js";

  interface Props {
    children?: Snippet;
    class?: string;
  }

  let { children, class: className }: Props = $props();

  const ctx = useAlertContext();
  const styles = $derived(alertStyles({ variant: ctx.variant, status: ctx.status }));

  const defaultIcons = {
    default: InfoCircleIcon,
    accent: InfoCircleIcon,
    success: CheckCircleIcon,
    warning: WarningTriangleIcon,
    danger: XmarkCircleIcon
  } as const;

  const DefaultIcon = $derived(defaultIcons[ctx.status]);
</script>

<span class={cn(styles.indicator(), className)}>
  {#if children}
    {@render children()}
  {:else}
    <DefaultIcon />
  {/if}
</span>
