<script lang="ts">
  import { Toggle, ToggleGroup } from "@shizen-ui/svelte";

  import Icon from "@assets/Icon.svelte";
  import { AlignCenter, AlignLeft, AlignRight } from "@assets/icons";

  let view = $state<string | null>("board");
</script>

<div class="flex flex-col gap-3">
  <ToggleGroup type="single" bind:value={view}>
    <Toggle value="left">
      {#snippet startContent()}
        <Icon icon={AlignLeft} class="size-4" />
      {/snippet}
      Left
    </Toggle>

    <Toggle value="center">
      {#snippet startContent()}
        <Icon icon={AlignCenter} class="size-4" />
      {/snippet}
      Center
    </Toggle>

    <Toggle value="right">
      {#snippet startContent()}
        <Icon icon={AlignRight} class="size-4" />
      {/snippet}
      Right
    </Toggle>
  </ToggleGroup>
</div>
