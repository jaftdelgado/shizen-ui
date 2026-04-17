<script lang="ts">
  import { PasswordInput } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-4 w-full max-w-60">
  <PasswordInput size="sm" placeholder="Small password" />
  <PasswordInput size="md" placeholder="Medium password" />
  <PasswordInput size="lg" placeholder="Large password" />
</div>
