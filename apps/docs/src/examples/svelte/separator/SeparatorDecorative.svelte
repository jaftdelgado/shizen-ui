<script lang="ts">
  import { Separator } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-6 w-64">
  <div class="flex flex-col gap-2">
    <p class="text-sm text-muted">Decorative — hidden from assistive technology</p>
    <span>Inbox</span>
    <Separator decorative={true} />
    <span>Archived</span>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-sm text-muted">Semantic — announces to screen readers</p>
    <nav aria-label="Site sections">
      <span>Home</span>
      <Separator decorative={false} />
      <span>About</span>
    </nav>
  </div>
</div>
