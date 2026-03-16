<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { avatarStyles } from "@shizen-ui/styles";
  import { useAvatarContext } from "../../../contexts/internal/index.js";

  interface Props {
    children?: Snippet;
    class?: string;
    delayMs?: number;
  }

  let { children, class: className, delayMs = 0 }: Props = $props();

  const ctx = useAvatarContext();
  const styles = $derived(avatarStyles({}));

  let delayPassed = $state(false);

  $effect(() => {
    if (delayMs === 0) {
      delayPassed = true;
      return;
    }

    delayPassed = false;
    const timer = setTimeout(() => {
      delayPassed = true;
    }, delayMs);

    return () => clearTimeout(timer);
  });

  const isVisible = $derived(!ctx.imageLoaded && delayPassed);
</script>

<span
  class={cn(styles.fallback(), className)}
  data-visible={isVisible}
  aria-hidden={ctx.imageLoaded ? "true" : undefined}
>
  {#if children}
    {@render children()}
  {/if}
</span>
