import { getContext, setContext } from "svelte";

export type AlertVariant = "default" | "secondary";
export type AlertStatus = "default" | "accent" | "success" | "warning" | "danger";

export interface AlertContextValue {
  readonly variant: AlertVariant;
  readonly status: AlertStatus;
}

export interface AlertContextResult extends AlertContextValue {
  readonly exists: boolean;
}

const ALERT_CONTEXT_KEY = Symbol("shizen:alert");

export function setAlertContext(value: AlertContextValue): void {
  setContext(ALERT_CONTEXT_KEY, value);
}

export function useAlertContext(): AlertContextResult {
  const context = getContext<AlertContextValue | undefined>(ALERT_CONTEXT_KEY);

  if (!context) {
    return {
      get variant() {
        return "default" as AlertVariant;
      },
      get status() {
        return "default" as AlertStatus;
      },
      get exists() {
        return false;
      }
    } satisfies AlertContextResult;
  }

  return {
    get variant() {
      return context.variant;
    },
    get status() {
      return context.status;
    },
    get exists() {
      return true;
    }
  } satisfies AlertContextResult;
}
