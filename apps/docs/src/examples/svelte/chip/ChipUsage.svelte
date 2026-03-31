<script lang="ts">
  import { Chip } from "@shizen-ui/svelte";
  import { BadgeCheckIcon, MapPinIcon } from "@assets/icons/svelte";
</script>

<div class="flex flex-row gap-3">
  <Chip>
    {#snippet startContent()}
      <MapPinIcon class="size-3" />
    {/snippet}
    Cupertino, CA
  </Chip>

  <Chip color="accent" variant="primary">
    {#snippet startContent()}
      <BadgeCheckIcon class="size-3" />
    {/snippet}
    Verified
  </Chip>
</div>
