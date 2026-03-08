<script lang="ts">
  import { Checkbox, Label, Description } from "@shizen-ui/svelte";

  let items = $state([
    {
      checked: false,
      label: "Add email notifications",
      description: "Receive email updates and alerts"
    },
    {
      checked: false,
      label: "Add calendar reminders",
      description: "Get calendar reminders for events"
    },
    {
      checked: false,
      label: "Add task to dashboard",
      description: "Show task on your dashboard"
    },
    {
      checked: false,
      label: "Add item to favorites",
      description: "Quick access from favorites"
    }
  ]);
</script>

<div class="flex flex-col gap-4">
  {#each items as item}
    <Checkbox bind:checked={item.checked}>
      <Checkbox.Control>
        <Checkbox.Indicator>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="flex-center items-center size-3 text-accent-foreground"
          >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
        </Checkbox.Indicator>
      </Checkbox.Control>

      <Checkbox.Content>
        <Label>{item.label}</Label>
        <Description>{item.description}</Description>
      </Checkbox.Content>
    </Checkbox>
  {/each}
</div>
