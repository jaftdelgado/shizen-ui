<script lang="ts">
  import { ListBox } from "@shizen-ui/svelte";
</script>

<ListBox aria-label="Project status">
  <ListBox.Item id="todo" textValue="To do">
    <span>To do</span>
    <ListBox.ItemIndicator />
  </ListBox.Item>

  <ListBox.Item id="in-progress" textValue="In progress">
    <span>In progress</span>
    <ListBox.ItemIndicator />
  </ListBox.Item>

  <ListBox.Item id="done" textValue="Done">
    <span>Done</span>
    <ListBox.ItemIndicator />
  </ListBox.Item>
</ListBox>
