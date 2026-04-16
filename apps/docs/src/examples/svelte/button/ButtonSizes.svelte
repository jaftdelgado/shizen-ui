<script lang="ts">
  import { Button } from "@shizen-ui/svelte";
  import Icon from "@assets/Icon.svelte";
  import { Plus } from "@assets/icons";
</script>

<div class="flex flex-col gap-8">
  <div class="flex items-center gap-3">
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </div>

  <div class="flex items-center gap-3">
    <Button size="sm" iconOnly aria-label="Small">
      {#snippet children()}
        <Icon icon={Plus} />
      {/snippet}
    </Button>
    <Button size="md" iconOnly aria-label="Medium">
      {#snippet children()}
        <Icon icon={Plus} />
      {/snippet}
    </Button>
    <Button size="lg" iconOnly aria-label="Large">
      {#snippet children()}
        <Icon icon={Plus} />
      {/snippet}
    </Button>
  </div>
</div>
