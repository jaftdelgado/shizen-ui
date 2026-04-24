<script>
  import { Switch, Label, Description } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col">
  <Switch
    class="
      [--switch-thumb-ratio:1]
      [--switch-padding:0.125rem]
      [--switch-width:2.125rem]
      data-checked:[--switch-bg:var(--color-success)]
      data-checked:[--switch-bg-hover:var(--color-success-hover)]
    "
  >
    <Switch.Control />
    <Switch.Content>
      <Label>Read receipts</Label>
      <Description>Show when messages are read</Description>
    </Switch.Content>
  </Switch>
</div>
