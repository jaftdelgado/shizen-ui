import SelectRoot from "./Select.svelte";
import Trigger from "./compound/Trigger.svelte";
import Value from "./compound/Value.svelte";
import Indicator from "./compound/Indicator.svelte";
import Content from "./compound/Content.svelte";
import Item from "./compound/Item.svelte";
import ItemIndicator from "./compound/ItemIndicator.svelte";
import Group from "./compound/Group.svelte";
import GroupHeader from "./compound/GroupHeader.svelte";
import Popover from "./compound/Popover.svelte";

export const Select = Object.assign(SelectRoot, {
  Trigger,
  Value,
  Indicator,
  Content,
  Item,
  ItemIndicator,
  Popover,
  Group,
  GroupHeader
});

export { SelectRoot };

export default { Select };
