import { tv, type VariantProps } from "tailwind-variants";

export const numberInputStyles = tv({
  slots: {
    base: "number-input",
    input: "number-input__input",
    button: "number-input__button"
  },
  variants: {
    size: {
      sm: { base: "number-input--sm" },
      md: { base: "number-input--md" },
      lg: { base: "number-input--lg" }
    },
    position: {
      left: { button: "number-input__button--left" },
      right: { button: "number-input__button--right" }
    }
  },
  defaultVariants: {
    size: "md"
  }
});

export type NumberInputVariants = VariantProps<typeof numberInputStyles>;
