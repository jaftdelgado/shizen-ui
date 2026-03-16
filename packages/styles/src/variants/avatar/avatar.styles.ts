import { tv, type VariantProps } from "tailwind-variants";

export const avatarStyles = tv({
  slots: {
    base: "avatar",
    image: "avatar__image",
    fallback: "avatar__fallback"
  },
  variants: {
    size: {
      sm: {
        base: "avatar--sm"
      },
      md: {
        base: "avatar--md"
      },
      lg: {
        base: "avatar--lg"
      },
      xl: {
        base: "avatar--xl"
      }
    }
  },
  defaultVariants: {
    size: "md"
  }
});

export type AvatarVariants = VariantProps<typeof avatarStyles>;
