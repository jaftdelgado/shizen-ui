<script lang="ts">
  import { Description, Label, Select, Separator } from "@shizen-ui/svelte";

  const modelGroups = [
    {
      group: "Premium",
      models: [
        { id: "claude-opus-4-5", label: "Claude Opus 4.5" },
        { id: "gpt-4o", label: "GPT-4o" }
      ]
    },
    {
      group: "Balanced",
      models: [
        { id: "claude-sonnet-4-5", label: "Claude Sonnet 4.5" },
        { id: "gemini-2-5-flash", label: "Gemini 2.5 Flash" }
      ]
    },
    {
      group: "Fast",
      models: [
        { id: "claude-haiku-4-5", label: "Claude Haiku 4.5" },
        { id: "o4-mini", label: "o4 Mini" }
      ]
    }
  ];
</script>

<div class="w-full max-w-64">
  <Select placeholder="Select a model">
    <Label>AI Model</Label>
    <Select.Trigger>
      <Select.Value />
      <Select.Indicator />
    </Select.Trigger>
    <Select.Popover>
      <Select.Content>
        {#each modelGroups as { group, models }, i}
          <Select.Group>
            <Select.GroupHeader>{group}</Select.GroupHeader>
            {#each models as { id, label }}
              <Select.Item {id} textValue={label}>
                {label}
                <Select.ItemIndicator />
              </Select.Item>
            {/each}
          </Select.Group>
          {#if i < modelGroups.length - 1}
            <Separator class="px-3" />
          {/if}
        {/each}
      </Select.Content>
    </Select.Popover>
    <Description>Models grouped by performance and speed characteristics.</Description>
  </Select>
</div>
