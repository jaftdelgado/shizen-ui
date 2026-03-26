<script lang="ts">
  import { InputGroup } from "@shizen-ui/svelte";
  import { SearchIcon } from "@assets/icons/svelte";
</script>

<div class="flex flex-col gap-4 w-full max-w-60">
  <InputGroup size="sm">
    <InputGroup.Prefix>
      <SearchIcon class="size-4" />
    </InputGroup.Prefix>
    <InputGroup.Input placeholder="Small" />
  </InputGroup>

  <InputGroup size="md">
    <InputGroup.Prefix>
      <SearchIcon class="size-4" />
    </InputGroup.Prefix>
    <InputGroup.Input placeholder="Medium" />
  </InputGroup>

  <InputGroup size="lg">
    <InputGroup.Prefix>
      <SearchIcon class="size-5" />
    </InputGroup.Prefix>
    <InputGroup.Input placeholder="Large" />
  </InputGroup>
</div>
