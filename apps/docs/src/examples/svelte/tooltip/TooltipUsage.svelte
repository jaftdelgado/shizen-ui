<script lang="ts">
  import { Tooltip, Button } from "@shizen-ui/svelte";
</script>

<div class="flex flex-wrap">
  <Tooltip>
    <Tooltip.Trigger>
      <Button>Hover me</Button>
    </Tooltip.Trigger>
    <Tooltip.Content>Helpful information about this element</Tooltip.Content>
  </Tooltip>
</div>
