import { tv, type VariantProps } from "tailwind-variants";

export const textAreaStyles = tv({
  base: "textarea",
  variants: {
    fullWidth: {
      true: "textarea--full-width"
    },
    variant: {
      default: "textarea--default",
      secondary: "textarea--secondary",
      outline: "textarea--outline"
    }
  },
  defaultVariants: {
    fullWidth: false,
    variant: "default"
  }
});

export type TextAreaVariants = VariantProps<typeof textAreaStyles>;
