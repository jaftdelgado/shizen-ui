<script lang="ts">
  import { Tabs } from "@shizen-ui/svelte";

  import Icon from "@assets/Icon.svelte";
  import { Compass, ReportColumns, ChatLines } from "@assets/icons";
</script>

<div class="flex flex-center">
  <Tabs value="dashboard">
    <Tabs.ListContainer>
      <Tabs.List iconOnly={true} aria-label="Navigation">
        <Tabs.Tab value="dashboard">
          <Icon icon={Compass} />
          <Tabs.Indicator />
        </Tabs.Tab>

        <Tabs.Tab value="messages">
          <Tabs.Separator />
          <Icon icon={ChatLines} />
          <Tabs.Indicator />
        </Tabs.Tab>

        <Tabs.Tab value="settings">
          <Tabs.Separator />
          <Icon icon={ReportColumns} />
          <Tabs.Indicator />
        </Tabs.Tab>
      </Tabs.List>
    </Tabs.ListContainer>
  </Tabs>
</div>
