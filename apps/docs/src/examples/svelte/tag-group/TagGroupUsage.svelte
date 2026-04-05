<script lang="ts">
  import { Tag } from "@shizen-ui/svelte";
  import {
    BasketballIcon,
    BycicleIcon,
    GolfIcon,
    TvIcon,
    VideoCameraIcon
  } from "@assets/icons/svelte";

  import type { Component } from "svelte";

  interface Interest {
    label: string;
    icon: Component<{ class?: string }>;
  }

  const interests: Interest[] = [
    { label: "Basketball", icon: BasketballIcon },
    { label: "Cycling", icon: BycicleIcon },
    { label: "Golf", icon: GolfIcon },
    { label: "Streaming", icon: TvIcon },
    { label: "Photography", icon: VideoCameraIcon }
  ];
</script>

<div class="flex flex-wrap items-center gap-2">
  {#each interests as { label, icon: Icon }}
    <Tag>
      {#snippet startContent()}
        <Icon class="size-3" />
      {/snippet}
      {label}
    </Tag>
  {/each}
</div>
