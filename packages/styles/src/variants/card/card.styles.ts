import { tv, type VariantProps } from "tailwind-variants";

export const cardStyles = tv({
  slots: {
    base: "card",
    header: "card__header",
    title: "card__title",
    description: "card__description",
    content: "card__content",
    footer: "card__footer"
  },
  variants: {
    variant: {
      transparent: { base: "card--transparent" },
      default: { base: "card--default" },
      secondary: { base: "card--secondary" },
      tertiary: { base: "card--tertiary" }
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export type CardVariants = VariantProps<typeof cardStyles>;
