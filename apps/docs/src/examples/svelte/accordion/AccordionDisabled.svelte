<script lang="ts">
  import { Accordion, Surface } from "@shizen-ui/svelte";

  const items = [
    {
      value: "maintenance",
      title: "Maintenance window",
      content:
        "The system will be unavailable for a short maintenance window this Friday night. No action is required from your side."
    },
    {
      value: "sync",
      title: "Data sync status",
      content:
        "Your latest sync completed successfully and all linked devices are up to date. The next sync is scheduled automatically."
    },
    {
      value: "access",
      title: "Access review",
      content:
        "Your account access is temporarily paused while an administrator reviews the request. You will regain access after approval."
    },
    {
      value: "backup",
      title: "Backup retention",
      content:
        "Backups are currently being retained for thirty days and cannot be changed from this screen. Policy updates are handled centrally."
    }
  ];
</script>

<Surface class="w-full max-w-xs">
  <Accordion disabled={true}>
    {#each items as item}
      <Accordion.Item value={item.value}>
        <Accordion.Heading>
          <Accordion.Trigger>
            {item.title}
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>
            {item.content}
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
    {/each}
  </Accordion>
</Surface>
