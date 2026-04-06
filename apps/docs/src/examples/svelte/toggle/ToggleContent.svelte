<script lang="ts">
  import { Toggle } from "@shizen-ui/svelte";

  import Icon from "@assets/Icon.svelte";
  import { Bold, Italic } from "@assets/icons";
</script>

<div class="flex items-center gap-2">
  <Toggle>
    {#snippet startContent()}
      <Icon icon={Bold} class="size-4" />
    {/snippet}
    Bold
  </Toggle>

  <Toggle>
    {#snippet endContent()}
      <Icon icon={Italic} class="size-4" />
    {/snippet}
    Italic
  </Toggle>
</div>
