<script lang="ts">
  import { NumberInput, Label, Description } from "@shizen-ui/svelte";

  let passengers = $state(1);
</script>

<div class="flex flex-col gap-1.5 w-full max-w-60">
  <Label for="passengers">Passengers</Label>
  <NumberInput id="passengers" bind:value={passengers} min={1} max={5}>
    <NumberInput.DecrementButton />
    <NumberInput.Input />
    <NumberInput.IncrementButton />
  </NumberInput>
  <Description>Maximum 5 passengers per vehicle booking.</Description>
</div>
