<script lang="ts">
  import { NumberInput, Label } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-4 w-full max-w-60">
  <div class="flex flex-col gap-1.5">
    <Label for="default">Small</Label>
    <NumberInput id="default" variant="default" value={2} min={1}>
      <NumberInput.DecrementButton />
      <NumberInput.Input />
      <NumberInput.IncrementButton />
    </NumberInput>
  </div>

  <div class="flex flex-col gap-1.5">
    <Label for="secondary">Secondary</Label>
    <NumberInput id="secondary" variant="secondary" value={4} min={1}>
      <NumberInput.DecrementButton />
      <NumberInput.Input />
      <NumberInput.IncrementButton />
    </NumberInput>
  </div>

  <div class="flex flex-col gap-1.5">
    <Label for="outline">Outline</Label>
    <NumberInput id="outline" variant="outline" value={6} min={1}>
      <NumberInput.DecrementButton />
      <NumberInput.Input />
      <NumberInput.IncrementButton />
    </NumberInput>
  </div>
</div>
