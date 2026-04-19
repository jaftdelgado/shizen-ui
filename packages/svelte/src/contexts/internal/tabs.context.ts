import { getContext, setContext } from "svelte";

export interface TabsContextValue {
  readonly activeTab: string | undefined;
  readonly setActiveTab: (id: string) => void;
  readonly registerTab: (id: string) => void;
}

export interface TabsContextResult extends TabsContextValue {
  readonly exists: boolean;
}

export interface TabContextValue {
  readonly tabId: string;
  readonly isActive: boolean;
}

export interface TabContextResult extends TabContextValue {
  readonly exists: boolean;
}

const TABS_CONTEXT_KEY = Symbol("shizen:tabs");
const TAB_CONTEXT_KEY = Symbol("shizen:tab");

export function setTabsContext(value: TabsContextValue): void {
  setContext(TABS_CONTEXT_KEY, value);
}

export function useTabsContext(): TabsContextResult {
  const context = getContext<TabsContextValue | undefined>(TABS_CONTEXT_KEY);

  if (!context) {
    return {
      get activeTab() {
        return undefined;
      },
      get setActiveTab() {
        return () => {};
      },
      get registerTab() {
        return () => {};
      },
      get exists() {
        return false;
      }
    } satisfies TabsContextResult;
  }

  return {
    get activeTab() {
      return context.activeTab;
    },
    get setActiveTab() {
      return context.setActiveTab;
    },
    get registerTab() {
      return context.registerTab;
    },
    get exists() {
      return true;
    }
  } satisfies TabsContextResult;
}

export function setTabContext(value: TabContextValue): void {
  setContext(TAB_CONTEXT_KEY, value);
}

export function useTabContext(): TabContextResult {
  const context = getContext<TabContextValue | undefined>(TAB_CONTEXT_KEY);

  if (!context) {
    return {
      get tabId() {
        return "";
      },
      get isActive() {
        return false;
      },
      get exists() {
        return false;
      }
    } satisfies TabContextResult;
  }

  return {
    get tabId() {
      return context.tabId;
    },
    get isActive() {
      return context.isActive;
    },
    get exists() {
      return true;
    }
  } satisfies TabContextResult;
}
