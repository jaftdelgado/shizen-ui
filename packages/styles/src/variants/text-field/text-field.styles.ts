import { tv, type VariantProps } from "tailwind-variants";

export const textFieldStyles = tv({
  base: "text-field",
  variants: {
    fullWidth: {
      true: "text-field--full-width"
    },
    disabled: {
      true: "opacity-100"
    }
  },
  defaultVariants: {
    fullWidth: false
  }
});

export type TextFieldVariants = VariantProps<typeof textFieldStyles>;
