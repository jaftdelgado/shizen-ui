<script lang="ts">
  import { Button, ButtonGroup } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
</script>

<div class="flex items-center justify-center p-4">
  <ButtonGroup variant="secondary" orientation="vertical">
    <Button iconOnly>
      <Icon name="person" />
    </Button>

    <Button iconOnly>
      <Icon name="tray" />
    </Button>

    <Button iconOnly>
      <Icon name="gear" />
    </Button>
  </ButtonGroup>
</div>
