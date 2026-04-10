<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { tagGroupStyles } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";
  import { useTagGroupContext } from "../../../contexts/internal/index.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children: Snippet;
  }

  let { children, class: className, onkeydown, ...rest }: Props = $props();

  const group = useTagGroupContext();
  const styles = tagGroupStyles();

  function handleKeyDown(e: KeyboardEvent & { currentTarget: EventTarget & HTMLDivElement }) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      group.focusNext();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      group.focusPrev();
    }
    onkeydown?.(e);
  }
</script>

<div class={cn(styles.list(), className)} onkeydown={handleKeyDown} {...rest}>
  {@render children()}
</div>
