import { tv, type VariantProps } from "tailwind-variants";

export const scrollAreaStyles = tv({
  slots: {
    root: "scroll-area",
    viewport: "scroll-area__viewport",
    scrollbar: "scroll-area__scrollbar",
    thumb: "scroll-area__thumb",
    corner: "scroll-area__corner"
  },
  variants: {
    orientation: {
      vertical: {
        scrollbar: "scroll-area__scrollbar--vertical"
      },
      horizontal: {
        scrollbar: "scroll-area__scrollbar--horizontal"
      }
    }
  },
  defaultVariants: {
    orientation: "vertical"
  }
});

export type ScrollAreaVariants = VariantProps<typeof scrollAreaStyles>;
