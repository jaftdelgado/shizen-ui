<script lang="ts">
  import { Input, Label } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-1.5">
  <Label for="username">Username</Label>
  <Input id="username" value="@johndoe" placeholder="Username" disabled={true} />
</div>
