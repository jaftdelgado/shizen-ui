import { tv, type VariantProps } from "tailwind-variants";

export const spinnerStyles = tv({
  base: "spinner",
  variants: {
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
    color: "current"
  }
});

export type SpinnerVariants = VariantProps<typeof spinnerStyles>;
