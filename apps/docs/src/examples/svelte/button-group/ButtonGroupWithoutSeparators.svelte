<script lang="ts">
  import { Button, ButtonGroup } from "@shizen-ui/svelte";

  const variants = [
    "primary",
    "secondary",
    "tertiary",
    "outline",
    "ghost",
    "danger",
    "soft-danger"
  ] as const;

  const labels = ["Left", "Center", "Right"];
</script>

<div class="flex flex-col gap-4">
  {#each variants as variant}
    <div class="flex flex-col gap-2">
      <p class="text-sm capitalize">{variant}</p>
      <ButtonGroup {variant} hideSeparator>
        {#each labels as label}
          <Button>{label}</Button>
        {/each}
      </ButtonGroup>
    </div>
  {/each}
</div>
