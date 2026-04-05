<script lang="ts">
  import { Tag, TagGroup, Label, Description } from "@shizen-ui/svelte";
  import { Avatar } from "@shizen-ui/svelte";

  const members = [
    { label: "Mia", value: "mia", seed: "Mia" },
    { label: "Aneka", value: "aneka", seed: "Aneka" },
    { label: "Sophia", value: "sophia", seed: "Sophia" },
    { label: "Jakarta", value: "jakarta", seed: "Jakarta" }
  ];

  let assignee: string[] = $state([]);
  let reviewers: string[] = $state([]);
</script>

<div class="flex flex-col gap-8">
  <TagGroup selectionMode="single" bind:selectedValues={assignee}>
    <Label>Assignee</Label>
    <Description>Select one team member to own this task.</Description>
    <TagGroup.Items>
      {#each members as { label, value, seed }}
        <Tag {value}>
          {#snippet startContent()}
            <Avatar class="size-3">
              <Avatar.Image
                src={`https://api.dicebear.com/9.x/glass/svg?seed=${seed}`}
                alt={label}
              />
            </Avatar>
          {/snippet}
          {label}
        </Tag>
      {/each}
    </TagGroup.Items>
  </TagGroup>

  <TagGroup selectionMode="multiple" bind:selectedValues={reviewers}>
    <Label>Reviewers</Label>
    <Description>Select one or more reviewers for this pull request.</Description>
    <TagGroup.Items>
      {#each members as { label, value, seed }}
        <Tag {value}>
          {#snippet startContent()}
            <Avatar class="size-3">
              <Avatar.Image
                src={`https://api.dicebear.com/9.x/glass/svg?seed=${seed}`}
                alt={label}
              />
            </Avatar>
          {/snippet}
          {label}
        </Tag>
      {/each}
    </TagGroup.Items>
  </TagGroup>
</div>
