<script lang="ts">
  import { PasswordInput, Label } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-1.5 w-full max-w-60">
  <Label for="new-password">New password</Label>
  <PasswordInput id="new-password" placeholder="Create password">
    <PasswordInput.Toggle />
  </PasswordInput>
</div>
