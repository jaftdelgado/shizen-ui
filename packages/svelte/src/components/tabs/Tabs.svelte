<script lang="ts">
  import { type Snippet } from "svelte";
  import { cn } from "@shizen-ui/styles";
  import { tabsStyles, type TabsVariants } from "@shizen-ui/styles";
  import { setTabsContext } from "../../contexts/internal/index.js";

  interface Props extends TabsVariants {
    children: Snippet;
    class?: string;
    value: string;
  }

  let { children, class: className, value = $bindable(), ...rest }: Props = $props();

  const tabElements = new Map<string, HTMLElement>();

  setTabsContext({
    get activeTab() {
      return value;
    },
    setActiveTab(id: string) {
      value = id;
    },
    registerTabElement(tabValue: string, el: HTMLElement) {
      tabElements.set(tabValue, el);
    },
    getTabElement(tabValue: string) {
      return tabElements.get(tabValue);
    }
  });

  const styles = tabsStyles();
</script>

<div class={cn(styles.base(), className)} {...rest}>
  {@render children()}
</div>
