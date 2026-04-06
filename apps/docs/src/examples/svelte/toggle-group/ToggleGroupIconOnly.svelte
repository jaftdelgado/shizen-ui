<script lang="ts">
  import { Toggle, ToggleGroup } from "@shizen-ui/svelte";

  import Icon from "@assets/Icon.svelte";
  import { Bold, Italic, Underline } from "@assets/icons";
</script>

<div class="flex flex-col gap-2">
  <ToggleGroup type="multiple" value={["bold"]}>
    <Toggle value="bold" iconOnly aria-label="Bold">
      <Icon icon={Bold} class="size-4" />
    </Toggle>

    <Toggle value="italic" iconOnly aria-label="Italic">
      <Icon icon={Italic} class="size-4" />
    </Toggle>

    <Toggle value="underline" iconOnly aria-label="Underline">
      <Icon icon={Underline} class="size-4" />
    </Toggle>
  </ToggleGroup>
</div>
