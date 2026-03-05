<script lang="ts">
  import { Checkbox, CheckboxGroup, Label, Description } from "@shizen-ui/svelte";

  let selectedChannels = $state<string[]>(["email"]);

  const notificationChannels = [
    {
      value: "email",
      label: "Email",
      description: "Get updates by email."
    },
    {
      value: "sms",
      label: "SMS",
      description: "Receive alerts by text message."
    },
    {
      value: "push",
      label: "Push",
      description: "Instant app notifications."
    }
  ];
</script>

<div class="flex flex-col gap-4">
  <CheckboxGroup bind:value={selectedChannels}>
    <Label>Notification Preferences</Label>
    <Description>Select how you want to get updates.</Description>

    <CheckboxGroup.Items>
      {#each notificationChannels as channel}
        <CheckboxGroup.Item value={channel.value}>
          <Checkbox.Control />
          <Checkbox.Content>
            <Label>{channel.label}</Label>
            <Description>{channel.description}</Description>
          </Checkbox.Content>
        </CheckboxGroup.Item>
      {/each}
    </CheckboxGroup.Items>
  </CheckboxGroup>

  <Description>
    Selected channels: {selectedChannels.length > 0 ? selectedChannels.join(", ") : "none"}
  </Description>
</div>
