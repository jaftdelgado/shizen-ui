<script lang="ts">
  import { Avatar } from "@shizen-ui/svelte";

  const sizes = ["sm", "md", "lg", "xl"] as const;

  const seeds = ["Felix", "Aneka", "Sophia", "Yesenia"];
</script>

<div class="flex flex-wrap items-center gap-4">
  {#each sizes as size, i}
    <div class="flex flex-col items-center gap-2">
      <Avatar {size}>
        <Avatar.Image
          src={`https://api.dicebear.com/9.x/glass/svg?seed=${seeds[i]}`}
          alt={seeds[i]}
        />
      </Avatar>
      <span class="text-xs text-secondary-text">{size}</span>
    </div>
  {/each}
</div>
