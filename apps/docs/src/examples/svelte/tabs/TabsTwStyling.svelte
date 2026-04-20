<script lang="ts">
  import { Tabs } from "@shizen-ui/svelte";
</script>

<div class="w-full max-w-xs">
  <Tabs value="overview">
    <Tabs.ListContainer>
      <Tabs.List
        class="[--tabs-indicator-bg:var(--color-accent)] [--tabs-tab-fg-active:var(--color-accent-foreground)] "
      >
        <Tabs.Tab value="overview">
          <Tabs.Separator />
          Overview
        </Tabs.Tab>

        <Tabs.Tab value="activity">
          <Tabs.Separator />
          Activity
        </Tabs.Tab>

        <Tabs.Tab value="members">
          <Tabs.Separator />
          Members
        </Tabs.Tab>
      </Tabs.List>
    </Tabs.ListContainer>
  </Tabs>
</div>
