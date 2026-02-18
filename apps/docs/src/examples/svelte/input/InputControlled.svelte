<script>
  import { Input } from "@shizen-ui/svelte";
  let username = $state("");
</script>

<div class="flex flex-col max-w-xs">
  <Input bind:value={username} placeholder="Username" />
</div>
