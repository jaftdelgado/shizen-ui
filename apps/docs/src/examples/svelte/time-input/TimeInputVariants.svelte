<script lang="ts">
  import { TimeInput, Label } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-4 w-full max-w-60">
  <div class="flex flex-col gap-1.5">
    <Label for="time-default">Default</Label>
    <TimeInput id="time-default" variant="default" value="08:00 AM" />
  </div>

  <div class="flex flex-col gap-1.5">
    <Label for="time-secondary">Secondary</Label>
    <TimeInput id="time-secondary" variant="secondary" value="01:30 PM" />
  </div>

  <div class="flex flex-col gap-1.5">
    <Label for="time-outline">Outline</Label>
    <TimeInput id="time-outline" variant="outline" value="06:45 PM" />
  </div>
</div>
