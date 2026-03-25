<script lang="ts">
  import { Input, Label, FieldError } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-1.5">
  <Label for="phone">Phone number</Label>
  <Input
    id="phone"
    value="+1 555 abc"
    type="tel"
    placeholder="e.g. +1 555 000 0000"
    invalid={true}
  />
  <FieldError>Enter a valid phone number.</FieldError>
</div>
