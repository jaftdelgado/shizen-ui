<script>
  import { Switch, Label, Description } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col">
  <Switch>
    <Switch.Control />
    <Switch.Content>
      <Label>Notifications</Label>
      <Description>Enable notifications to stay informed of updates</Description>
    </Switch.Content>
  </Switch>
</div>
