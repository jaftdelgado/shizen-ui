<script lang="ts">
  import { ListBox, Surface } from "@shizen-ui/svelte";
</script>

<div class="w-full max-w-2xs">
  <Surface class="w-full p-2">
    <ListBox aria-label="Workspace" selectedKeys={new Set(["engineering"])}>
      <ListBox.Item id="engineering" textValue="Engineering workspace">
        <span>Engineering workspace</span>
        <ListBox.ItemIndicator />
      </ListBox.Item>

      <ListBox.Item id="design" textValue="Design workspace">
        <span>Design workspace</span>
        <ListBox.ItemIndicator />
      </ListBox.Item>

      <ListBox.Item id="growth" textValue="Growth workspace">
        <span>Growth workspace</span>
        <ListBox.ItemIndicator />
      </ListBox.Item>
    </ListBox>
  </Surface>
</div>
