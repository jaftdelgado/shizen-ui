<script lang="ts">
  import { Tabs } from "@shizen-ui/svelte";

  import Icon from "@assets/Icon.svelte";
  import { DesignPencil, MediaImage, Text } from "@assets/icons";
</script>

<div class="w-full max-w-sm">
  <Tabs value="canvas">
    <Tabs.ListContainer>
      <Tabs.List aria-label="Editor">
        <Tabs.Tab value="canvas">
          {#snippet startContent()}
            <Icon icon={DesignPencil} class="size-4" />
          {/snippet}
          Canvas
          <Tabs.Indicator />
        </Tabs.Tab>

        <Tabs.Tab value="assets">
          <Tabs.Separator />
          {#snippet startContent()}
            <Icon icon={MediaImage} class="size-4" />
          {/snippet}
          Assets
          <Tabs.Indicator />
        </Tabs.Tab>

        <Tabs.Tab value="typography">
          <Tabs.Separator />
          {#snippet startContent()}
            <Icon icon={Text} class="size-4" />
          {/snippet}
          Fonts
          <Tabs.Indicator />
        </Tabs.Tab>
      </Tabs.List>
    </Tabs.ListContainer>
  </Tabs>
</div>
