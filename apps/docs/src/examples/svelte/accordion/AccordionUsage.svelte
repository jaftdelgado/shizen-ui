<script lang="ts">
  import { Accordion, Surface } from "@shizen-ui/svelte";

  import Icon from "@assets/Icon.svelte";
  import { Terminal, Palette, Accessibility, CodeBrackets } from "@assets/icons";

  const items = [
    {
      value: "getting-started",
      title: "Getting started",
      icon: Terminal,
      content:
        "Install the package via npm, import the components you need, and start building. No additional configuration required."
    },
    {
      value: "theming",
      title: "Theming and customization",
      icon: Palette,
      content:
        "Use CSS variables to adjust colors, spacing, and typography. All tokens follow the design system scale."
    },
    {
      value: "accessibility",
      title: "Accessibility",
      icon: Accessibility,
      content:
        "Components are built on semantic HTML with full ARIA support, keyboard navigation, and screen reader compatibility out of the box."
    },
    {
      value: "typescript",
      title: "TypeScript support",
      icon: CodeBrackets,
      content:
        "Every component ships with complete type definitions. Props, variants, and context values are fully typed."
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
