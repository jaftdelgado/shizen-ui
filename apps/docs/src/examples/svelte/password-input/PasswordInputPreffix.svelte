<script lang="ts">
  import { PasswordInput, Label, Tooltip } from "@shizen-ui/svelte";

  import Icon from "@assets/Icon.svelte";
  import { Lock, InfoCircle } from "@assets/icons";
</script>

<div class="flex flex-col gap-1.5 w-full max-w-60">
  <Label for="new-password">New password</Label>
  <PasswordInput id="new-password" placeholder="Create password">
    <PasswordInput.Prefix>
      <Icon icon={Lock} class="size-4" />
    </PasswordInput.Prefix>
    <PasswordInput.Suffix>
      <Tooltip placement="bottom">
        <Tooltip.Trigger>
          <Icon icon={InfoCircle} class="size-4" />
        </Tooltip.Trigger>
        <Tooltip.Content>At least 8 characters</Tooltip.Content>
      </Tooltip>
    </PasswordInput.Suffix>
  </PasswordInput>
</div>
