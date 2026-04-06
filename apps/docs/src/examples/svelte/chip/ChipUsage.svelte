<script lang="ts">
  import { Chip } from "@shizen-ui/svelte";

  import Icon from "@assets/Icon.svelte";
  import { BadgeCheck, MapPin } from "@assets/icons";
</script>

<div class="flex flex-row gap-3">
  <Chip>
    {#snippet startContent()}
      <Icon icon={MapPin} class="size-3" />
    {/snippet}
    Cupertino, CA
  </Chip>

  <Chip color="accent" variant="primary">
    {#snippet startContent()}
      <Icon icon={BadgeCheck} class="size-3" />
    {/snippet}
    Verified
  </Chip>
</div>
