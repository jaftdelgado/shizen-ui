<script lang="ts">
  import { Button, ButtonGroup, Tooltip } from "@shizen-ui/svelte";
  import { Tray, GitPullRequestIcon, RepositoryIcon } from "@assets/icons/svelte";
  import type { Component } from "svelte";

  const items: { icon: Component; label: string }[] = [
    { icon: GitPullRequestIcon, label: "Pull Requests" },
    { icon: RepositoryIcon, label: "Repositories" },
    { icon: Tray, label: "Notifications" }
  ];
</script>

<div class="flex items-center justify-center gap-2">
  <ButtonGroup variant="secondary">
    {#each items as { icon: Icon, label } (label)}
      <Tooltip>
        <Tooltip.Trigger>
          <Button iconOnly>
            <Icon />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>{label}</Tooltip.Content>
      </Tooltip>
    {/each}
  </ButtonGroup>
</div>
