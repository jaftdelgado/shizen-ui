<script lang="ts">
  import { ListBox } from "@shizen-ui/svelte";
</script>

<ListBox aria-label="Project status">
  <ListBox.Item id="todo" textValue="To do">
    <ListBox.ItemLabel>To do</ListBox.ItemLabel>
    <ListBox.ItemIndicator />
  </ListBox.Item>

  <ListBox.Item id="in-progress" textValue="In progress">
    <ListBox.ItemLabel>In progress</ListBox.ItemLabel>
    <ListBox.ItemIndicator />
  </ListBox.Item>

  <ListBox.Item id="done" textValue="Done">
    <ListBox.ItemLabel>Done</ListBox.ItemLabel>
    <ListBox.ItemIndicator />
  </ListBox.Item>
</ListBox>
