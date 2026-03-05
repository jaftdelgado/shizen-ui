<script lang="ts">
  import { Checkbox, CheckboxGroup, Label, Description, Button } from "@shizen-ui/svelte";

  const dataOptions = [
    {
      id: "analytics",
      name: "Usage Analytics",
      info: "Help us improve by sharing how you use the app."
    },
    {
      id: "marketing",
      name: "Marketing Preferences",
      info: "Receive personalized offers and newsletters."
    },
    {
      id: "third-party",
      name: "Third-party Sharing",
      info: "Allow data exchange with our verified partners."
    }
  ];

  let selectedData: string[] = [];
  let isInvalid = false;

  function handleSave() {
    isInvalid = selectedData.length === 0;

    if (!isInvalid) {
      console.log("Privacy settings updated:", selectedData);
    }
  }
</script>

<div class="flex flex-col gap-8">
  <CheckboxGroup bind:value={selectedData} invalid={isInvalid}>
    <Label>Data Privacy Settings</Label>
    <Description>Select the data categories you are comfortable sharing.</Description>

    <CheckboxGroup.Items>
      {#each dataOptions as option}
        <CheckboxGroup.Item value={option.id}>
          <Checkbox.Control />
          <Checkbox.Content>
            <Label>{option.name}</Label>
            <Description>{option.info}</Description>
          </Checkbox.Content>
        </CheckboxGroup.Item>
      {/each}
    </CheckboxGroup.Items>
  </CheckboxGroup>

  <Button on:click={handleSave}>Update Privacy Policy</Button>
</div>
