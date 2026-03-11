import { tv, type VariantProps } from "tailwind-variants";

export const separatorStyles = tv({
  slots: {
    base: "separator"
  },
  variants: {
    orientation: {
      horizontal: {
        base: "separator--horizontal"
      },
      vertical: {
        base: "separator--vertical"
      }
    }
  },
  defaultVariants: {
    orientation: "horizontal"
  }
});

export type SeparatorVariants = VariantProps<typeof separatorStyles>;
