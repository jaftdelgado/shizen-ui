<script lang="ts">
  import { PasswordInput, Label } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-4 w-full max-w-60">
  <div class="flex flex-col gap-1.5">
    <Label for="login-password">Login password</Label>
    <PasswordInput id="login-password" placeholder="Enter password" />
  </div>

  <div class="flex flex-col gap-1.5">
    <Label for="pin-code">PIN code</Label>
    <PasswordInput id="pin-code" placeholder="Enter PIN" />
  </div>
</div>
