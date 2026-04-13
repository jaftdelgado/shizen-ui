<script lang="ts">
  import { Accordion, Surface } from "@shizen-ui/svelte";

  import Icon from "@assets/Icon.svelte";
  import { Plus, Minus, Delivery, UndoCircle, CreditCard, ShieldAlert } from "@assets/icons";

  const items = [
    {
      value: "shipping",
      title: "Shipping and delivery",
      icon: Delivery,
      content:
        "Orders are processed within 1-2 business days. Standard shipping takes 5-7 days, expedited options are available at checkout."
    },
    {
      value: "returns",
      title: "Returns and refunds",
      icon: UndoCircle,
      content:
        "You have 30 days to return any item in its original condition. Refunds are issued to the original payment method within 5 business days."
    },
    {
      value: "payment",
      title: "Payment methods",
      icon: CreditCard,
      content:
        "We accept all major credit cards, PayPal, and Apple Pay. All transactions are encrypted and processed securely through Stripe."
    },
    {
      value: "warranty",
      title: "Warranty and support",
      icon: ShieldAlert,
      content:
        "Every product includes a 12-month warranty against manufacturing defects. Contact our support team to file a claim anytime."
    }
  ];
</script>

<Surface class="w-full max-w-xs">
  <Accordion>
    {#each items as item}
      <Accordion.Item value={item.value}>
        <Accordion.Heading>
          <Accordion.Trigger>
            <Icon icon={item.icon} class="size-4 shrink-0 text-secondary-text" />
            {item.title}
            <Accordion.Indicator class="transition-none rotate-0">
              {#snippet children({ isOpen }: { isOpen: boolean })}
                {#if isOpen}
                  <Icon icon={Minus} class="size-4" />
                {:else}
                  <Icon icon={Plus} class="size-4" />
                {/if}
              {/snippet}
            </Accordion.Indicator>
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
