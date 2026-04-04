import { tv, type VariantProps } from "tailwind-variants";

export const toggleStyles = tv({
  base: "toggle",
  variants: {
    variant: {
      default: "toggle--default",
      outline: "toggle--outline",
      ghost: "toggle--ghost"
    },
    size: {
      sm: "toggle--sm",
      md: "toggle--md",
      lg: "toggle--lg"
    },
    iconOnly: {
      true: "toggle--icon-only"
    }
  },
  compoundVariants: [
    {
      iconOnly: true,
      size: "sm",
      class: "toggle--icon-only--sm"
    },
    {
      iconOnly: true,
      size: "md",
      class: "toggle--icon-only--md"
    },
    {
      iconOnly: true,
      size: "lg",
      class: "toggle--icon-only--lg"
    }
  ],
  defaultVariants: {
    variant: "default",
    size: "md"
  }
});

export type ToggleVariants = VariantProps<typeof toggleStyles>;
