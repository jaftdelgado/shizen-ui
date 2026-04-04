<script lang="ts">
  import { TimeInput, Label, Description } from "@shizen-ui/svelte";

  let broadcastTime = $state("20:30:00");
</script>

<div class="flex flex-col gap-1.5 w-full max-w-60">
  <Label for="broadcast-time">Broadcast start</Label>
  <TimeInput id="broadcast-time" showSeconds bind:value={broadcastTime} />
  <Description>
    {broadcastTime
      ? `Stream scheduled at ${broadcastTime}.`
      : "Set the exact broadcast start time."}
  </Description>
</div>
