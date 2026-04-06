<script lang="ts">
  import { Toggle } from "@shizen-ui/svelte";

  import Icon from "@assets/Icon.svelte";
  import { Bold, Italic, Underline } from "@assets/icons";
</script>

<div class="flex flex-col gap-4">
  <div class="flex items-center gap-2">
    <Toggle iconOnly>
      <Icon icon={Bold} class="size-4" />
    </Toggle>

    <Toggle iconOnly>
      <Icon icon={Italic} class="size-4" />
    </Toggle>

    <Toggle iconOnly>
      <Icon icon={Underline} class="size-4" />
    </Toggle>
  </div>
</div>
