<script lang="ts">
  import { Tag, Description } from "@shizen-ui/svelte";

  let remote = $state(true);
  let fullTime = $state(true);
  let contract = $state(false);
  let urgent = $state(false);

  const activeFilters = $derived(
    [
      remote ? "Remote" : null,
      fullTime ? "Full-time" : null,
      contract ? "Contract" : null,
      urgent ? "Urgent" : null
    ].filter(Boolean)
  );
</script>

<div class="flex flex-col gap-4">
  <Description>Tap tags to filter a candidate list.</Description>

  <div class="flex flex-wrap gap-2">
    <Tag selectionMode="multiple" bind:selected={remote}>Remote</Tag>
    <Tag selectionMode="multiple" bind:selected={fullTime}>Full-time</Tag>
    <Tag selectionMode="multiple" bind:selected={contract}>Contract</Tag>
    <Tag selectionMode="multiple" bind:selected={urgent}>Urgent</Tag>
  </div>

  <Description>
    Active filters: {activeFilters.length ? activeFilters.join(", ") : "None"}
  </Description>
</div>
