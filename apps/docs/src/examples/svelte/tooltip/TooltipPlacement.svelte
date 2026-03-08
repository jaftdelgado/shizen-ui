<script lang="ts">
  import { Tooltip, Button } from "@shizen-ui/svelte";

  const placements = ["top", "right", "bottom", "left"] as const;
</script>

<div class="flex flex-wrap gap-2">
  {#each placements as placement (placement)}
    <Tooltip {placement}>
      <Tooltip.Trigger>
        <Button variant="secondary" class="capitalize">{placement}</Button>
      </Tooltip.Trigger>
      <Tooltip.Content>Add to library</Tooltip.Content>
    </Tooltip>
  {/each}
</div>
