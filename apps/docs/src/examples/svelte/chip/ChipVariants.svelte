<script lang="ts">
  import { Chip } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <p class="text-sm font-semibold">Default</p>
    <div class="flex gap-2">
      <Chip variant="default">JavaScript</Chip>
      <Chip variant="default">TypeScript</Chip>
      <Chip variant="default">Python</Chip>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-sm font-semibold">Outline</p>
    <div class="flex gap-2">
      <Chip variant="outline">Node.js</Chip>
      <Chip variant="outline">Bun</Chip>
      <Chip variant="outline">Deno</Chip>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-sm font-semibold">Ghost</p>
    <div class="flex gap-2">
      <Chip variant="ghost">Frontend</Chip>
      <Chip variant="ghost">Backend</Chip>
      <Chip variant="ghost">DevOps</Chip>
    </div>
  </div>
</div>
