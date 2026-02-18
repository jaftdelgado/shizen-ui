import { tv, type VariantProps } from "tailwind-variants";

export const descriptionStyles = tv({
  base: "description",
  variants: {
    disabled: {
      true: "description--disabled"
    }
  },
  defaultVariants: {
    disabled: false
  }
});

export type DescriptionVariants = VariantProps<typeof descriptionStyles>;
