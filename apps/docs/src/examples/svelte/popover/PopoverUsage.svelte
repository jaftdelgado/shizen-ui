<script lang="ts">
  import { Popover, Button, Description } from "@shizen-ui/svelte";

  let isOpen = $state(false);
</script>

<Popover bind:isOpen>
  <Popover.Trigger>
    <Button>Open popover</Button>
  </Popover.Trigger>

  <Popover.Content class="max-w-64">
    <Popover.Dialog>
      <Popover.Heading>Popover Title</Popover.Heading>
      <Description>This is the popover content. You can put any content here.</Description>
    </Popover.Dialog>
  </Popover.Content>
</Popover>
