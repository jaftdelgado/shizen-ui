import { tv, type VariantProps } from "tailwind-variants";

export const radioStyles = tv({
  slots: {
    base: "radio",
    control: "radio__control",
    indicator: "radio__indicator",
    content: "radio__content",
    group: "radio-group"
  },
  variants: {
    orientation: {
      vertical: {
        group: "flex-col"
      },
      horizontal: {
        group: "flex-row flex-wrap"
      }
    }
  },
  defaultVariants: {
    orientation: "vertical"
  }
});

export type RadioVariants = VariantProps<typeof radioStyles>;
