<script lang="ts">
  import { Chip } from "@shizen-ui/svelte";

  import Icon from "@assets/Icon.svelte";
  import { StatUpIcon, StatDownIcon } from "@assets/icons";
</script>

<div class="flex flex-row gap-3">
  <Chip color="success">
    {#snippet startContent()}
      <Icon icon={StatUpIcon} class="size-3" />
    {/snippet}
    +12.3%
  </Chip>

  <Chip color="danger">
    {#snippet endContent()}
      <Icon icon={StatDownIcon} class="size-3" />
    {/snippet}
    -5.2%
  </Chip>
</div>
