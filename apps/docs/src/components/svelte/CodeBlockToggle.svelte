<script lang="ts">
  import { Toggle } from "@shizen-ui/svelte";

  interface Props {
    instanceId: string;
    collapsed: boolean;
  }

  let { instanceId, collapsed = $bindable() }: Props = $props();

  function handleToggle() {
    collapsed = !collapsed;

    const wrapper = document.querySelector(`[data-code-block="${instanceId}"]`);
    if (wrapper) {
      wrapper.setAttribute("data-collapsed", collapsed.toString());
    }
  }
</script>

<Toggle
  size="sm"
  pressed={!collapsed}
  onPressedChange={handleToggle}
  class="bg-control text-control-foreground text-sm"
>
  {collapsed ? "Expand code" : "Collapse code"}
</Toggle>
