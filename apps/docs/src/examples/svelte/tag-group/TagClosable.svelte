<script lang="ts">
  import { Tag, Description } from "@shizen-ui/svelte";

  let recipients = $state(["Ari", "Mia", "Noah", "Jules"]);

  function removeRecipient(name: string) {
    recipients = recipients.filter((recipient) => recipient !== name);
  }
</script>

<div class="flex flex-col gap-4">
  <Description>Remove recipients while preparing a campaign.</Description>

  <div class="flex flex-wrap gap-2">
    {#each recipients as recipient (recipient)}
      <Tag closable onClose={() => removeRecipient(recipient)}>
        {recipient}
      </Tag>
    {/each}
  </div>

  <Description>{recipients.length} recipients selected.</Description>
</div>
