import { tv, type VariantProps } from "tailwind-variants";

export const tagGroupStyles = tv({
  base: "tag-group",
  variants: {
    invalid: {
      true: "tag-group--invalid"
    },
    disabled: {
      true: "tag-group--disabled"
    }
  },
  defaultVariants: {
    invalid: false,
    disabled: false
  }
});

export type TagGroupVariants = VariantProps<typeof tagGroupStyles>;
