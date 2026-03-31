<script lang="ts">
  import { TimeInput, Label } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-6 w-full max-w-60">
  <div class="flex flex-col gap-1.5">
    <Label for="time-sm">Small</Label>
    <TimeInput id="time-sm" size="sm" value="07:15 AM" />
  </div>

  <div class="flex flex-col gap-1.5">
    <Label for="time-md">Medium</Label>
    <TimeInput id="time-md" size="md" value="11:00 AM" />
  </div>

  <div class="flex flex-col gap-1.5">
    <Label for="time-lg">Large</Label>
    <TimeInput id="time-lg" size="lg" value="04:20 PM" />
  </div>
</div>
