<script lang="ts">
  import { Description, Label, Select } from "@shizen-ui/svelte";

  const toppings = [
    { id: "mozzarella", label: "Mozzarella" },
    { id: "pepperoni", label: "Pepperoni" },
    { id: "mushrooms", label: "Mushrooms" },
    { id: "bell-peppers", label: "Bell Peppers" },
    { id: "olives", label: "Olives" },
    { id: "onions", label: "Onions" },
    { id: "bacon", label: "Bacon" },
    { id: "spinach", label: "Spinach" },
    { id: "sun-dried-tomatoes", label: "Sun-dried Tomatoes" },
    { id: "jalapenos", label: "Jalapeños" }
  ];

  let selectedKeys = $state(new Set());
</script>

<div class="w-full max-w-60">
  <Select placeholder="Select toppings" selectionMode="multiple" bind:selectedKeys>
    <Label>Pizza toppings</Label>
    <Select.Trigger>
      <Select.Value />
      <Select.Indicator />
    </Select.Trigger>
    <Select.Popover>
      <Select.Content>
        {#each toppings as { id, label }}
          <Select.Item {id} textValue={label}>
            {label}
            <Select.ItemIndicator />
          </Select.Item>
        {/each}
      </Select.Content>
    </Select.Popover>
    <Description>
      Selected: {selectedKeys.size > 0 ? [...selectedKeys].join(", ") : "none"}
    </Description>
  </Select>
</div>
