const HOLD_DELAY_MS = 500;
const HOLD_INTERVAL_MS = 80;

export interface HoldRepeatHandlers {
  start: (event: PointerEvent) => void;
  stop: () => void;
}

export function useHoldRepeat(action: () => void, canAct: () => boolean): HoldRepeatHandlers {
  let interval: ReturnType<typeof setInterval> | null = null;
  let timeout: ReturnType<typeof setTimeout> | null = null;

  function stop(): void {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function start(event: PointerEvent): void {
    event.preventDefault();
    action();
    timeout = setTimeout(() => {
      interval = setInterval(() => {
        if (!canAct()) {
          stop();
          return;
        }
        action();
      }, HOLD_INTERVAL_MS);
    }, HOLD_DELAY_MS);
  }

  return { start, stop };
}
