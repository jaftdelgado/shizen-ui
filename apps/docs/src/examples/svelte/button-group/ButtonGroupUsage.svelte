<script lang="ts">
  import { Button, ButtonGroup } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
</script>

<div class="flex items-center justify-center gap-2">
  <ButtonGroup variant="secondary">
    <Button iconOnly>
      <Icon name="arrow_left" />
    </Button>

    <Button iconOnly>
      <Icon name="arrow_right" />
    </Button>
  </ButtonGroup>

  <ButtonGroup>
    <Button>Years</Button>
    <Button>Months</Button>
    <Button>Days</Button>
    <Button iconOnly>
      <Icon name="ellipsis" />
    </Button>
  </ButtonGroup>
</div>
