<script lang="ts">
  import { Tag, TagGroup, Label, Description } from "@shizen-ui/svelte";

  interface Genre {
    label: string;
    value: string;
  }

  let genres: Genre[] = $state([
    { label: "Jazz", value: "jazz" },
    { label: "Hip-hop", value: "hip-hop" },
    { label: "Indie rock", value: "indie-rock" },
    { label: "Electronic", value: "electronic" },
    { label: "R&B", value: "rnb" },
    { label: "Classical", value: "classical" }
  ]);

  function removeGenre(value: string) {
    genres = genres.filter((g) => g.value !== value);
  }
</script>

<div class="flex flex-col gap-4 w-full max-w-xs">
  <TagGroup selectionMode="none">
    <Label>Favorite Genres</Label>
    <Description>Remove genres to keep recommendations relevant.</Description>

    <TagGroup.Items>
      {#each genres as { label, value } (value)}
        <Tag {value} onClose={() => removeGenre(value)}>
          {label}
          <Tag.RemoveButton />
        </Tag>
      {/each}
    </TagGroup.Items>
  </TagGroup>
</div>
