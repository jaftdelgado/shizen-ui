<script lang="ts">
  import { Checkbox, Label, FieldError } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col">
  <Checkbox invalid={true}>
    <Checkbox.Control />
    <Checkbox.Content>
      <Label>Terms and Conditions</Label>
      <FieldError>You must accept to continue.</FieldError>
    </Checkbox.Content>
  </Checkbox>
</div>
