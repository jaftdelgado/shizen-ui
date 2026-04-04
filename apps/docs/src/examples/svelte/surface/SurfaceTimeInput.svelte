<script lang="ts">
  import { Surface, TimeInput, Label, Description } from "@shizen-ui/svelte";
  let meetingTime = $state("14:00");
</script>

<div class="flex items-center w-full max-w-72">
  <Surface class="p-6 w-full">
    <div class="flex flex-col gap-1.5">
      <Label for="meeting-time">Meeting time</Label>
      <TimeInput id="meeting-time" bind:value={meetingTime} />
      <Description>Set the time for your scheduled meeting.</Description>
    </div>
  </Surface>
</div>
