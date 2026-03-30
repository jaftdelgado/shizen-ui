<script lang="ts">
  import { Chip } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-4">
  <Chip>Active Technology</Chip>
  <Chip disabled={true}>Deprecated Version</Chip>
  <Chip variant="outline" disabled={true}>Legacy Support</Chip>
  <Chip variant="ghost" disabled={true}>Maintenance Mode</Chip>
</div>
