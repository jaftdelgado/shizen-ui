<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { avatarStyles } from "@shizen-ui/styles";
  import type { HTMLImgAttributes } from "svelte/elements";
  import { useAvatarContext } from "../../../contexts/internal/index.js";

  interface Props extends Omit<HTMLImgAttributes, "class"> {
    class?: string;
  }

  let { class: className, src, alt = "", ...rest }: Props = $props();

  const ctx = useAvatarContext();
  const styles = $derived(avatarStyles({}));

  function handleLoad() {
    ctx.setImageLoaded(true);
    ctx.setImageError(false);
  }

  function handleError() {
    ctx.setImageLoaded(false);
    ctx.setImageError(true);
  }
</script>

<img
  class={cn(styles.image(), className)}
  {src}
  {alt}
  data-loaded={ctx.imageLoaded}
  onload={handleLoad}
  onerror={handleError}
  {...rest}
/>
