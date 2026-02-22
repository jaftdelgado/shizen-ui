<script lang="ts">
  import { TextField, Label, Input, Description } from "@shizen-ui/svelte";
</script>

<div class="flex items-center w-full max-w-xs">
  <TextField>
    <Label>Email address</Label>
    <Input placeholder="you@example.com" type="email" />
    <Description>We'll never share your email with anyone.</Description>
  </TextField>
</div>
