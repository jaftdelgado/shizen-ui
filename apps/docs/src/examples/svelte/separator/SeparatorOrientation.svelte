<script lang="ts">
  import { Separator } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-6">
  <div class="flex flex-col gap-2 w-64">
    <p class="text-sm text-muted">Horizontal (default)</p>
    <span>Section A</span>
    <Separator orientation="horizontal" />
    <span>Section B</span>
  </div>

  <div class="flex flex-row items-center gap-4 h-10">
    <p class="text-sm text-muted">Vertical:</p>
    <span>Left</span>
    <Separator orientation="vertical" />
    <span>Right</span>
  </div>
</div>
