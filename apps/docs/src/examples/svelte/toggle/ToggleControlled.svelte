<script lang="ts">
  import { Toggle, Description } from "@shizen-ui/svelte";

  import Icon from "@assets/Icon.svelte";
  import { Bookmark, BookmarkSolid } from "@assets/icons";

  let isActive = $state(false);
</script>

<div class="flex flex-col gap-4">
  <Toggle bind:pressed={isActive}>
    {#snippet startContent()}
      {#if isActive}
        <Icon icon={BookmarkSolid} class="size-4" />
      {:else}
        <Icon icon={Bookmark} class="size-4" />
      {/if}
    {/snippet}
    {isActive ? "Saved" : "Save"}
  </Toggle>

  <Description>
    Status: {isActive ? "Enabled" : "Disabled"}
  </Description>
</div>
