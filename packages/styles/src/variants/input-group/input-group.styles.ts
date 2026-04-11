import { tv, type VariantProps } from "tailwind-variants";

export const inputGroupStyles = tv({
  base: "input-group",
  variants: {
    size: {
      sm: "input-group--sm",
      md: "input-group--md",
      lg: "input-group--lg"
    },
    variant: {
      default: "input-group--default",
      secondary: "input-group--secondary",
      outline: "input-group--outline"
    },
    fullWidth: {
      true: "w-full",
      false: "max-w-xs"
    }
  },
  defaultVariants: {
    size: "md",
    variant: "default",
    fullWidth: false
  }
});

export type InputGroupVariants = VariantProps<typeof inputGroupStyles>;
