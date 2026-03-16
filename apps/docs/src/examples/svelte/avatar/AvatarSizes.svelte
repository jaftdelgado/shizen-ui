<script lang="ts">
  import { Avatar } from "@shizen-ui/svelte";

  const sizes = ["sm", "md", "lg", "xl"] as const;

  const avatarSvg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'>
      <rect width='160' height='160' fill='#111827' />
      <circle cx='80' cy='64' r='30' fill='#f9fafb' />
      <rect x='38' y='102' width='84' height='42' rx='21' fill='#f9fafb' />
    </svg>
  `;

  const src = `data:image/svg+xml;utf8,${encodeURIComponent(avatarSvg)}`;
</script>

<div class="flex flex-wrap items-end gap-4">
  {#each sizes as size}
    <div class="flex flex-col items-center gap-2">
      <Avatar {size}>
        <Avatar.Image {src} alt={`${size} avatar`} />
        <Avatar.Fallback>{size.toUpperCase()}</Avatar.Fallback>
      </Avatar>
      <span class="text-xs text-secondary-text">{size}</span>
    </div>
  {/each}
</div>
