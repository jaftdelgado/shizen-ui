<script>
  import { Input, Label, Description } from "@shizen-ui/svelte";
  let domain = $state("");
</script>

<div class="flex flex-col w-full max-w-64 gap-1.5">
  <Label>Domain</Label>
  <Input bind:value={domain} placeholder="Enter your domain" />
  <Description>https://{domain}</Description>
</div>
