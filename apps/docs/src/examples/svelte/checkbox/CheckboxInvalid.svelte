<script lang="ts">
  import { Checkbox, Label, Description } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col">
  <Checkbox invalid={true}>
    <Checkbox.Control />
    <Checkbox.Content>
      <Label>Terms and Conditions</Label>
      <Description>You must accept to continue.</Description>
    </Checkbox.Content>
  </Checkbox>
</div>
