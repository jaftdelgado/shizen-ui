<script lang="ts">
  import { PasswordInput, Label, Description } from "@shizen-ui/svelte";

  let password = $state("");
</script>

<div class="flex flex-col gap-1.5 w-full max-w-60">
  <Label for="account-password">Account password</Label>
  <PasswordInput id="account-password" bind:value={password} placeholder="Create password">
    <PasswordInput.Toggle />
  </PasswordInput>
  <Description>{password ? `${password.length} chars entered` : "Use 12+ chars"}</Description>
</div>
