<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { spinnerStyles, type SpinnerVariants } from "@shizen-ui/styles";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    size?: SpinnerVariants["size"];
    color?: SpinnerVariants["color"];
  }

  let { class: className, size = "md", color = "current", ...rest }: Props = $props();
</script>

<div class={cn(spinnerStyles({ size, color }), className)} {...rest}>
  {#each Array(12) as _, i}
    <div class="spinner__bar spinner__bar--{i + 1}"></div>
  {/each}
</div>
