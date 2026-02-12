<script lang="ts">
  import { icons, type IconName } from "@assets/icons/icons";

  export let name: IconName;
  export let size: number = 16;
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 16 16"
  fill="none"
  class={$$props.class}
  {...$$restProps}
>
  {@html icons[name]}
</svg>
