import { tv, type VariantProps } from "tailwind-variants";

export const labelStyles = tv({
  base: "label",
  variants: {
    invalid: {
      true: "label--invalid"
    },
    disabled: {
      true: "label--disabled"
    }
  },
  defaultVariants: {
    invalid: false,
    disabled: false
  }
});

export type LabelVariants = VariantProps<typeof labelStyles>;
