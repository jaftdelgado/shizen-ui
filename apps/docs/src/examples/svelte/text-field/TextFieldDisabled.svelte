<script lang="ts">
  import { TextField, Label, Input, Description } from "@shizen-ui/svelte";
</script>

<div class="flex items-center max-w-72">
  <TextField disabled>
    <Label>Account email</Label>
    <Input placeholder="you@example.com" value="locked@example.com" />
    <Description>Your email cannot be changed at this time.</Description>
  </TextField>
</div>
