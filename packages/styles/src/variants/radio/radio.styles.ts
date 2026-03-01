import { tv, type VariantProps } from "tailwind-variants";

export const radioStyles = tv({
  slots: {
    base: "radio",
    control: "radio__control",
    indicator: "radio__indicator",
    content: "radio__content",
    group: "radio-group",
    items: "radio-group__items"
  },
  variants: {
    orientation: {
      vertical: {
        items: "radio-group__items--vertical"
      },
      horizontal: {
        items: "radio-group__items--horizontal"
      }
    }
  },
  defaultVariants: {
    orientation: "vertical"
  }
});

export type RadioVariants = VariantProps<typeof radioStyles>;
