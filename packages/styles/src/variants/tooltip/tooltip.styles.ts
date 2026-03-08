import { tv, type VariantProps } from "tailwind-variants";

export const tooltipStyles = tv({
  slots: {
    trigger: "tooltip__trigger",
    content: "tooltip__content"
  }
});

export type TooltipVariants = VariantProps<typeof tooltipStyles>;
