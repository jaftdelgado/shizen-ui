<script lang="ts">
  import { Button } from "@shizen-ui/svelte";

  import Icon from "@assets/Icon.svelte";
  import { Trash, PagePlusIn, MoreVert } from "@assets/icons";
</script>

<div class="flex items-center gap-2">
  <Button iconOnly>
    <Icon icon={PagePlusIn} />
  </Button>

  <Button variant="tertiary" iconOnly>
    <Icon icon={MoreVert} />
  </Button>

  <Button variant="danger" iconOnly>
    <Icon icon={Trash} />
  </Button>
</div>
