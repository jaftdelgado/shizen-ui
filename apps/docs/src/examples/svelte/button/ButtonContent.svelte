<script lang="ts">
  import { Button } from "@shizen-ui/svelte";
  import { CloudUploadIcon, CameraIcon } from "@assets/icons/svelte";
</script>

<div class="flex items-center gap-2">
  <Button>
    {#snippet startContent()}
      <CameraIcon class="size-4" />
    {/snippet}
    Open Camera
  </Button>

  <Button variant="tertiary">
    {#snippet endContent()}
      <CloudUploadIcon class="size-4" />
    {/snippet}
    Upload Files
  </Button>
</div>
