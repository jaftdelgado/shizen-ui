import { tv, type VariantProps } from "tailwind-variants";

export const popoverStyles = tv({
  slots: {
    content: "popover",
    dialog: "popover__dialog",
    heading: "popover__heading",
    trigger: "popover__trigger"
  }
});

export type PopoverVariants = VariantProps<typeof popoverStyles>;
