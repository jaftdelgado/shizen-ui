<script lang="ts">
  import { NumberInput, Label } from "@shizen-ui/svelte";

  let sm = $state(6);
  let md = $state(8);
  let lg = $state(10);
</script>

<div class="flex flex-col gap-4 w-full max-w-60">
  <div class="flex flex-col gap-1.5">
    <Label for="qty-sm">Small</Label>
    <NumberInput id="qty-sm" bind:value={sm} min={1} size="sm">
      <NumberInput.DecrementButton />
      <NumberInput.Input />
      <NumberInput.IncrementButton />
    </NumberInput>
  </div>

  <div class="flex flex-col gap-1.5">
    <Label for="qty-md">Medium</Label>
    <NumberInput id="qty-md" bind:value={md} min={1} size="md">
      <NumberInput.DecrementButton />
      <NumberInput.Input />
      <NumberInput.IncrementButton />
    </NumberInput>
  </div>

  <div class="flex flex-col gap-1.5">
    <Label for="qty-lg">Large</Label>
    <NumberInput id="qty-lg" bind:value={lg} min={1} size="lg">
      <NumberInput.DecrementButton />
      <NumberInput.Input />
      <NumberInput.IncrementButton />
    </NumberInput>
  </div>
</div>
