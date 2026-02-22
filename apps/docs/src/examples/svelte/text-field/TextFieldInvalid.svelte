<script lang="ts">
  import { TextField, Label, Input, Description, FieldError } from "@shizen-ui/svelte";
</script>

<div class="flex items-center w-full max-w-xs">
  <TextField invalid>
    <Label>Username</Label>
    <Input placeholder="Pick a username" value="taken_user" />
    <Description>Choose a unique username for your account.</Description>
    <FieldError>This username is already taken.</FieldError>
  </TextField>
</div>
