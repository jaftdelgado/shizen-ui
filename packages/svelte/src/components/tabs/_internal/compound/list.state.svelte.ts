import { cn } from "@shizen-ui/styles";
import { tabsStyles } from "@shizen-ui/styles";
import { useTabsContext, setTabsListContext, useTabsListContext } from "../tabs.context.js";

export { setTabsListContext, useTabsListContext };

interface IndicatorRects {
  translateX: number;
  translateY: number;
  width: number;
  height: number;
}

export class TabsListState {
  listEl = $state<HTMLElement | undefined>(undefined);
  indicatorEl = $state<HTMLSpanElement | undefined>(undefined);

  #listReady = $state(false);
  #rects = $state<IndicatorRects>({ translateX: 0, translateY: 0, width: 0, height: 0 });
  #styles = tabsStyles();

  constructor() {
    const tabsCtx = useTabsContext();

    $effect(() => {
      const activeTabEl = tabsCtx.activeTab ? tabsCtx.getTabElement(tabsCtx.activeTab) : undefined;

      if (!activeTabEl) return;

      if (!this.#listReady) {
        this.calculateRects(activeTabEl, true);
        requestAnimationFrame(() => {
          this.#listReady = true;
        });
      } else {
        this.calculateRects(activeTabEl);
      }
    });
  }

  calculateRects(activeTabEl: HTMLElement, immediate = false) {
    if (!this.listEl || !this.indicatorEl) return;

    const listRect = this.listEl.getBoundingClientRect();
    const tabRect = activeTabEl.getBoundingClientRect();

    if (immediate) {
      this.indicatorEl.style.transition = "none";
    }

    this.#rects = {
      translateX: tabRect.left - listRect.left,
      translateY: tabRect.top - listRect.top,
      width: tabRect.width,
      height: tabRect.height
    };

    if (immediate) {
      void this.indicatorEl.offsetHeight;
      this.indicatorEl.style.transition = "";
    }
  }

  get indicatorStyles(): string {
    const { translateX, translateY, width, height } = this.#rects;
    return `translate: ${translateX}px ${translateY}px; width: ${width}px; height: ${height}px;`;
  }

  get indicatorClass(): string {
    return cn(
      this.#styles.indicator(),
      !this.#listReady ? "opacity-0 transition-none" : "opacity-100"
    );
  }

  get listReady(): boolean {
    return this.#listReady;
  }
}
