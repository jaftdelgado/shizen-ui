<script lang="ts">
  import { TextField, Label, Input, Description, FieldError } from "@shizen-ui/svelte";

  let username = $state("");

  const MAX_CHARS = 10;
  const isInvalid = $derived(username.length > MAX_CHARS);
</script>

<div class="flex items-center w-full max-w-72">
  <TextField invalid={isInvalid}>
    <Label>Username</Label>
    <Input bind:value={username} placeholder="Enter your username" />
    <Description>Maximum {MAX_CHARS} characters ({username.length}/{MAX_CHARS}).</Description>
    <FieldError>
      The username cannot exceed {MAX_CHARS} characters.
    </FieldError>
  </TextField>
</div>
