<script lang="ts">
  import { Toggle } from "@shizen-ui/svelte";
  import { BoldIcon, ItalicIcon } from "@assets/icons/svelte";
</script>

<div class="flex items-center gap-2">
  <Toggle variant="outline">
    {#snippet startContent()}
      <BoldIcon class="size-4" />
    {/snippet}
    Bold
  </Toggle>

  <Toggle variant="outline">
    {#snippet endContent()}
      <ItalicIcon class="size-4" />
    {/snippet}
    Italic
  </Toggle>
</div>
