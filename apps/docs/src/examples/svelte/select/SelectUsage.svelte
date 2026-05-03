<script lang="ts">
  import { Description, Label, Select } from "@shizen-ui/svelte";

  const languages = [
    { id: "typescript", label: "TypeScript" },
    { id: "rust", label: "Rust" },
    { id: "go", label: "Go" },
    { id: "python", label: "Python" },
    { id: "swift", label: "Swift" },
    { id: "kotlin", label: "Kotlin" }
  ];
</script>

<div class="w-full max-w-60">
  <Select placeholder="Select a language">
    <Label>Programming language</Label>

    <Select.Trigger>
      <Select.Value />
      <Select.Indicator />
    </Select.Trigger>

    <Select.Popover>
      <Select.Content>
        {#each languages as { id, label }}
          <Select.Item {id} textValue={label}>
            {label}
            <Select.ItemIndicator />
          </Select.Item>
        {/each}
      </Select.Content>
    </Select.Popover>

    <Description>Choose your primary programming language</Description>
  </Select>
</div>
