import { tv, type VariantProps } from "tailwind-variants";

export const passwordInputStyles = tv({
  base: "password-input",
  variants: {
    size: {
      sm: "password-input--sm",
      md: "password-input--md",
      lg: "password-input--lg"
    },
    variant: {
      default: "password-input--default",
      secondary: "password-input--secondary",
      outline: "password-input--outline"
    }
  },
  defaultVariants: {
    size: "md",
    variant: "default"
  }
});

export type PasswordInputVariants = VariantProps<typeof passwordInputStyles>;
