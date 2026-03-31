import { tv, type VariantProps } from "tailwind-variants";

export const timeInputStyles = tv({
  base: "time-input",
  variants: {
    size: {
      sm: "time-input--sm",
      md: "time-input--md",
      lg: "time-input--lg"
    },
    variant: {
      default: "time-input--default",
      secondary: "time-input--secondary",
      outline: "time-input--outline"
    }
  },
  defaultVariants: {
    size: "md",
    variant: "default"
  }
});
