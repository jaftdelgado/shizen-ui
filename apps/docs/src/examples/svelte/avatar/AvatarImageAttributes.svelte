<script lang="ts">
  import { Avatar } from "@shizen-ui/svelte";

  const avatarSvg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'>
      <rect width='160' height='160' fill='#475569' />
      <circle cx='80' cy='60' r='26' fill='#e2e8f0' />
      <rect x='38' y='96' width='84' height='44' rx='22' fill='#e2e8f0' />
    </svg>
  `;

  const src = `data:image/svg+xml;utf8,${encodeURIComponent(avatarSvg)}`;
</script>

<div class="flex items-center gap-4">
  <Avatar>
    <Avatar.Image
      {src}
      alt="Avatar image with loading attributes"
      loading="lazy"
      decoding="async"
      referrerpolicy="no-referrer"
    />
    <Avatar.Fallback>IM</Avatar.Fallback>
  </Avatar>

  <p class="text-sm text-secondary-text">
    Avatar.Image accepts standard image attributes such as <code>loading</code>,
    <code>decoding</code>, and <code>referrerpolicy</code>.
  </p>
</div>
