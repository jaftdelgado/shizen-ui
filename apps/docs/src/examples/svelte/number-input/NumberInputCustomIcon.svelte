<script lang="ts">
  import { NumberInput, Label, Description } from "@shizen-ui/svelte";
  import { ZoomInIcon, ZoomOutIcon } from "@assets/icons/svelte";

  let zoom = $state(100);
</script>

<div class="flex flex-col gap-1.5 w-full max-w-60">
  <Label for="zoom">Zoom Level</Label>
  <NumberInput id="zoom" bind:value={zoom} min={20} max={200} step={10}>
    <NumberInput.DecrementButton>
      <ZoomOutIcon class="size-4" />
    </NumberInput.DecrementButton>
    <NumberInput.Input />
    <NumberInput.IncrementButton>
      <ZoomInIcon class="size-4" />
    </NumberInput.IncrementButton>
  </NumberInput>
  <Description>Canvas zoom as a percentage.</Description>
</div>
