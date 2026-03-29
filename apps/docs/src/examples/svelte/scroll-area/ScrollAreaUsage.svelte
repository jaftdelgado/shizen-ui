<script lang="ts">
  import { ScrollArea, Surface, Label } from "@shizen-ui/svelte";

  const tags = [
    "Tailwind CSS",
    "Svelte 5",
    "TypeScript",
    "Vite",
    "Bun",
    "tailwind-variants",
    "Motion",
    "Astro",
    "SvelteKit",
    "Vitest",
    "Prettier"
  ];
</script>

<Surface class="h-56 w-64 flex flex-col gap-3 py-4">
  <Label class="px-4">Releases</Label>
  <ScrollArea class="h-full">
    <div class="flex flex-col gap-2">
      {#each tags as tag}
        <div class="text-sm text-secondary-text px-4">{tag}</div>
      {/each}
    </div>
  </ScrollArea>
</Surface>
