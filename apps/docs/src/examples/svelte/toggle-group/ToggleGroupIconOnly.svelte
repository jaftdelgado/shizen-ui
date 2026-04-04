<script lang="ts">
  import { Toggle, ToggleGroup } from "@shizen-ui/svelte";
  import { BoldIcon, ItalicIcon, UnderlineIcon } from "@assets/icons/svelte";
</script>

<div class="flex flex-col gap-2">
  <ToggleGroup type="multiple" value={["bold"]}>
    <Toggle value="bold" iconOnly aria-label="Bold">
      <BoldIcon class="size-4" />
    </Toggle>

    <Toggle value="italic" iconOnly aria-label="Italic">
      <ItalicIcon class="size-4" />
    </Toggle>

    <Toggle value="underline" iconOnly aria-label="Underline">
      <UnderlineIcon class="size-4" />
    </Toggle>
  </ToggleGroup>
</div>
