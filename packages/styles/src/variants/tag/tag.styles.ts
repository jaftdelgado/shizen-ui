import { tv, type VariantProps } from "tailwind-variants";

export const tagStyles = tv({
  base: "tag",
  variants: {
    variant: {
      default: "tag--default",
      secondary: "tag--secondary",
      outline: "tag--outline",
      ghost: "tag--ghost"
    },
    size: {
      sm: "tag--sm",
      md: "tag--md",
      lg: "tag--lg"
    }
  },
  defaultVariants: {
    variant: "secondary",
    size: "md"
  }
});

export type TagVariants = VariantProps<typeof tagStyles>;
