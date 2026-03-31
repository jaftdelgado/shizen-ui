<script lang="ts">
  import { TimeInput, Label, Description } from "@shizen-ui/svelte";

  let departureTime = $state("09:30 AM");
</script>

<div class="flex flex-col gap-1.5 w-full max-w-60">
  <Label for="departure-time">Departure time</Label>
  <TimeInput id="departure-time" bind:value={departureTime} />
  <Description>Select the planned departure time for your shuttle route.</Description>
</div>
