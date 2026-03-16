<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { avatarStyles } from "@shizen-ui/styles";
  import { useAvatarContext } from "../../../contexts/internal/index.js";

  interface Props {
    children?: Snippet;
    class?: string;
    /**
     * Delay in ms before showing the fallback.
     * Useful to avoid flashing the fallback during fast image loads.
     * @default 0
     */
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
