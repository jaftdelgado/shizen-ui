<script lang="ts">
  import { Toggle, Description } from "@shizen-ui/svelte";

  let isActive = $state(false);
</script>

<div class="flex flex-col gap-4">
  <Toggle variant="outline" bind:pressed={isActive}>Dark Mode</Toggle>

  <Description>
    Status: {isActive ? "Enabled" : "Disabled"}
  </Description>
</div>
