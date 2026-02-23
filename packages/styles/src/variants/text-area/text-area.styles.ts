import { tv, type VariantProps } from "tailwind-variants";

export const textAreaStyles = tv({
  base: "textarea",
  variants: {
    fullWidth: {
      true: "textarea--full-width"
    }
  },
  defaultVariants: {
    fullWidth: false
  }
});

export type TextAreaVariants = VariantProps<typeof textAreaStyles>;
