<script lang="ts">
  import { Popover, Button, Description } from "@shizen-ui/svelte";

  let isOpen = $state(false);
</script>

<Popover bind:isOpen>
  <Popover.Trigger>
    <Button>Open popover</Button>
  </Popover.Trigger>

  <Popover.Content>
    <Popover.Dialog>
      <Popover.Heading>Settings</Popover.Heading>
      <Description>Popover content goes here.</Description>
    </Popover.Dialog>
  </Popover.Content>
</Popover>
