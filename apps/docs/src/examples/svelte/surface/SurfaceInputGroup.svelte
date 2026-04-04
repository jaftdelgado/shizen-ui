<script lang="ts">
  import { Surface, InputGroup, Label, Description } from "@shizen-ui/svelte";
  import { UserIcon } from "@assets/icons/svelte";
</script>

<div class="flex items-center w-full max-w-72">
  <Surface class="p-6 w-full">
    <div class="flex flex-col gap-1.5">
      <Label>Username</Label>
      <InputGroup>
        <InputGroup.Prefix>
          <UserIcon class="size-4" />
        </InputGroup.Prefix>
        <InputGroup.Input placeholder="@shizenui" />
      </InputGroup>
      <Description>Enter your username.</Description>
    </div>
  </Surface>
</div>
