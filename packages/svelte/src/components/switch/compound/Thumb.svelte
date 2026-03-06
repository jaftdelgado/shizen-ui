<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { switchStyles } from "@shizen-ui/styles";
  import { useSwitchContext } from "../switch.context";

  let { children, class: className }: { children?: Snippet; class?: string } = $props();

  const ctx = useSwitchContext();
  const styles = $derived(switchStyles());
</script>

<div
  class={cn(styles.thumb(), className)}
  data-checked={ctx.checked}
  data-disabled={ctx.disabled}
  data-invalid={ctx.invalid}
>
  {#if children}
    <div class="switch__thumb-content">
      {@render children()}
    </div>
  {/if}
</div>
