import { tv, type VariantProps } from "tailwind-variants";

export const accordionStyles = tv({
  base: "accordion",
  variants: {
    variant: {
      default: "accordion--default",
      surface: "accordion--surface",
      splitted: "accordion--splitted"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export const accordionItemStyles = tv({
  base: "accordion-item",
  variants: {
    variant: {
      default: "accordion-item--default",
      surface: "accordion-item--surface",
      splitted: "accordion-item--splitted"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export const accordionHeadingStyles = tv({
  base: "accordion-heading"
});

export const accordionTriggerStyles = tv({
  base: "accordion-trigger"
});

export const accordionIndicatorStyles = tv({
  base: "accordion-indicator"
});

export const accordionPanelStyles = tv({
  base: "accordion-panel"
});

export const accordionBodyStyles = tv({
  base: "accordion-body"
});

export type AccordionStyleVariants = VariantProps<typeof accordionStyles>;
export type AccordionItemStyleVariants = VariantProps<typeof accordionItemStyles>;
