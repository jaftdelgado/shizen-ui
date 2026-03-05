<script lang="ts">
  import { Checkbox, CheckboxGroup, Label, Description } from "@shizen-ui/svelte";

  const securityLevels = [
    { id: "mfa", name: "Multi-factor authentication", info: "Require a code to sign in." },
    { id: "ip-lock", name: "IP Whitelisting", info: "Restrict access to specific IP ranges." },
    { id: "session", name: "Session Timeout", info: "Automatically log out after inactivity." }
  ];
</script>

<div class="flex flex-col">
  <CheckboxGroup disabled>
    <Label>Advanced Security Settings</Label>
    <Description>Contact your admin to change these policies.</Description>

    <CheckboxGroup.Items>
      {#each securityLevels as policy}
        <CheckboxGroup.Item value={policy.id}>
          <Checkbox.Control />
          <Checkbox.Content>
            <Label>{policy.name}</Label>
            <Description>{policy.info}</Description>
          </Checkbox.Content>
        </CheckboxGroup.Item>
      {/each}
    </CheckboxGroup.Items>
  </CheckboxGroup>
</div>
