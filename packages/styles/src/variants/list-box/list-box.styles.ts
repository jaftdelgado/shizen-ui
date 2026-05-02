import { tv, type VariantProps } from "tailwind-variants";

export const listBoxStyles = tv({
  slots: {
    base: "list-box",
    item: "list-box-item",
    itemLabel: "list-box-item__label",
    itemIndicator: "list-box-item__indicator",
    section: "list-box-section"
  },
  variants: {
    variant: {
      default: {
        item: "list-box-item--default"
      },
      danger: {
        item: "list-box-item--danger"
      }
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export type ListBoxVariants = VariantProps<typeof listBoxStyles>;
