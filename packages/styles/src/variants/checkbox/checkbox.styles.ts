import { tv, type VariantProps } from "tailwind-variants";

export const checkboxStyles = tv({
  slots: {
    base: "checkbox",
    control: "checkbox__control",
    indicator: "checkbox__indicator",
    content: "checkbox__content",
    group: "checkbox-group",
    items: "checkbox-group__items"
  },
  variants: {
    orientation: {
      vertical: {
        items: "checkbox-group__items--vertical"
      },
      horizontal: {
        items: "checkbox-group__items--horizontal"
      }
    }
  },
  defaultVariants: {
    orientation: "vertical"
  }
});

export type CheckboxVariants = VariantProps<typeof checkboxStyles>;
