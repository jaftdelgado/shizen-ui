<script lang="ts">
  import { Tag, TagGroup, Label, Description } from "@shizen-ui/svelte";
  import type { TagVariants } from "@shizen-ui/styles";

  const sizes: { value: TagVariants["size"]; label: string }[] = [
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium (default)" },
    { value: "lg", label: "Large" }
  ];

  const tags = [
    { label: "Svelte", value: "svelte" },
    { label: "Vue", value: "vue" },
    { label: "Astro", value: "astro" },
    { label: "React", value: "react" }
  ];
</script>

<div class="flex flex-col gap-6">
  {#each sizes as { value: size, label: sizeLabel }}
    <TagGroup {size}>
      <Label>{sizeLabel}</Label>
      <TagGroup.Items>
        {#each tags as { label, value }}
          <Tag {value}>{label}</Tag>
        {/each}
      </TagGroup.Items>
    </TagGroup>
  {/each}
</div>
