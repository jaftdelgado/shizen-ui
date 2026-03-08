<script>
  import { Tooltip, Button } from "@shizen-ui/svelte";
</script>

<Tooltip placement="bottom" delay={400}>
  <Tooltip.Trigger>
    <Button>Bottom tooltip</Button>
  </Tooltip.Trigger>
  <Tooltip.Content>Shows below the trigger</Tooltip.Content>
</Tooltip>
