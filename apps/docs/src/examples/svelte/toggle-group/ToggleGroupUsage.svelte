<script lang="ts">
  import { Toggle, ToggleGroup, Description } from "@shizen-ui/svelte";
  import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "@assets/icons/svelte";

  let view = $state<string | null>("board");
</script>

<div class="flex flex-col gap-3">
  <ToggleGroup type="single" bind:value={view}>
    <Toggle value="left">
      {#snippet startContent()}
        <AlignLeftIcon class="size-4" />
      {/snippet}
      Left
    </Toggle>

    <Toggle value="center">
      {#snippet startContent()}
        <AlignCenterIcon class="size-4" />
      {/snippet}
      Center
    </Toggle>

    <Toggle value="right">
      {#snippet startContent()}
        <AlignRightIcon class="size-4" />
      {/snippet}
      Right
    </Toggle>
  </ToggleGroup>
</div>
