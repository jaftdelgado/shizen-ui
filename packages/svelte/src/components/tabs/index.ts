import TabsRoot from "./Tabs.svelte";
import ListContainer from "./compound/ListContainer.svelte";
import List from "./compound/List.svelte";
import Tab from "./compound/Tab.svelte";
import Separator from "./compound/Separator.svelte";
import Indicator from "./compound/Indicator.svelte";
import Panel from "./compound/Panel.svelte";

export const Tabs = Object.assign(TabsRoot, {
  ListContainer,
  List,
  Tab,
  Separator,
  Indicator,
  Panel
});

export { TabsRoot };

export default Tabs;
