import AvatarRoot from "./Avatar.svelte";
import Image from "./compound/Image.svelte";
import Fallback from "./compound/Fallback.svelte";
import type { Component } from "svelte";

export type { AvatarSize } from "../../contexts/internal/index.js";
export type { AvatarVariants } from "@shizen-ui/styles";

export const Avatar = Object.assign(AvatarRoot as Component, {
  Image: Image as Component,
  Fallback: Fallback as Component
});

export { AvatarRoot };

export default { Avatar };
