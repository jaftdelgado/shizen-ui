<script lang="ts">
  import { Toggle } from "@shizen-ui/svelte";

  import Icon from "@assets/Icon.svelte";
  import { UserPlus } from "@assets/icons";
</script>

<div class="flex items-center">
  <Toggle>
    {#snippet startContent()}
      <Icon icon={UserPlus} class="size-4" />
    {/snippet}
    Follow
  </Toggle>
</div>
