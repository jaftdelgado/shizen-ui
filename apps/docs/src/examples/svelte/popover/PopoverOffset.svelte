<script lang="ts">
  import { Popover, Button, Description } from "@shizen-ui/svelte";
</script>

<div class="flex flex-row gap-4">
  <Popover>
    <Popover.Trigger>
      <Button>Default</Button>
    </Popover.Trigger>
    <Popover.Content>
      <Popover.Dialog>
        <Popover.Heading>Default Offset</Popover.Heading>
        <Description>Popover with default offset.</Description>
      </Popover.Dialog>
    </Popover.Content>
  </Popover>

  <Popover offset={24}>
    <Popover.Trigger>
      <Button>Custom Offset</Button>
    </Popover.Trigger>
    <Popover.Content>
      <Popover.Dialog>
        <Popover.Heading>24px Offset</Popover.Heading>
        <Description>Popover with 24px offset.</Description>
      </Popover.Dialog>
    </Popover.Content>
  </Popover>
</div>
