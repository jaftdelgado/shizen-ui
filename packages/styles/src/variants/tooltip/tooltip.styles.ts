import { tv, type VariantProps } from "tailwind-variants";

export const tooltipStyles = tv({
  slots: {
    content: "tooltip",
    trigger: "tooltip__trigger"
  }
});

export type TooltipVariants = VariantProps<typeof tooltipStyles>;
