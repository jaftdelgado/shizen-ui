<script>
  import { Switch, Label } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col">
  <Switch>
    <Switch.Control />
    <Switch.Content>
      <Label>Enable notifications</Label>
    </Switch.Content>
  </Switch>
</div>
