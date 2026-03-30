import { tv, type VariantProps } from "tailwind-variants";

export const chipStyles = tv({
  base: "chip",
  variants: {
    variant: {
      default: "chip--default",
      outline: "chip--outline",
      ghost: "chip--ghost"
    },
    size: {
      sm: "chip--sm",
      md: "chip--md",
      lg: "chip--lg"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
});

export type ChipVariants = VariantProps<typeof chipStyles>;
