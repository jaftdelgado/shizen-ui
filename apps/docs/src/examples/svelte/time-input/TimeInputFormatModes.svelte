<script lang="ts">
  import { TimeInput, Label, Description, Switch } from "@shizen-ui/svelte";
  import { formatTime } from "@shizen-ui/svelte";

  let shiftStart = $state("16:40");
  let hour12 = $state(true);
</script>

<div class="flex flex-col gap-6 w-full max-w-60">
  <div class="flex flex-col gap-1.5">
    <Label for="shift-start">Shift start</Label>
    <TimeInput id="shift-start" {hour12} bind:value={shiftStart} />
    <Description>
      {shiftStart
        ? `Shift starts at ${formatTime(shiftStart, { hour12 })}`
        : "Pick a shift start time."}
    </Description>
  </div>

  <Switch bind:checked={hour12}>
    <Switch.Control />
    <Switch.Content>
      <Label>Use 12-hour format</Label>
    </Switch.Content>
  </Switch>
</div>
