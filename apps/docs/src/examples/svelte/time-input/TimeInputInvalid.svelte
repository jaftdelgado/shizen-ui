<script lang="ts">
  import { TimeInput, Label, Description, FieldError } from "@shizen-ui/svelte";

  let checkInTime = $state("05:30 AM");
  const isInvalid = $derived(checkInTime !== "" && checkInTime < "06:00 AM");
</script>

<div class="flex flex-col gap-1.5 w-full max-w-60">
  <Label for="check-in-time">Check-in time</Label>
  <TimeInput id="check-in-time" bind:value={checkInTime} invalid={isInvalid} />
  <Description>Front desk check-in starts at 06:00 AM.</Description>
  <FieldError>Choose a time after 06:00 AM to continue.</FieldError>
</div>
