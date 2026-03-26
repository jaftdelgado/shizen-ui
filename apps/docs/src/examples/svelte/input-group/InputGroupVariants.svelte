<script lang="ts">
  import { InputGroup } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
</script>

<div class="flex flex-col gap-4 max-w-sm">
  <InputGroup variant="default">
    <InputGroup.Prefix>
      <Icon name="link" />
    </InputGroup.Prefix>
    <InputGroup.Input placeholder="Default" />
  </InputGroup>

  <InputGroup variant="secondary">
    <InputGroup.Prefix>
      <Icon name="link" />
    </InputGroup.Prefix>
    <InputGroup.Input placeholder="Secondary" />
  </InputGroup>

  <InputGroup variant="outline">
    <InputGroup.Prefix>
      <Icon name="link" />
    </InputGroup.Prefix>
    <InputGroup.Input placeholder="Outline" />
  </InputGroup>
</div>
