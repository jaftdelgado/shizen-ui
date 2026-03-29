<script lang="ts">
  import { ScrollArea, Surface } from "@shizen-ui/svelte";

  const tags = [
    "Radix UI",
    "Tailwind CSS",
    "Svelte 5",
    "TypeScript",
    "Vite",
    "Bun",
    "shadcn/ui",
    "tailwind-variants",
    "Motion",
    "Zod",
    "Drizzle ORM",
    "Hono",
    "tRPC",
    "Astro",
    "SvelteKit",
    "Vitest",
    "Playwright",
    "ESLint",
    "Prettier",
    "Changesets"
  ];
</script>

<Surface class="h-48 w-64">
  <ScrollArea class="h-full p-4">
    <div class="pr-2 flex flex-col gap-2">
      {#each tags as tag}
        <div class="text-sm">{tag}</div>
      {/each}
    </div>
  </ScrollArea>
</Surface>
