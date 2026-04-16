<script lang="ts">
  import { Button, Spinner } from "@shizen-ui/svelte";

  import Icon from "@assets/Icon.svelte";
  import { RefreshDouble } from "@assets/icons";

  let isLoading = $state(false);

  async function handleSubmit() {
    isLoading = true;
    await new Promise((resolve) => setTimeout(resolve, 2000));
    isLoading = false;
  }
</script>

<Button loading={isLoading} onclick={handleSubmit}>
  {#snippet startContent()}
    {#if isLoading}
      <Spinner size="sm" />
    {:else}
      <Icon icon={RefreshDouble} />
    {/if}
  {/snippet}

  {isLoading ? "Syncing..." : "Sync changes"}
</Button>
