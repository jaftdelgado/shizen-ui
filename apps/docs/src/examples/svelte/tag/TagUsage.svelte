<script lang="ts">
  import { Tag, Description } from "@shizen-ui/svelte";
  import { MapPinIcon, BadgeCheckIcon } from "@assets/icons/svelte";
</script>

<div class="flex flex-col gap-3">
  <Description>Quick metadata for a product listing.</Description>

  <div class="flex flex-wrap items-center gap-2">
    <Tag>
      {#snippet startContent()}
        <MapPinIcon class="size-3" />
      {/snippet}
      Lisbon, PT
    </Tag>

    <Tag variant="default">
      {#snippet startContent()}
        <BadgeCheckIcon class="size-3" />
      {/snippet}
      Verified host
    </Tag>
  </div>
</div>
