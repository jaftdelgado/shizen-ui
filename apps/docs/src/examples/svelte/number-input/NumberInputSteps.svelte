<script lang="ts">
  import { NumberInput, Label, Description } from "@shizen-ui/svelte";

  let opacity = $state(100);
</script>

<div class="flex flex-col gap-1.5 w-full max-w-60">
  <Label for="opacity">Opacity</Label>
  <NumberInput id="opacity" bind:value={opacity} min={0} max={100} step={5}>
    <NumberInput.DecrementButton />
    <NumberInput.Input />
    <NumberInput.IncrementButton />
  </NumberInput>
  <Description>Layer opacity as a percentage.</Description>
</div>
