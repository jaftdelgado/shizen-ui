import { tv, type VariantProps } from "tailwind-variants";

export const inputGroupStyles = tv({
  base: "input-group",
  variants: {
    size: {
      sm: "input-group--sm",
      md: "input-group--md",
      lg: "input-group--lg"
    },
    fullWidth: {
      true: "w-full",
      false: "max-w-xs"
    },
    hasTextArea: {
      true: "input-group--has-textarea"
    }
  },
  defaultVariants: {
    size: "md",
    fullWidth: false,
    hasTextArea: false
  }
});

export type InputGroupVariants = VariantProps<typeof inputGroupStyles>;
