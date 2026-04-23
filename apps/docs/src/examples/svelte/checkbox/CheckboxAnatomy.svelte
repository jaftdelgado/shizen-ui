<script lang="ts">
  import { Checkbox, Label, Description } from "@shizen-ui/svelte";
</script>

<Checkbox>
  <Checkbox.Control>
    <Checkbox.Indicator>
      <!-- <CustomIndicator: optional /> -->
    </Checkbox.Indicator>
  </Checkbox.Control>

  <Checkbox.Content>
    <Label>Checkbox Label</Label>
    <Description>Checkbox description</Description>
  </Checkbox.Content>
</Checkbox>
