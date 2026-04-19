import { tv, type VariantProps } from "tailwind-variants";

export const tabsStyles = tv({
  slots: {
    base: "tabs",
    listContainer: "tabs__list-container",
    list: "tabs__list",
    tab: "tabs__tab",
    separator: "tabs__separator",
    indicator: "tabs__indicator",
    panel: "tabs__panel"
  },
  variants: {
    iconOnly: {
      true: {
        tab: "tabs__tab--icon-only"
      }
    }
  }
});

export type TabsVariants = VariantProps<typeof tabsStyles>;
