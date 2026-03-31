<script lang="ts">
  import { TimeInput, Label, Description, Button } from "@shizen-ui/svelte";

  let reminderTime = $state("08:30 AM");
</script>

<div class="flex flex-col gap-4 w-full max-w-60">
  <div class="flex flex-col gap-1.5">
    <Label for="reminder-time">Reminder time</Label>
    <TimeInput id="reminder-time" bind:value={reminderTime} />
    <Description>
      {reminderTime ? `Notifications will be sent at ${reminderTime}.` : "Pick a reminder time."}
    </Description>
  </div>

  <div class="flex gap-2">
    <Button size="sm" variant="secondary" onclick={() => (reminderTime = "09:00 AM")}
      >9:00 AM</Button
    >
    <Button size="sm" variant="secondary" onclick={() => (reminderTime = "05:30 PM")}
      >5:30 PM</Button
    >
    <Button size="sm" variant="secondary" onclick={() => (reminderTime = "")}>Clear</Button>
  </div>
</div>
