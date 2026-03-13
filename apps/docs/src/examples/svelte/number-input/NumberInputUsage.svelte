<script lang="ts">
  import { NumberInput, Label, Description } from "@shizen-ui/svelte";

  let quantity = $state(1);
</script>

<div class="flex flex-col gap-1.5 w-full max-w-xs">
  <Label for="quantity">Quantity</Label>
  <NumberInput id="quantity" bind:value={quantity} min={1} max={99}>
    <NumberInput.DecrementButton />
    <NumberInput.Input />
    <NumberInput.IncrementButton />
  </NumberInput>
  <Description>Number of units to add to your order.</Description>
</div>
