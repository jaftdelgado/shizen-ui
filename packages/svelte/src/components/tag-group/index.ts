import TagGroupRoot from "./TagGroup.svelte";
import Items from "./compound/Items.svelte";
import TagRoot from "../tag/Tag.svelte";

export const TagGroup = Object.assign(TagGroupRoot, {
  Items,
  Item: TagRoot,
  Tag: TagRoot
});

export { TagGroupRoot };

export default TagGroup;
