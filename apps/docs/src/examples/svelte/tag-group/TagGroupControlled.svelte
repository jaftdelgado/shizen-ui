<script lang="ts">
  import { Tag, TagGroup, Label, Description } from "@shizen-ui/svelte";
  import {
    FacebookIcon,
    InstagramIcon,
    SnapchatIcon,
    ThreadsIcon,
    TikTokIcon
  } from "@assets/icons/svelte";

  import type { Component } from "svelte";

  interface Platform {
    label: string;
    value: string;
    icon: Component<{ class?: string }>;
  }

  const platforms: Platform[] = [
    { label: "Facebook", value: "facebook", icon: FacebookIcon },
    { label: "Instagram", value: "instagram", icon: InstagramIcon },
    { label: "Snapchat", value: "snapchat", icon: SnapchatIcon },
    { label: "Threads", value: "threads", icon: ThreadsIcon },
    { label: "TikTok", value: "tiktok", icon: TikTokIcon }
  ];

  let selectedValues: string[] = $state(["instagram", "tiktok"]);
</script>

<div class="flex flex-col gap-4 w-full max-w-xs">
  <TagGroup
    selectionMode="multiple"
    {selectedValues}
    onSelectedValuesChange={(values: string[]) => {
      selectedValues = values;
    }}
  >
    <Label>Publish to</Label>
    <Description>Select the platforms where this post will be published.</Description>

    <TagGroup.Items>
      {#each platforms as { label, value, icon: Icon }}
        <Tag {value}>
          {#snippet startContent()}
            <Icon class="size-3" />
          {/snippet}
          {label}
        </Tag>
      {/each}
    </TagGroup.Items>
  </TagGroup>

  <Description>
    {#if selectedValues.length === 0}
      No platforms selected.
    {:else}
      Selected values: {selectedValues.join(", ")}
    {/if}
  </Description>
</div>
