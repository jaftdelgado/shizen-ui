<script lang="ts">
  import { Tag, TagGroup, Label, Description } from "@shizen-ui/svelte";
</script>

<TagGroup>
  <Label>Tag Group Label</Label>
  <Description>Tag group description</Description>

  <TagGroup.Items>
    <Tag>
      {#snippet startContent()}{/snippet}
      Tag Label
      {#snippet endContent()}{/snippet}
      <Tag.RemoveButton />
    </Tag>
  </TagGroup.Items>
</TagGroup>
