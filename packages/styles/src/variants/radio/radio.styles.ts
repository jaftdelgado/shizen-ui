import { tv, type VariantProps } from "tailwind-variants";

export const radioStyles = tv({
  slots: {
    base: "radio",
    control: "radio__control",
    indicator: "radio__indicator",
    content: "radio__content",
    group: "radio-group",
    wrapper: "radio-group__wrapper"
  },
  variants: {
    size: {
      sm: { control: "radio--sm" },
      md: { control: "radio--md" },
      lg: { control: "radio--lg" }
    },
    variant: {
      primary: { base: "radio--primary" },
      secondary: { base: "radio--secondary" }
    },
    orientation: {
      vertical: { wrapper: "flex-col gap-2" },
      horizontal: { wrapper: "flex-row gap-4" }
    }
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
    orientation: "vertical"
  }
});

export type RadioVariants = VariantProps<typeof radioStyles>;
