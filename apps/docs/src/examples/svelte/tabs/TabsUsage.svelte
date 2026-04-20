<script lang="ts">
  import { Tabs } from "@shizen-ui/svelte";
</script>

<div class="w-full max-w-xs">
  <Tabs value="overview">
    <Tabs.ListContainer>
      <Tabs.List aria-label="Project sections">
        <Tabs.Tab value="overview">
          <Tabs.Separator />

          Overview
          <Tabs.Indicator />
        </Tabs.Tab>

        <Tabs.Tab value="activity">
          <Tabs.Separator />
          Activity
          <Tabs.Indicator />
        </Tabs.Tab>

        <Tabs.Tab value="members">
          <Tabs.Separator />
          Members
          <Tabs.Indicator />
        </Tabs.Tab>
      </Tabs.List>
    </Tabs.ListContainer>

    <Tabs.Panel value="overview">
      <div class="space-y-1">
        <p class="text-sm font-medium text-primary-text">Project summary</p>
        <p class="text-sm text-secondary-text">Launch is on track. Final QA starts next Monday.</p>
      </div>
    </Tabs.Panel>

    <Tabs.Panel value="activity">
      <div class="space-y-1">
        <p class="text-sm font-medium text-primary-text">Recent activity</p>
        <p class="text-sm text-secondary-text">
          3 tasks completed today. 1 item is pending review.
        </p>
      </div>
    </Tabs.Panel>

    <Tabs.Panel value="members">
      <div class="space-y-1">
        <p class="text-sm font-medium text-primary-text">Team members</p>
        <p class="text-sm text-secondary-text">
          5 contributors assigned to design, docs, and frontend.
        </p>
      </div>
    </Tabs.Panel>
  </Tabs>
</div>
