<script lang="ts">
  import { Accordion } from "@shizen-ui/svelte";
</script>

<Accordion>
  <Accordion.Item>
    <Accordion.Heading>
      <Accordion.Trigger>
        <!-- Accordion Title -->
        <Accordion.Indicator>
          <!-- Optional -->
        </Accordion.Indicator>
      </Accordion.Trigger>
    </Accordion.Heading>

    <Accordion.Panel>
      <Accordion.Body />
    </Accordion.Panel>
  </Accordion.Item>
</Accordion>
