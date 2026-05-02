<script lang="ts">
  import { ListBox } from "@shizen-ui/svelte";
</script>

<div class="w-full max-w-sm rounded-2xl border border-separator p-2">
  <ListBox
    aria-label="Theme preset"
    class="
      gap-1
      [&_.list-box-item]:rounded-xl
      [&_.list-box-item]:px-3
      [&_.list-box-item]:py-2
      [&_.list-box-item]:font-medium
      [&_.list-box-item[data-selected]]:[--listbox-item-bg:var(--color-accent)]
      [&_.list-box-item[data-selected]]:[--listbox-item-fg:var(--color-accent-foreground)]
      [&_.list-box-item__indicator]:text-current
    "
    selectedKeys={new Set(["balanced"])}
  >
    <ListBox.Item id="minimal" textValue="Minimal">
      <ListBox.ItemLabel>Minimal</ListBox.ItemLabel>
      <ListBox.ItemIndicator />
    </ListBox.Item>

    <ListBox.Item id="balanced" textValue="Balanced">
      <ListBox.ItemLabel>Balanced</ListBox.ItemLabel>
      <ListBox.ItemIndicator />
    </ListBox.Item>

    <ListBox.Item id="bold" textValue="Bold">
      <ListBox.ItemLabel>Bold</ListBox.ItemLabel>
      <ListBox.ItemIndicator />
    </ListBox.Item>
  </ListBox>
</div>
