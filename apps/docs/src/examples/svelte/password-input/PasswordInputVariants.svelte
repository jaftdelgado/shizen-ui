<script lang="ts">
  import { PasswordInput, Label } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-6 w-full max-w-60">
  <div class="flex flex-col gap-1.5">
    <Label for="password-default">Default</Label>
    <PasswordInput id="password-default" variant="default" placeholder="Default password" />
  </div>

  <div class="flex flex-col gap-1.5">
    <Label for="password-secondary">Secondary</Label>
    <PasswordInput id="password-secondary" variant="secondary" placeholder="Secondary password" />
  </div>

  <div class="flex flex-col gap-1.5">
    <Label for="password-outline">Outline</Label>
    <PasswordInput id="password-outline" variant="outline" placeholder="Outline password" />
  </div>
</div>
