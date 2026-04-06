<script lang="ts">
  import { Button, ButtonGroup, Tooltip } from "@shizen-ui/svelte";

  import Icon from "@assets/Icon.svelte";
  import { MessageText, GitPullRequest, Repository } from "@assets/icons";

  const items = [
    { icon: GitPullRequest, label: "Pull Requests" },
    { icon: Repository, label: "Repositories" },
    { icon: MessageText, label: "Messages" }
  ];
</script>

<div class="flex items-center justify-center gap-2">
  <ButtonGroup variant="secondary">
    {#each items as { icon, label } (label)}
      <Tooltip>
        <Tooltip.Trigger>
          <Button iconOnly>
            <Icon {icon} class="size-4" />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>{label}</Tooltip.Content>
      </Tooltip>
    {/each}
  </ButtonGroup>
</div>
