<script lang="ts">
  import { TextField, Label } from "@shizen-ui/svelte";
  import { InputGroup } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";
</script>

<div class="flex items-center w-full max-w-76">
  <TextField>
    <Label>Email</Label>
    <InputGroup>
      <InputGroup.Prefix>
        <Icon name="envelope" />
      </InputGroup.Prefix>
      <InputGroup.Input placeholder="example@mail.com" />
    </InputGroup>
  </TextField>
</div>
