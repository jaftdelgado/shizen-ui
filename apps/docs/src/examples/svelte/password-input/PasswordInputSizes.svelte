<script lang="ts">
  import { PasswordInput, Label } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-6 w-full max-w-60">
  <div class="flex flex-col gap-1.5">
    <Label for="password-sm">Small</Label>
    <PasswordInput id="password-sm" size="sm" placeholder="Small password">
      <PasswordInput.Toggle />
    </PasswordInput>
  </div>

  <div class="flex flex-col gap-1.5">
    <Label for="password-md">Medium</Label>
    <PasswordInput id="password-md" size="md" placeholder="Medium password">
      <PasswordInput.Toggle />
    </PasswordInput>
  </div>

  <div class="flex flex-col gap-1.5">
    <Label for="password-lg">Large</Label>
    <PasswordInput id="password-lg" size="lg" placeholder="Large password">
      <PasswordInput.Toggle />
    </PasswordInput>
  </div>
</div>
