<script lang="ts">
  import { RadioGroup, Radio, Label, Description } from "@shizen-ui/svelte";
  let selected = $state("basic");
</script>

<div class="flex-center justify-center">
  <RadioGroup bind:value={selected}>
    <Label>Elige una opción</Label>
    <Description>Esta configuración afectará a toda tu cuenta.</Description>

    <Radio value="basic">
      <Radio.Control />
      <Radio.Content>
        <Label>Basic Plan</Label>
        <Description>Includes 100 messages per month</Description>
      </Radio.Content>
    </Radio>

    <Radio value="premium">
      <Radio.Control />
      <Radio.Content>
        <Label>Premium Plan</Label>
        <Description>Includes 200 messages per month</Description>
      </Radio.Content>
    </Radio>

    <Radio value="business">
      <Radio.Control />
      <Radio.Content>
        <Label>Business Plan</Label>
        <Description>Unlimited messages</Description>
      </Radio.Content>
    </Radio>
  </RadioGroup>
</div>
