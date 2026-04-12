<script lang="ts">
  import { Accordion, Surface, Button, ButtonGroup } from "@shizen-ui/svelte";

  import Icon from "@assets/Icon.svelte";
  import { NavArrowUp, NavArrowDown, Xmark } from "@assets/icons";

  const items = [
    {
      value: "diagnosis",
      title: "Diagnosis and symptoms",
      content:
        "Review your reported symptoms, diagnostic history, and any flags raised during your last consultation with your care team."
    },
    {
      value: "medications",
      title: "Current medications",
      content:
        "View your active prescriptions, dosage schedules, and any interactions flagged by your pharmacist or primary physician."
    },
    {
      value: "appointments",
      title: "Upcoming appointments",
      content:
        "Check your scheduled visits, request reschedules, and review pre-appointment instructions sent by your healthcare provider."
    },
    {
      value: "results",
      title: "Lab results",
      content:
        "Access your most recent blood work, imaging reports, and other diagnostic results shared by your medical team."
    }
  ];

  const itemValues = items.map((item) => item.value);

  let selectedValue = $state<string>("diagnosis");

  function selectPrevious(): void {
    const index = itemValues.indexOf(selectedValue);
    if (index > 0) selectedValue = itemValues[index - 1];
  }

  function selectNext(): void {
    const index = itemValues.indexOf(selectedValue);
    if (index < itemValues.length - 1) selectedValue = itemValues[index + 1];
  }

  function clear(): void {
    selectedValue = "";
  }

  const isPrevDisabled = $derived(itemValues.indexOf(selectedValue) <= 0);
  const isNextDisabled = $derived(itemValues.indexOf(selectedValue) >= itemValues.length - 1);
</script>

<div class="flex flex-col gap-4 w-full max-w-xs">
  <div class="flex items-center justify-between gap-2">
    <p class="text-sm text-secondary-text">
      Expanded: <span class="text-primary-text">{selectedValue || "none"}</span>
    </p>
    <div class="flex items-center gap-2">
      <ButtonGroup size="sm" variant="tertiary">
        <Button iconOnly onclick={selectPrevious} disabled={isPrevDisabled}>
          <Icon icon={NavArrowUp} class="size-4" />
        </Button>
        <Button iconOnly onclick={selectNext} disabled={isNextDisabled}>
          <Icon icon={NavArrowDown} class="size-4" />
        </Button>
      </ButtonGroup>

      <Button size="sm" variant="danger" iconOnly onclick={clear} disabled={!selectedValue}>
        <Icon icon={Xmark} class="size-4" />
      </Button>
    </div>
  </div>

  <Surface>
    <Accordion value={selectedValue}>
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
</div>
