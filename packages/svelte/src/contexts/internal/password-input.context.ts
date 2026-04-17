import { getContext, setContext } from "svelte";

export interface PasswordInputContextValue {
  readonly visible: boolean;
  readonly toggle: () => void;
  readonly disabled: boolean;
}

export interface PasswordInputContextResult extends PasswordInputContextValue {
  readonly exists: boolean;
}

const PASSWORD_INPUT_CONTEXT_KEY = Symbol("shizen:password-input");

export function setPasswordInputContext(value: PasswordInputContextValue): void {
  setContext(PASSWORD_INPUT_CONTEXT_KEY, value);
}

export function usePasswordInputContext(): PasswordInputContextResult {
  const context = getContext<PasswordInputContextValue | undefined>(PASSWORD_INPUT_CONTEXT_KEY);

  if (!context) {
    return {
      get visible() {
        return false;
      },
      get toggle() {
        return () => {};
      },
      get disabled() {
        return false;
      },
      get exists() {
        return false;
      }
    } satisfies PasswordInputContextResult;
  }

  return {
    get visible() {
      return context.visible;
    },
    get toggle() {
      return context.toggle;
    },
    get disabled() {
      return context.disabled;
    },
    get exists() {
      return true;
    }
  } satisfies PasswordInputContextResult;
}
