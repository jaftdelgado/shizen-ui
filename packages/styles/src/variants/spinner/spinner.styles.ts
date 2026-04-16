import { tv, type VariantProps } from "tailwind-variants";

export const spinnerStyles = tv({
  base: "spinner",
  variants: {
    size: {
      sm: "spinner--sm",
      md: "spinner--md",
      lg: "spinner--lg",
      xl: "spinner--xl"
    },
    color: {
      current: "spinner--current",
      secondary: "spinner--secondary",
      accent: "spinner--accent",
      success: "spinner--success",
      warning: "spinner--warning",
      danger: "spinner--danger"
    }
  },
  defaultVariants: {
    size: "md",
    color: "current"
  }
});

export type SpinnerVariants = VariantProps<typeof spinnerStyles>;
