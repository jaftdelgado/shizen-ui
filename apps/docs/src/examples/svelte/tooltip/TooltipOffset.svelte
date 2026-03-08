<script lang="ts">
  import { Tooltip, Button } from "@shizen-ui/svelte";
</script>

<div class="flex flex-row gap-4">
  <Tooltip>
    <Tooltip.Trigger>
      <Button>Default</Button>
    </Tooltip.Trigger>
    <Tooltip.Content>This is a tooltip with default offset.</Tooltip.Content>
  </Tooltip>

  <Tooltip offset={20}>
    <Tooltip.Trigger>
      <Button>Custom Offset</Button>
    </Tooltip.Trigger>
    <Tooltip.Content>This is a tooltip with a 20px offset.</Tooltip.Content>
  </Tooltip>
</div>
