<script lang="ts">
  import { Button } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
</script>

<div class="flex items-center gap-2">
  <Button>
    {#snippet startContent()}
      <Icon name="square_brackets_bars_vertical" />
    {/snippet}
    Scan Article
  </Button>

  <Button variant="tertiary">
    {#snippet endContent()}
      <Icon name="folder_arrow_up_in" />
    {/snippet}
    Upload Files
  </Button>
</div>
