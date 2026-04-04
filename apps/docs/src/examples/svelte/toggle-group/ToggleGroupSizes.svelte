<script lang="ts">
  import { Toggle, ToggleGroup } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-4">
  <ToggleGroup type="single" value="day" size="sm">
    <Toggle value="day">Day</Toggle>
    <Toggle value="week">Week</Toggle>
    <Toggle value="month">Month</Toggle>
  </ToggleGroup>

  <ToggleGroup type="single" value="day" size="md">
    <Toggle value="day">Day</Toggle>
    <Toggle value="week">Week</Toggle>
    <Toggle value="month">Month</Toggle>
  </ToggleGroup>

  <ToggleGroup type="single" value="day" size="lg">
    <Toggle value="day">Day</Toggle>
    <Toggle value="week">Week</Toggle>
    <Toggle value="month">Month</Toggle>
  </ToggleGroup>
</div>
