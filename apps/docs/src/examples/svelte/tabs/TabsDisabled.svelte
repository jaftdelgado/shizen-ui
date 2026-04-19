<script lang="ts">
  import { Tabs } from "@shizen-ui/svelte";
</script>

<div class="w-full max-w-xs">
  <Tabs value="active">
    <Tabs.ListContainer>
      <Tabs.List aria-label="Tab states">
        <Tabs.Tab value="active">
          Active
          <Tabs.Indicator />
        </Tabs.Tab>

        <Tabs.Tab value="disabled" disabled>
          <Tabs.Separator />
          Disabled
          <Tabs.Indicator />
        </Tabs.Tab>

        <Tabs.Tab value="available">
          <Tabs.Separator />
          Available
          <Tabs.Indicator />
        </Tabs.Tab>
      </Tabs.List>
    </Tabs.ListContainer>
  </Tabs>
</div>
