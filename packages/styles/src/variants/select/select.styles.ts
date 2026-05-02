import { tv, type VariantProps } from "tailwind-variants";

export const selectStyles = tv({
  slots: {
    base: "select",
    trigger: "select__trigger",
    value: "select__value",
    placeholder: "select__placeholder",
    indicator: "select__indicator",
    content: "select__content",
    item: "select__item",
    itemLabel: "select__item__label",
    itemIndicator: "select__item__indicator",
    group: "select__group",
    groupHeader: "select__group-header"
  },
  variants: {
    variant: {
      default: {
        item: "select__item--default"
      },
      danger: {
        item: "select__item--danger"
      }
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export type SelectStyleVariants = VariantProps<typeof selectStyles>;
