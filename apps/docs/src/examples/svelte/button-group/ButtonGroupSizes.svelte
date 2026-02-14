<script lang="ts">
  import { Button, ButtonGroup } from "@shizen-ui/svelte";

  const sizeConfigs = [
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium (default)" },
    { value: "lg", label: "Large" }
  ] as const;

  const labels = ["First", "Second", "Third"];
</script>

<div class="flex flex-col gap-4">
  {#each sizeConfigs as { value, label }}
    <div class="flex flex-col gap-2">
      <p class="text-sm">{label}</p>
      <ButtonGroup size={value} variant="secondary">
        {#each labels as label}
          <Button>{label}</Button>
        {/each}
      </ButtonGroup>
    </div>
  {/each}
</div>
