<script lang="ts">
  import { Card } from "@shizen-ui/svelte";

  const variants = [
    {
      variant: "default",
      title: "Default",
      description: "Best for standard dashboard content and neutral summaries."
    },
    {
      variant: "secondary",
      title: "Secondary",
      description: "Useful for supporting details inside denser layouts."
    },
    {
      variant: "tertiary",
      title: "Tertiary",
      description: "Good when the card should stay visually quiet in a larger surface."
    },
    {
      variant: "transparent",
      title: "Transparent",
      description: "Helps group content without adding another heavy container."
    }
  ] as const;
</script>

<div class="grid gap-4 md:grid-cols-2">
  {#each variants as item}
    <Card variant={item.variant} class="w-full">
      <Card.Header>
        <Card.Title>{item.title} card</Card.Title>
        <Card.Description>{item.description}</Card.Description>
      </Card.Header>

      <Card.Content>
        <p class="text-sm leading-6 text-secondary-text">
          A quarterly operations update can live here with metrics, notes, or a short summary of
          what changed this week.
        </p>
      </Card.Content>
    </Card>
  {/each}
</div>
