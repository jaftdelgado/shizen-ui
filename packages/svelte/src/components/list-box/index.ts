import ListBoxRoot from "./ListBox.svelte";
import Item from "./compound/Item.svelte";
import ItemIndicator from "./compound/ItemIndicator.svelte";
import ItemLabel from "./compound/ItemLabel.svelte";
import Section from "./compound/Section.svelte";
import SectionHeader from "./compound/SectionHeader.svelte";

export const ListBox = Object.assign(ListBoxRoot, {
  Item,
  ItemIndicator,
  ItemLabel,
  Section,
  SectionHeader
});

export { ListBoxRoot };

export default { ListBox };
