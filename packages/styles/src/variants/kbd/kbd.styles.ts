import { tv, type VariantProps } from "tailwind-variants";

export const kbdStyles = tv({
  slots: {
    base: "kbd",
    abbr: "kbd__abbr",
    content: "kbd__content"
  }
});

export type KbdVariants = VariantProps<typeof kbdStyles>;
