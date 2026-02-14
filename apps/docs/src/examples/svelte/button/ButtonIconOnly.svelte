<script lang="ts">
  import { Button } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
</script>

<div class="flex items-center gap-2">
  <Button iconOnly>
    <Icon name="paper_plane" />
  </Button>

  <Button variant="tertiary" iconOnly>
    <Icon name="ellipsis" />
  </Button>

  <Button variant="danger" iconOnly>
    <Icon name="trash_bin" />
  </Button>
</div>
