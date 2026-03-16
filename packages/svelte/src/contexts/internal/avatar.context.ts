import { getContext, setContext } from "svelte";

export type AvatarSize = "sm" | "md" | "lg" | "xl";

export interface AvatarContextValue {
  readonly size: AvatarSize;
  readonly imageLoaded: boolean;
  readonly imageError: boolean;
  readonly setImageLoaded: (loaded: boolean) => void;
  readonly setImageError: (error: boolean) => void;
}

export interface AvatarContextResult extends AvatarContextValue {
  readonly exists: boolean;
}

const AVATAR_CONTEXT_KEY = Symbol("shizen:avatar");

export function setAvatarContext(value: AvatarContextValue): void {
  setContext(AVATAR_CONTEXT_KEY, value);
}

export function useAvatarContext(): AvatarContextResult {
  const context = getContext<AvatarContextValue | undefined>(AVATAR_CONTEXT_KEY);

  if (!context) {
    return {
      get size() {
        return "md" as AvatarSize;
      },
      get imageLoaded() {
        return false;
      },
      get imageError() {
        return false;
      },
      setImageLoaded: () => {},
      setImageError: () => {},
      get exists() {
        return false;
      }
    } satisfies AvatarContextResult;
  }

  return {
    get size() {
      return context.size;
    },
    get imageLoaded() {
      return context.imageLoaded;
    },
    get imageError() {
      return context.imageError;
    },
    get setImageLoaded() {
      return context.setImageLoaded;
    },
    get setImageError() {
      return context.setImageError;
    },
    get exists() {
      return true;
    }
  } satisfies AvatarContextResult;
}
