<script lang="ts">
  interface Props {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
    class?: string;
  }

  let {
    size = 20,
    color = "currentColor",
    strokeWidth = 2,
    class: className = ""
  }: Props = $props();
</script>

<svg
  width={size}
  height={size}
  stroke-width={strokeWidth}
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class={className}
>
  <path
    d="M6 12H18"
    stroke={color}
    stroke-width={strokeWidth}
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
