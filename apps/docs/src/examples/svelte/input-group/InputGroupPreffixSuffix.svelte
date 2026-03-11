<script lang="ts">
  import { InputGroup, Label } from "@shizen-ui/svelte";
  import { Globe } from "@assets/icons/svelte";
</script>

<div class="flex flex-col w-full max-w-64 gap-1.5">
  <Label for="website">Website</Label>
  <InputGroup>
    <InputGroup.Prefix>
      <Globe class="text-secondary-text" />
    </InputGroup.Prefix>
    <InputGroup.Input id="website" placeholder="example.com" />
    <InputGroup.Suffix>
      <span class="text-secondary-text text-sm">.com</span>
    </InputGroup.Suffix>
  </InputGroup>
</div>
