<script lang="ts">
  import { PasswordInput } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-4 w-full max-w-60">
  <PasswordInput variant="default" placeholder="Account password" />
  <PasswordInput variant="secondary" placeholder="Workspace password" />
  <PasswordInput variant="outline" placeholder="Admin password" />
</div>
