<script lang="ts">
  import { Input, Label, Description } from "@shizen-ui/svelte";

  let company = $state("");
</script>

<div class="flex flex-col gap-1.5 w-full max-w-60">
  <Label for="company">Company</Label>
  <Input id="company" bind:value={company} placeholder="e.g. Acme Corp" />
  <Description>
    {company ? `Inviting you to join ${company}` : "Enter your company name"}
  </Description>
</div>
