<script lang="ts">
  import { Chip } from "@shizen-ui/svelte";
  import { StatUpIcon, StatDownIcon } from "@assets/icons/svelte";
</script>

<div class="flex flex-row gap-3">
  <Chip color="success" variant="soft">
    {#snippet startContent()}
      <StatUpIcon class="size-3" />
    {/snippet}
    +12.3%
  </Chip>

  <Chip color="danger" variant="soft">
    {#snippet endContent()}
      <StatDownIcon class="size-3" />
    {/snippet}
    -5.2%
  </Chip>
</div>
