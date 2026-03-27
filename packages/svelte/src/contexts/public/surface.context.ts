import { getContext, setContext } from "svelte";

export interface SurfaceContextValue {
  readonly inSurface: boolean;
}

export interface SurfaceContextResult {
  readonly inSurface: boolean;
  readonly exists: boolean;
}

const SURFACE_CONTEXT_KEY = Symbol("shizen:surface");

export function setSurfaceContext(): void {
  setContext(SURFACE_CONTEXT_KEY, { inSurface: true } satisfies SurfaceContextValue);
}

export function useSurfaceContext(): SurfaceContextResult {
  const context = getContext<SurfaceContextValue | undefined>(SURFACE_CONTEXT_KEY);

  if (!context) {
    return {
      get inSurface() {
        return false;
      },
      get exists() {
        return false;
      }
    } satisfies SurfaceContextResult;
  }

  return {
    get inSurface() {
      return context.inSurface;
    },
    get exists() {
      return true;
    }
  } satisfies SurfaceContextResult;
}
