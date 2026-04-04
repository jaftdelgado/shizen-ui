<script lang="ts">
  import { Toggle } from "@shizen-ui/svelte";
  import { BoldIcon, ItalicIcon, UnderlineIcon } from "@assets/icons/svelte";
</script>

<div class="flex flex-col gap-4">
  <div class="flex items-center gap-2">
    <Toggle iconOnly>
      <BoldIcon class="size-4" />
    </Toggle>
    <Toggle variant="outline" iconOnly><ItalicIcon class="size-4" /></Toggle>
    <Toggle variant="ghost" iconOnly><UnderlineIcon class="size-4" /></Toggle>
  </div>
</div>
