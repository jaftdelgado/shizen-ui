<script lang="ts">
  import { NumberInput, Label, Description } from "@shizen-ui/svelte";

  import Icon from "@assets/Icon.svelte";
  import { ZoomIn, ZoomOut } from "@assets/icons";

  let zoom = $state(100);
</script>

<div class="flex flex-col gap-1.5 w-full max-w-60">
  <Label for="zoom">Zoom Level</Label>
  <NumberInput id="zoom" bind:value={zoom} min={20} max={200} step={10}>
    <NumberInput.DecrementButton>
      <Icon icon={ZoomOut} class="size-4" />
    </NumberInput.DecrementButton>
    <NumberInput.Input />
    <NumberInput.IncrementButton>
      <Icon icon={ZoomIn} class="size-4" />
    </NumberInput.IncrementButton>
  </NumberInput>
  <Description>Canvas zoom as a percentage.</Description>
</div>
