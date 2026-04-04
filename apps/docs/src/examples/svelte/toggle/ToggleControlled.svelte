<script lang="ts">
  import { Toggle, Description } from "@shizen-ui/svelte";
  import { BookmarkIcon, BookmarkSolidIcon } from "@assets/icons/svelte";

  let isActive = $state(false);
</script>

<div class="flex flex-col gap-4">
  <Toggle bind:pressed={isActive}>
    {#snippet startContent()}
      {#if isActive}
        <BookmarkSolidIcon />
      {:else}
        <BookmarkIcon />
      {/if}
    {/snippet}
    {isActive ? "Saved" : "Save"}
  </Toggle>

  <Description>
    Status: {isActive ? "Enabled" : "Disabled"}
  </Description>
</div>
