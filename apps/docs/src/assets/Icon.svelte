<script lang="ts" module>
  import type { IconoirIcon } from "@assets/icons";
  export type { IconoirIcon };
</script>

<script lang="ts">
  import { default as IconifyIcon } from "@iconify/svelte";

  let { icon, class: className }: { icon: IconoirIcon; class?: string } = $props();
</script>

<IconifyIcon {icon} class={className} />
