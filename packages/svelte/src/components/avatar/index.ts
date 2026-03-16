import AvatarRoot from "./Avatar.svelte";
import Image from "./compound/Image.svelte";
import Fallback from "./compound/Fallback.svelte";

export type { AvatarSize } from "../../contexts/internal/index.js";
export type { AvatarVariants } from "@shizen-ui/styles";

export const Avatar = Object.assign(AvatarRoot, {
  Image,
  Fallback
});

export { AvatarRoot };

export default {
  Avatar
};
