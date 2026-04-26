import TabsRoot from "./Tabs.svelte";
import ListContainer from "./compound/ListContainer.svelte";
import List from "./compound/List.svelte";
import Tab from "./compound/Tab.svelte";
import Separator from "./compound/Separator.svelte";
import Content from "./compound/Content.svelte";
import View from "./compound/View.svelte";

export const Tabs = Object.assign(TabsRoot, {
  ListContainer,
  List,
  Tab,
  Separator,
  Content,
  View
});

export { TabsRoot };

export default Tabs;
