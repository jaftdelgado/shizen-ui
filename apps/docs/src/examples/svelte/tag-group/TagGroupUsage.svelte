<script lang="ts">
  import { Tag, TagGroup, Label, Description } from "@shizen-ui/svelte";
  import { BasketballIcon, BycicleIcon, GolfIcon, TvIcon, CameraIcon } from "@assets/icons/svelte";

  import type { Component } from "svelte";

  interface Interest {
    label: string;
    value: string;
    icon: Component<{ class?: string }>;
  }

  const interests: Interest[] = [
    { label: "Basketball", value: "basketball", icon: BasketballIcon },
    { label: "Cycling", value: "cycling", icon: BycicleIcon },
    { label: "Golf", value: "golf", icon: GolfIcon },
    { label: "Movies & TV", value: "movies-and-tv", icon: TvIcon },
    { label: "Photography", value: "photography", icon: CameraIcon }
  ];

  let selected: string[] = $state([]);
</script>

<div class="flex max-w-xs">
  <TagGroup selectionMode="multiple" bind:selectedValues={selected}>
    <Label>Choose Interests</Label>
    <Description>Select all interests that apply.</Description>

    <TagGroup.Items>
      {#each interests as { label, value, icon: Icon }}
        <Tag {value}>
          {#snippet startContent()}
            <Icon class="size-3" />
          {/snippet}
          {label}
        </Tag>
      {/each}
    </TagGroup.Items>
  </TagGroup>
</div>
