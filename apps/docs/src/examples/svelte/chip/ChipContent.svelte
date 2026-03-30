<script lang="ts">
  import { Chip } from "@shizen-ui/svelte";
  import { BadgeCheckIcon } from "@assets/icons/svelte";
</script>

<div class="flex flex-col gap-4">
  <Chip>
    {#snippet startContent()}
      <BadgeCheckIcon class="size-3" />
    {/snippet}
    Verified
  </Chip>
</div>
