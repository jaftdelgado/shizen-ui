<script lang="ts">
  import { RadioGroup, Radio, Label, Description } from "@shizen-ui/svelte";

  let selected = $state("mentions");

  const options = [
    {
      value: "all",
      label: "All messages",
      description: "Notifications for every new activity."
    },
    {
      value: "mentions",
      label: "Mentions only",
      description: "Only alerts for @mentions and DMs."
    },
    {
      value: "muted",
      label: "Muted",
      description: "No alerts, badges only."
    }
  ];
</script>

<div class="flex flex-col gap-6">
  <RadioGroup bind:value={selected}>
    <Label>Notification Preferences</Label>
    <Description>Choose how you want to be alerted about new activity.</Description>

    <RadioGroup.Items>
      {#each options as option}
        <Radio value={option.value}>
          <Radio.Control />
          <Radio.Content>
            <Label>{option.label}</Label>
            <Description>{option.description}</Description>
          </Radio.Content>
        </Radio>
      {/each}
    </RadioGroup.Items>
  </RadioGroup>

  <Description>
    Selected notification level: {selected}
  </Description>
</div>
