<script lang="ts">
  import { TextField, Label, Input, Description } from "@shizen-ui/svelte";
</script>

<div class="w-full">
  <TextField fullWidth>
    <Label>Bio</Label>
    <Input placeholder="Tell us about yourself..." />
    <Description>A short description visible on your public profile.</Description>
  </TextField>
</div>
