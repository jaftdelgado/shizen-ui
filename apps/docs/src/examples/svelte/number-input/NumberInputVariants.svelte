<script lang="ts">
  import { NumberInput } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-4 w-full max-w-60">
  <NumberInput min={0} max={10}>
    <NumberInput.DecrementButton />
    <NumberInput.Input />
    <NumberInput.IncrementButton />
  </NumberInput>

  <NumberInput variant="secondary">
    <NumberInput.DecrementButton />
    <NumberInput.Input />
    <NumberInput.IncrementButton />
  </NumberInput>

  <NumberInput variant="outline">
    <NumberInput.DecrementButton />
    <NumberInput.Input />
    <NumberInput.IncrementButton />
  </NumberInput>
</div>
