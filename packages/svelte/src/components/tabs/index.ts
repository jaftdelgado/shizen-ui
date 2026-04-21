import TabsRoot from "./Tabs.svelte";
import ListContainer from "./compound/ListContainer.svelte";
import List from "./compound/List.svelte";
import Tab from "./compound/Tab.svelte";
import Separator from "./compound/Separator.svelte";
import Panel from "./compound/Panel.svelte";

export const Tabs = Object.assign(TabsRoot, {
  ListContainer,
  List,
  Tab,
  Separator,
  Panel
});

export { TabsRoot };

export default Tabs;
