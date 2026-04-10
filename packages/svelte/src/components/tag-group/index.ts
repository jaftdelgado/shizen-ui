import TagGroupRoot from "./TagGroup.svelte";
import Items from "./compound/Items.svelte";
import TagRoot from "../tag/Tag.svelte";

export type { TagSelectionMode } from "../../contexts/internal/index.js";
export type { TagGroupProps } from "./tag-group.svelte.js";
export { createTagGroupState } from "./tag-group.svelte.js";

export const TagGroup = Object.assign(TagGroupRoot, {
  Items,
  Item: TagRoot,
  Tag: TagRoot
});

export { TagGroupRoot };

export default TagGroup;
