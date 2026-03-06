<script lang="ts">
  import { InputGroup, Label, Description } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";

  let email = $state("");
</script>

<div class="flex items-center w-full max-w-64">
  <div class="flex flex-col gap-1.5">
    <Label>Email</Label>
    <InputGroup>
      <InputGroup.Prefix>
        <Icon name="envelope" />
      </InputGroup.Prefix>

      <InputGroup.Input bind:value={email} placeholder="example@mail.com" />
    </InputGroup>

    <Description>
      {email.length > 0 ? `Sending to: ${email}` : "Please enter a valid business email address."}
    </Description>
  </div>
</div>
