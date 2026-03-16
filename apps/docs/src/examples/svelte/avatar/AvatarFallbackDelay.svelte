<script lang="ts">
  import { Avatar } from "@shizen-ui/svelte";

  const brokenSrc = "data:image/svg+xml;utf8,broken-image";
</script>

<div class="flex flex-wrap items-center gap-6">
  <div class="flex items-center gap-3">
    <Avatar>
      <Avatar.Image src={brokenSrc} alt="Broken avatar without delay" />
      <Avatar.Fallback delayMs={0}>ND</Avatar.Fallback>
    </Avatar>
    <p class="text-sm text-secondary-text">delayMs: 0</p>
  </div>

  <div class="flex items-center gap-3">
    <Avatar>
      <Avatar.Image src={brokenSrc} alt="Broken avatar with delay" />
      <Avatar.Fallback delayMs={800}>DL</Avatar.Fallback>
    </Avatar>
    <p class="text-sm text-secondary-text">delayMs: 800</p>
  </div>
</div>
