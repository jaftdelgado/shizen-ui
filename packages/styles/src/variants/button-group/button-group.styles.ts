import { tv, type VariantProps } from "tailwind-variants";

export const buttonGroupStyles = tv({
  base: "button-group",
  variants: {
    variant: {
      primary: "button-group--primary",
      secondary: "button-group--secondary",
      tertiary: "button-group--tertiary",
      danger: "button-group--danger",
      ghost: "button-group--ghost",
      outline: "button-group--outline",
      "soft-danger": "button-group--soft-danger"
    },
    size: {
      sm: "button-group--sm",
      md: "button-group--md",
      lg: "button-group--lg"
    },
    orientation: {
      horizontal: "button-group--horizontal",
      vertical: "button-group--vertical"
    },
    showSeparators: {
      true: "button-group--with-separators",
      false: ""
    }
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    orientation: "horizontal",
    showSeparators: true
  }
});

export type ButtonGroupVariants = VariantProps<typeof buttonGroupStyles>;
