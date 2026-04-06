<script lang="ts">
  import { Tag, TagGroup, Label, Description } from "@shizen-ui/svelte";

  import Icon from "@assets/Icon.svelte";
  import { Facebook, Instagram, Snapchat, Threads, TikTok } from "@assets/icons";

  const platforms = [
    { label: "Facebook", value: "facebook", icon: Facebook },
    { label: "Instagram", value: "instagram", icon: Instagram },
    { label: "Snapchat", value: "snapchat", icon: Snapchat },
    { label: "Threads", value: "threads", icon: Threads },
    { label: "TikTok", value: "tiktok", icon: TikTok }
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
      {#each platforms as { label, value, icon }}
        <Tag {value}>
          {#snippet startContent()}
            <Icon {icon} class="size-3" />
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
