<script lang="ts">
  import { NumberInput, Label, FieldError } from "@shizen-ui/svelte";

  let stock = $state(0);
</script>

<div class="flex flex-col gap-1.5 w-full max-w-60">
  <Label for="stock">Stock Count</Label>
  <NumberInput id="stock" bind:value={stock} min={0} invalid={true}>
    <NumberInput.DecrementButton />
    <NumberInput.Input />
    <NumberInput.IncrementButton />
  </NumberInput>
  <FieldError>Stock count cannot be zero before publishing this product.</FieldError>
</div>
