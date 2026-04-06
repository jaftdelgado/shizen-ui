<script lang="ts">
  interface Props {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
    class?: string;
  }

  let {
    size = 16,
    color = "currentColor",
    strokeWidth = 2.4,
    class: className = ""
  }: Props = $props();
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class={className}
>
  <path
    d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z"
    stroke={color}
    stroke-width={strokeWidth}
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M11 21C11 18 11 15 11 12C11 9.8125 11.5 8 15 8"
    stroke={color}
    stroke-width={strokeWidth}
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M9 13H11H15"
    stroke={color}
    stroke-width={strokeWidth}
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
