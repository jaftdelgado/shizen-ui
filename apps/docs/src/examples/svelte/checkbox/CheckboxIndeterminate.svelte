<script lang="ts">
  import { Checkbox, Label, Description } from "@shizen-ui/svelte";

  type Permission = "read" | "write" | "delete";

  const permissions: { value: Permission; label: string; description: string }[] = [
    { value: "read", label: "Read", description: "View files and folders" },
    { value: "write", label: "Write", description: "Create and edit content" },
    { value: "delete", label: "Delete", description: "Permanently remove items" }
  ];

  let selected = $state<Permission[]>([]);

  const allChecked = $derived(selected.length === permissions.length);
  const someChecked = $derived(selected.length > 0 && !allChecked);

  function toggleAll() {
    selected = allChecked ? [] : permissions.map((p) => p.value);
  }

  function toggle(value: Permission) {
    selected = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
  }
</script>

<div class="flex flex-col gap-2">
  <Checkbox checked={allChecked} indeterminate={someChecked} onCheckedChange={toggleAll}>
    <Checkbox.Control />
    <Checkbox.Content>
      <Label>All permissions</Label>
      <Description>Grant full access to this resource</Description>
    </Checkbox.Content>
  </Checkbox>

  <div class="flex flex-col gap-2 pl-4 ml-2">
    {#each permissions as permission}
      <Checkbox
        checked={selected.includes(permission.value)}
        onCheckedChange={() => toggle(permission.value)}
      >
        <Checkbox.Control />
        <Checkbox.Content>
          <Label>{permission.label}</Label>
          <Description>{permission.description}</Description>
        </Checkbox.Content>
      </Checkbox>
    {/each}
  </div>
</div>
