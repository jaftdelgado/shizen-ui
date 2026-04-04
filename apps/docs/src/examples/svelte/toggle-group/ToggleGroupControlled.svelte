<script lang="ts">
  import { Toggle, ToggleGroup, Description, Button } from "@shizen-ui/svelte";

  let channels = $state<string[]>(["email"]);
</script>

<div class="flex flex-col gap-4">
  <ToggleGroup type="multiple" bind:value={channels}>
    <Toggle value="email">Email</Toggle>
    <Toggle value="sms">SMS</Toggle>
    <Toggle value="push">Push</Toggle>
  </ToggleGroup>

  <Description>
    Selected channels: {channels.length ? channels.join(", ") : "None"}
  </Description>

  <div class="flex gap-2">
    <Button size="sm" variant="secondary" onclick={() => (channels = ["email", "sms", "push"])}>
      Select all
    </Button>
    <Button size="sm" variant="secondary" onclick={() => (channels = [])}>Clear</Button>
  </div>
</div>
