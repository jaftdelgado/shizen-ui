import TagRoot from "./Tag.svelte";
import RemoveButton from "./compound/RemoveButton.svelte";

const Tag = Object.assign(TagRoot, {
  RemoveButton
});

export { Tag };
export type { TagVariants } from "@shizen-ui/styles";
