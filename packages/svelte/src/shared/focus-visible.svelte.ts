export function createFocusVisible() {
  let lastMouseDownTime = 0;
  let lastVisibleTime = 0;
  let isFocusVisible = $state(false);

  $effect(() => {
    function onVisibilityChange() {
      if (document.visibilityState === "visible") {
        lastVisibleTime = Date.now();
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  });

  return {
    get isFocusVisible() {
      return isFocusVisible;
    },
    onWrapperMouseDown() {
      lastMouseDownTime = Date.now();
    },
    onInputMouseDown(e: MouseEvent) {
      lastMouseDownTime = Date.now();
    },
    onInputKeyDown() {
      lastMouseDownTime = 0;
    },
    onFocus() {
      const now = Date.now();
      if (now - lastVisibleTime < 500) return;
      isFocusVisible = now - lastMouseDownTime > 500;
    },
    onBlur() {
      isFocusVisible = false;
    }
  };
}
