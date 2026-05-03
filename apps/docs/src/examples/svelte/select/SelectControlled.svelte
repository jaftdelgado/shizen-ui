<script lang="ts">
  import { Description, Label, Select, Button } from "@shizen-ui/svelte";

  const timezones = [
    { id: "america-new_york", label: "New York (UTC−5)" },
    { id: "america-chicago", label: "Chicago (UTC−6)" },
    { id: "america-denver", label: "Denver (UTC−7)" },
    { id: "america-los_angeles", label: "Los Angeles (UTC−8)" },
    { id: "europe-london", label: "London (UTC+0)" },
    { id: "europe-paris", label: "Paris (UTC+1)" },
    { id: "europe-berlin", label: "Berlin (UTC+1)" },
    { id: "asia-tokyo", label: "Tokyo (UTC+9)" },
    { id: "asia-shanghai", label: "Shanghai (UTC+8)" },
    { id: "australia-sydney", label: "Sydney (UTC+11)" }
  ];

  let selectedKeys = $state(new Set());
</script>

<div class="w-full max-w-60 flex flex-col gap-3">
  <Select placeholder="Select a timezone" bind:selectedKeys>
    <Label>Timezone</Label>
    <Select.Trigger>
      <Select.Value />
      <Select.Indicator />
    </Select.Trigger>
    <Select.Popover>
      <Select.Content>
        {#each timezones as { id, label }}
          <Select.Item {id} textValue={label}>
            {label}
            <Select.ItemIndicator />
          </Select.Item>
        {/each}
      </Select.Content>
    </Select.Popover>
    <Description>Selected value: {[...selectedKeys][0] ?? "none"}</Description>
  </Select>

  <Button
    variant="outline"
    disabled={selectedKeys.size === 0}
    onclick={() => (selectedKeys = new Set())}
  >
    Clear selection
  </Button>
</div>
