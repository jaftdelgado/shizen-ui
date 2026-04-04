<script lang="ts">
  import { Surface, NumberInput, Label, Description } from "@shizen-ui/svelte";
</script>

<div class="flex items-center w-full max-w-72">
  <Surface class="p-6 w-full">
    <div class="flex flex-col gap-1.5">
      <Label>Guests</Label>
      <NumberInput id="guests" value={2} min={1} max={10}>
        <NumberInput.DecrementButton />
        <NumberInput.Input />
        <NumberInput.IncrementButton />
      </NumberInput>
      <Description>Choose a count.</Description>
    </div>
  </Surface>
</div>
