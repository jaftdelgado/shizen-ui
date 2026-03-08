<script lang="ts">
  import { Tooltip, Button } from "@shizen-ui/svelte";
</script>

<div class="flex flex-row gap-4">
  <Tooltip>
    <Tooltip.Trigger>
      <Button variant="secondary">Default</Button>
    </Tooltip.Trigger>
    <Tooltip.Content>This is a tooltip with default delay.</Tooltip.Content>
  </Tooltip>

  <Tooltip delayDuration={500}>
    <Tooltip.Trigger>
      <Button variant="secondary">Custom Delay</Button>
    </Tooltip.Trigger>
    <Tooltip.Content>This is a tooltip with a 500ms delay.</Tooltip.Content>
  </Tooltip>
</div>
