<script lang="ts">
  import { Toggle, ToggleGroup } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-4">
  <ToggleGroup type="single" value="all" variant="default">
    <Toggle value="all">All</Toggle>
    <Toggle value="open">Open</Toggle>
    <Toggle value="done">Done</Toggle>
  </ToggleGroup>

  <ToggleGroup type="single" value="all" variant="outline">
    <Toggle value="all">All</Toggle>
    <Toggle value="open">Open</Toggle>
    <Toggle value="done">Done</Toggle>
  </ToggleGroup>

  <ToggleGroup type="single" value="all" variant="ghost">
    <Toggle value="all">All</Toggle>
    <Toggle value="open">Open</Toggle>
    <Toggle value="done">Done</Toggle>
  </ToggleGroup>
</div>
