<script lang="ts">
  import { Accordion, Surface } from "@shizen-ui/svelte";

  const items = [
    {
      value: "overview",
      title: "Plan overview",
      content:
        "Your current plan includes unlimited projects, priority support, and access to all integrations. Billing resets on the first of each month."
    },
    {
      value: "usage",
      title: "Usage and limits",
      content:
        "You have used 3 of 10 available seats this billing cycle. Storage usage stands at 24 GB out of your 100 GB allocation."
    },
    {
      value: "billing",
      title: "Billing and invoices",
      content:
        "Your next invoice of $49.00 will be charged on May 1st. All past invoices are available for download from the billing portal."
    },
    {
      value: "cancellation",
      title: "Cancellation policy",
      content:
        "You can cancel your subscription at any time. Access remains active until the end of the current billing period with no partial refunds."
    }
  ];
</script>

<Surface class="w-full max-w-xs">
  <Accordion>
    {#each items as item}
      <Accordion.Item value={item.value} disabled={item.value === "billing"}>
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
