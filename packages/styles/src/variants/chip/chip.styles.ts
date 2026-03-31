import { tv, type VariantProps } from "tailwind-variants";

export const chipStyles = tv({
  base: "chip",
  variants: {
    color: {
      default: "chip--default",
      accent: "chip--accent",
      success: "chip--success",
      warning: "chip--warning",
      danger: "chip--danger"
    },
    variant: {
      primary: "chip--primary",
      secondary: "chip--secondary",
      soft: "chip--soft",
      ghost: "chip--ghost"
    },
    size: {
      sm: "chip--sm",
      md: "chip--md",
      lg: "chip--lg"
    }
  },
  defaultVariants: {
    variant: "secondary",
    color: "default",
    size: "md"
  }
});

export type ChipVariants = VariantProps<typeof chipStyles>;
