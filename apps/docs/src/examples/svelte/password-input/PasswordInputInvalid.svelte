<script lang="ts">
  import { PasswordInput, Label, FieldError } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-1.5">
  <Label for="signup-password">Password</Label>
  <PasswordInput id="signup-password" value="12345" placeholder="Create password" invalid={true} />
  <FieldError>Use at least 8 chars.</FieldError>
</div>
