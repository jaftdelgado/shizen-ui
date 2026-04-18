<script lang="ts">
  import { PasswordInput, Label } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-1.5">
  <Label for="saved-password">Current password</Label>
  <PasswordInput id="saved-password" value="••••••••" placeholder="Current password" disabled={true}>
    <PasswordInput.Toggle />
  </PasswordInput>
</div>
