<script lang="ts">
  import { Tooltip, Button, Description } from "@shizen-ui/svelte";

  let isOpen = $state(false);
</script>

<div class="flex flex-col items-center gap-4">
  <Tooltip bind:isOpen>
    <Tooltip.Trigger>
      <Button variant="secondary">Hover me</Button>
    </Tooltip.Trigger>
    <Tooltip.Content>Helpful information about this element</Tooltip.Content>
  </Tooltip>

  <Description>Tooltip state: {isOpen ? "open" : "closed"}</Description>
</div>
