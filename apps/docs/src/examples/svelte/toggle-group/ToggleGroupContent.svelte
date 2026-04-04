<script lang="ts">
  import { Toggle, ToggleGroup } from "@shizen-ui/svelte";
  import { BoldIcon, ItalicIcon, UnderlineIcon } from "@assets/icons/svelte";
</script>

<div class="flex flex-col gap-2">
  <ToggleGroup type="multiple" value={["bold", "italic"]}>
    <Toggle value="bold">
      {#snippet startContent()}
        <BoldIcon class="size-4" />
      {/snippet}
      Bold
    </Toggle>

    <Toggle value="italic">
      {#snippet startContent()}
        <ItalicIcon class="size-4" />
      {/snippet}
      Italic
    </Toggle>

    <Toggle value="underline">
      {#snippet startContent()}
        <UnderlineIcon class="size-4" />
      {/snippet}
      Underline
    </Toggle>
  </ToggleGroup>
</div>
