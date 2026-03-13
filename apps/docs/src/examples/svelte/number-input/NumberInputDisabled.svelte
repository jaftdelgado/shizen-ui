<script lang="ts">
  import { NumberInput, Label, Description } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-1.5 w-full max-w-xs">
  <Label for="seat-count">Seat count</Label>
  <NumberInput id="seat-count" value={5} disabled>
    <NumberInput.DecrementButton />
    <NumberInput.Input />
    <NumberInput.IncrementButton />
  </NumberInput>
  <Description>Seat limit is managed by your plan.</Description>
</div>
