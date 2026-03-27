<script lang="ts">
  import { Surface, Input, Label } from "@shizen-ui/svelte";
</script>

<div class="flex items-center w-full max-w-72">
  <Surface class="p-6">
    <Label for="email">Email</Label>
    <Input id="email" type="email" placeholder="Enter your email" />
  </Surface>
</div>
