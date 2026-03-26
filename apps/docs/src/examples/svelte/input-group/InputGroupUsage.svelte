<script lang="ts">
  import { InputGroup, Label } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
</script>

<div class="flex flex-col gap-1.5 w-full max-w-60">
  <Label>Email</Label>
  <InputGroup>
    <InputGroup.Prefix>
      <Icon name="envelope" />
    </InputGroup.Prefix>
    <InputGroup.Input placeholder="example@mail.com" />
  </InputGroup>
</div>
