<script lang="ts">
  import { Tag } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <p class="text-sm text-secondary-text">Variants remain consistent when tags are selectable.</p>
    <div class="flex flex-wrap gap-2">
      <Tag variant="default" selectionMode="multiple">Priority</Tag>
      <Tag variant="secondary" selectionMode="multiple">Design</Tag>
      <Tag variant="outline" selectionMode="multiple">Review</Tag>
      <Tag variant="ghost" selectionMode="multiple">Optional</Tag>
    </div>
  </div>
</div>
