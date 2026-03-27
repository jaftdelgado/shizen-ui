<script lang="ts">
  import { Surface, InputGroup, Label } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
</script>

<div class="flex items-center w-full max-w-72">
  <Surface class="p-6">
    <Label>Email</Label>
    <InputGroup>
      <InputGroup.Prefix>
        <Icon name="envelope" />
      </InputGroup.Prefix>
      <InputGroup.Input placeholder="example@mail.com" />
    </InputGroup>
  </Surface>
</div>
