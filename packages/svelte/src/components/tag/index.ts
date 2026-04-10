import TagRoot from "./Tag.svelte";
import RemoveButton from "./compound/RemoveButton.svelte";

export type { TagProps, IconContent, SelectionMode } from "./tag.svelte.js";
export type { TagVariants } from "@shizen-ui/styles";
export { createTagState, createTagHandlers } from "./tag.svelte.js";

export const Tag = Object.assign(TagRoot, {
  RemoveButton
});

export { TagRoot };

export default {
  Tag
};
