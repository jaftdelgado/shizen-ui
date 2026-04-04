<script lang="ts">
  import { Toggle } from "@shizen-ui/svelte";
</script>

<div class="flex items-center gap-2">
  <Toggle disabled>Default</Toggle>
  <Toggle variant="outline" disabled>Outline</Toggle>
  <Toggle variant="ghost" disabled>Ghost</Toggle>
</div>
