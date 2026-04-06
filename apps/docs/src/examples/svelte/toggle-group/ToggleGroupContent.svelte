<script lang="ts">
  import { Toggle, ToggleGroup } from "@shizen-ui/svelte";

  import Icon from "@assets/Icon.svelte";
  import { Bold, Italic, Underline } from "@assets/icons";
</script>

<div class="flex flex-col gap-2">
  <ToggleGroup type="multiple" value={["bold", "italic"]}>
    <Toggle value="bold">
      {#snippet startContent()}
        <Icon icon={Bold} class="size-4" />
      {/snippet}
      Bold
    </Toggle>

    <Toggle value="italic">
      {#snippet startContent()}
        <Icon icon={Italic} class="size-4" />
      {/snippet}
      Italic
    </Toggle>

    <Toggle value="underline">
      {#snippet startContent()}
        <Icon icon={Underline} class="size-4" />
      {/snippet}
      Underline
    </Toggle>
  </ToggleGroup>
</div>
