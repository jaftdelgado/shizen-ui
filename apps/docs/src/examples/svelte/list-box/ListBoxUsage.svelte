<script lang="ts">
  import { ListBox, Surface } from "@shizen-ui/svelte";

  const workspaces = [
    { id: "engineering", label: "Engineering workspace" },
    { id: "design", label: "Design workspace" },
    { id: "growth", label: "Growth workspace" }
  ];
</script>

<div class="w-full max-w-2xs">
  <Surface class="w-full p-2">
    <ListBox aria-label="Workspace" selectedKeys={new Set(["engineering"])}>
      {#each workspaces as workspace (workspace.id)}
        <ListBox.Item id={workspace.id} textValue={workspace.label}>
          <ListBox.ItemLabel>{workspace.label}</ListBox.ItemLabel>
          <ListBox.ItemIndicator />
        </ListBox.Item>
      {/each}
    </ListBox>
  </Surface>
</div>
