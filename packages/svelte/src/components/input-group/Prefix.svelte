<script lang="ts">
  import { cn } from "@shizen-ui/styles";

  let { children, class: className }: { children: any; class?: string } = $props();
</script>

<div class={cn("input-group__prefix", className)}>
  {@render children()}
</div>
