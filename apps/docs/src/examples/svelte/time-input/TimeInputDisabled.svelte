<script lang="ts">
  import { TimeInput, Label, Description } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-1.5 w-full max-w-60">
  <Label for="support-hours">Support hours</Label>
  <TimeInput id="support-hours" value="09:00 AM" disabled />
  <Description>Hours are managed by your workspace administrator.</Description>
</div>
