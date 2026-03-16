<script lang="ts">
  import { Avatar } from "@shizen-ui/svelte";

  const avatarSvg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'>
      <rect width='160' height='160' fill='#1f2937' />
      <circle cx='80' cy='62' r='28' fill='#f3f4f6' />
      <rect x='36' y='96' width='88' height='48' rx='24' fill='#f3f4f6' />
    </svg>
  `;

  const src = `data:image/svg+xml;utf8,${encodeURIComponent(avatarSvg)}`;
</script>

<div class="flex flex-wrap items-center gap-4">
  <Avatar>
    <Avatar.Image {src} alt="Default avatar" />
    <Avatar.Fallback>DF</Avatar.Fallback>
  </Avatar>

  <Avatar class="ring-2 ring-[--color-primary] ring-offset-2 ring-offset-[--color-background]">
    <Avatar.Image {src} alt="Ring avatar" />
    <Avatar.Fallback>RG</Avatar.Fallback>
  </Avatar>

  <Avatar class="shadow-lg">
    <Avatar.Image {src} alt="Shadow avatar" />
    <Avatar.Fallback>SD</Avatar.Fallback>
  </Avatar>
</div>
