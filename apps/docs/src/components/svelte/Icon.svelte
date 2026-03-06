<script lang="ts">
  import { icons, type IconName } from "@assets/icons/icons";

  export let name: IconName;
  export let size: number = 16;
  export let strokeWidth: number = 0.1;
  export let filled: boolean = false;
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 16 16"
  fill={filled ? "currentColor" : "none"}
  stroke={filled ? "none" : "currentColor"}
  stroke-width={strokeWidth}
  class={$$props.class}
  aria-hidden="true"
  focusable="false"
  {...$$restProps}
>
  {@html icons[name]}
</svg>

<style>
  svg {
    display: inline-block;
    vertical-align: middle;
  }
</style>
