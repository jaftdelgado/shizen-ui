<script lang="ts">
  import { icons, type IconName } from "@assets/icons/icons";

  export let name: IconName;
  export let size: number = 16;
  export let strokeWidth: number = 0.1;
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 16 16"
  fill="none"
  stroke="currentColor"
  stroke-width={strokeWidth}
  class={$$props.class}
  aria-hidden="true"
  focusable="false"
  {...$$restProps}
>
  {@html icons[name]}
</svg>

<style>
  svg :global(path) {
    stroke-width: inherit;
    stroke: inherit;
  }
</style>
