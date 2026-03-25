<script lang="ts">
  import { Input, Label } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-1.5 w-full max-w-60">
  <Label for="email">Email</Label>
  <Input id="email" type="email" placeholder="Enter your email" />
</div>
