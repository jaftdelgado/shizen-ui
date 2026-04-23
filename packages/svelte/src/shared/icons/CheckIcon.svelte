<script>
  let { size = 16, delay = 100 } = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2.8"
  stroke-linecap="round"
  stroke-linejoin="round"
  class="check-icon"
>
  <path class="check-icon__path" d="M5 13L9 17L19 7" style="animation-delay: {delay}ms"></path>
</svg>

<style>
  .check-icon__path {
    stroke-dasharray: 20;
    stroke-dashoffset: 20;
    animation: draw-check 200ms ease-out forwards;
  }

  .check-icon {
    animation: fade-in 100ms ease-out forwards;
  }

  @keyframes draw-check {
    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
