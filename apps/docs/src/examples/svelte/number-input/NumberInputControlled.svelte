<script lang="ts">
  import { NumberInput, Label, Description, Button } from "@shizen-ui/svelte";

  let width = $state(1024);
</script>

<div class="flex flex-col gap-4 w-full max-w-64">
  <div class="flex flex-col gap-1.5">
    <Label for="width">Width</Label>
    <NumberInput id="width" bind:value={width} min={0}>
      <NumberInput.DecrementButton />
      <NumberInput.Input />
      <NumberInput.IncrementButton />
    </NumberInput>
    <Description>Current value: {width}px</Description>
  </div>
  <div class="flex gap-2">
    <Button variant="secondary" onclick={() => (width = 0)}>Reset</Button>
    <Button variant="secondary" onclick={() => (width = 2048)}>Set 2048</Button>
  </div>
</div>
