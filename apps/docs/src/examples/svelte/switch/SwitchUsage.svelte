<script>
  import { Switch, Label } from "@shizen-ui/svelte";
  let isEnabled = $state(false);
</script>

<Switch bind:checked={isEnabled}>
  <Switch.Control />
  <Switch.Content>
    <Label>Enable notifications</Label>
  </Switch.Content>
</Switch>
