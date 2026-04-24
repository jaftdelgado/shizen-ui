<script lang="ts">
  import { Checkbox, CheckboxGroup, Label, Description } from "@shizen-ui/svelte";

  const digestSections = [
    {
      value: "product",
      label: "Product",
      description: "New features."
    },
    {
      value: "security",
      label: "Security",
      description: "Policy updates."
    },
    {
      value: "billing",
      label: "Billing",
      description: "Invoices and usage."
    }
  ];
</script>

<div class="flex flex-col items-center w-full">
  <CheckboxGroup orientation="horizontal">
    <Label>Weekly Digest</Label>
    <Description>Choose what to include.</Description>

    <CheckboxGroup.Items>
      {#each digestSections as section}
        <CheckboxGroup.Item value={section.value}>
          <Checkbox.Control />
          <Checkbox.Content>
            <Label>{section.label}</Label>
            <Description>{section.description}</Description>
          </Checkbox.Content>
        </CheckboxGroup.Item>
      {/each}
    </CheckboxGroup.Items>
  </CheckboxGroup>
</div>
