<script lang="ts">
  import { Spinner, Description } from "@shizen-ui/svelte";
</script>

<div class="flex flex-wrap gap-6">
  <div class="flex flex-col items-center gap-2">
    <div class="flex items-center justify-center size-14">
      <Spinner size="sm" />
    </div>
    <Description>Small</Description>
  </div>

  <div class="flex flex-col items-center gap-2">
    <div class="flex items-center justify-center size-14">
      <Spinner size="md" />
    </div>
    <Description>Medium</Description>
  </div>

  <div class="flex flex-col items-center gap-2">
    <div class="flex items-center justify-center size-14">
      <Spinner size="lg" />
    </div>
    <Description>Large</Description>
  </div>

  <div class="flex flex-col items-center gap-2">
    <div class="flex items-center justify-center size-14">
      <Spinner size="xl" />
    </div>
    <Description>Extra Large</Description>
  </div>
</div>
