<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { avatarStyles } from "@shizen-ui/styles";
  import { setAvatarContext, type AvatarSize } from "../../contexts/internal/index.js";

  interface Props {
    size?: AvatarSize;
    class?: string;
    children: Snippet;
  }

  let { size = "md", class: className, children }: Props = $props();

  let imageLoaded = $state(false);
  let imageError = $state(false);

  setAvatarContext({
    get size() {
      return size;
    },
    get imageLoaded() {
      return imageLoaded;
    },
    get imageError() {
      return imageError;
    },
    setImageLoaded: (loaded: boolean) => {
      imageLoaded = loaded;
    },
    setImageError: (error: boolean) => {
      imageError = error;
    }
  });

  const styles = $derived(avatarStyles({ size }));
</script>

<span class={cn(styles.base(), className)}>
  {@render children()}
</span>
