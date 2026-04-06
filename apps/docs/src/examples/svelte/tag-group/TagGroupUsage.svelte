<script lang="ts">
  import { Tag, TagGroup, Label, Description } from "@shizen-ui/svelte";

  import Icon from "@assets/Icon.svelte";
  import { Basketball, Bicycle, Golf, Tv, Camera } from "@assets/icons";

  const interests = [
    { label: "Basketball", value: "basketball", icon: Basketball },
    { label: "Bike", value: "cycling", icon: Bicycle },
    { label: "Golf", value: "golf", icon: Golf },
    { label: "Movies & TV", value: "movies-and-tv", icon: Tv },
    { label: "Photography", value: "photography", icon: Camera }
  ];

  let selected: string[] = $state([]);
</script>

<div class="flex max-w-xs">
  <TagGroup selectionMode="multiple" bind:selectedValues={selected}>
    <Label>Choose Interests</Label>
    <Description>Select all interests that apply.</Description>

    <TagGroup.Items>
      {#each interests as { label, value, icon }}
        <Tag {value}>
          {#snippet startContent()}
            <Icon {icon} class="size-3" />
          {/snippet}
          {label}
        </Tag>
      {/each}
    </TagGroup.Items>
  </TagGroup>
</div>
