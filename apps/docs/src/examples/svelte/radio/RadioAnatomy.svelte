<script lang="ts">
  import { RadioGroup, Radio, Label, Description, FieldError } from "@shizen-ui/svelte";
</script>

<RadioGroup>
  <Label>Group Label</Label>
  <Description>Group description text</Description>
  <FieldError>Group error message</FieldError>

  <RadioGroup.Items>
    <Radio value="option1">
      <Radio.Control>
        <Radio.Indicator />
      </Radio.Control>
      <Radio.Content>
        <Label>Option 1</Label>
        <Description>Description for option 1</Description>
      </Radio.Content>
    </Radio>
  </RadioGroup.Items>
</RadioGroup>
