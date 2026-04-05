<script lang="ts">
  import { Toggle } from "@shizen-ui/svelte";
  import { UserPlusIcon } from "@assets/icons/svelte";
</script>

<div class="flex items-center">
  <Toggle>
    {#snippet startContent()}
      <UserPlusIcon />
    {/snippet}
    Follow
  </Toggle>
</div>
