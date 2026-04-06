<script lang="ts">
  import { Button } from "@shizen-ui/svelte";

  import Icon from "@assets/Icon.svelte";
  import { CloudUpload, Camera } from "@assets/icons";
</script>

<div class="flex items-center gap-2">
  <Button>
    {#snippet startContent()}
      <Icon icon={Camera} class="size-4" />
    {/snippet}
    Open Camera
  </Button>

  <Button variant="tertiary">
    {#snippet endContent()}
      <Icon icon={CloudUpload} class="size-4" />
    {/snippet}
    Upload Files
  </Button>
</div>
