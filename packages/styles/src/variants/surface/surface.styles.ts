import { tv, type VariantProps } from "tailwind-variants";

export const surfaceStyles = tv({
  base: "surface"
});

export type SurfaceVariants = VariantProps<typeof surfaceStyles>;
