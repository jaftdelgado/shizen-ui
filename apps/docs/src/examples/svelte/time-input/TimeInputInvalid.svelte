<script lang="ts">
  import { TimeInput, Label, FieldError } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-1.5 w-full max-w-60">
  <Label for="check-in-time">Check-in time</Label>
  <TimeInput id="check-in-time" value={"05:30"} invalid={true} />
  <FieldError>Choose a time after 06:00 AM to continue.</FieldError>
</div>
