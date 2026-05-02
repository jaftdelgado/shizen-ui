<script lang="ts">
  import { Description, ListBox, Surface } from "@shizen-ui/svelte";

  let selectedFilters = $state(new Set<string>(["images", "articles"]));

  const filters = [
    { id: "images", label: "Images" },
    { id: "videos", label: "Videos" },
    { id: "articles", label: "Articles" },
    { id: "comments", label: "Comments" }
  ];
</script>

<div class="flex w-full max-w-2xs flex-col gap-6">
  <Surface class="w-full p-2">
    <ListBox
      aria-label="Content filters"
      selectionMode="multiple"
      bind:selectedKeys={selectedFilters}
    >
      {#each filters as filter (filter.id)}
        <ListBox.Item id={filter.id} textValue={filter.label}>
          <ListBox.ItemLabel>{filter.label}</ListBox.ItemLabel>
          <ListBox.ItemIndicator />
        </ListBox.Item>
      {/each}
    </ListBox>
  </Surface>

  <Description>
    Selected filters: {Array.from(selectedFilters).join(", ") || "none"}
  </Description>
</div>
