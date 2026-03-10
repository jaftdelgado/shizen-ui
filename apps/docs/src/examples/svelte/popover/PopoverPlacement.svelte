<script lang="ts">
  import { Popover, Button } from "@shizen-ui/svelte";

  const placements = ["top", "right", "bottom", "left"] as const;
</script>

<div class="flex flex-wrap gap-2">
  {#each placements as placement (placement)}
    <Popover {placement}>
      <Popover.Trigger>
        <Button variant="secondary" class="capitalize">{placement}</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Dialog>
          <Popover.Heading>Placement: {placement}</Popover.Heading>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  {/each}
</div>
