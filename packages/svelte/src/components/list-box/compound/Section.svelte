<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { listBoxStyles } from "@shizen-ui/styles";
  import type { ListBoxSectionProps } from "../_internal/index.js";

  let { class: className, children }: ListBoxSectionProps = $props();

  const styles = listBoxStyles({});
</script>

<li role="none" class={cn(styles.section(), className)}>
  {#if children}
    <ul role="group" class="contents">
      {@render children()}
    </ul>
  {/if}
</li>
