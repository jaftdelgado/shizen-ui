<script lang="ts">
  import { Toggle, ToggleGroup } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-2">
  <ToggleGroup type="multiple" value={["email"]} disabled>
    <Toggle value="email">Email</Toggle>
    <Toggle value="sms">SMS</Toggle>
    <Toggle value="push">Push</Toggle>
  </ToggleGroup>
</div>
