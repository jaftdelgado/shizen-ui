<script lang="ts">
  import { TextField, Label, Input, Description } from "@shizen-ui/svelte";
</script>

<div class="flex items-center w-full max-w-xs">
  <TextField required>
    <Label>Full name</Label>
    <Input placeholder="John Doe" />
    <Description>Enter your legal full name.</Description>
  </TextField>
</div>
