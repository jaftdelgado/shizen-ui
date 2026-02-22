<script>
  import { Input, Label, FieldError } from "@shizen-ui/svelte";
  let username = $state("");
</script>

<div class="flex flex-col max-w-xs">
  <Label required>Hola</Label>
  <Input bind:value={username} placeholder="Username" />
  <FieldError invalid>https://{username}</FieldError>
</div>
