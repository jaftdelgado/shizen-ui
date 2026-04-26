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

    <Tabs.Content>
      <Tabs.View value="overview">
        <div class="space-y-1">
          <p class="text-sm font-medium text-primary-text">Project summary</p>
          <p class="text-sm text-secondary-text">
            Launch is on track. Final QA starts next Monday.
          </p>
        </div>
      </Tabs.View>

      <Tabs.View value="activity">
        <div class="space-y-1">
          <p class="text-sm font-medium text-primary-text">Recent activity</p>
          <p class="text-sm text-secondary-text">
            3 tasks completed today. 1 item is pending review.
          </p>
        </div>
      </Tabs.View>

      <Tabs.View value="members">
        <div class="space-y-1">
          <p class="text-sm font-medium text-primary-text">Team members</p>
          <p class="text-sm text-secondary-text">
            5 contributors assigned to design, docs, and frontend.
          </p>
        </div>
      </Tabs.View>
    </Tabs.Content>
  </Tabs>
</div>
