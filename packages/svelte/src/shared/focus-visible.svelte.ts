export function createFocusVisible() {
  let isMouseInteraction = false;
  let isRecentlyVisible = false;
  let isFocusVisible = $state(false);

  $effect(() => {
    function onVisibilityChange() {
      if (document.visibilityState === "visible") {
        isRecentlyVisible = true;
        setTimeout(() => {
          isRecentlyVisible = false;
        }, 500);
      }
    }

    function onMouseUp() {
      isMouseInteraction = false;
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("mouseup", onMouseUp);
    };
  });

  return {
    get isFocusVisible() {
      return isFocusVisible;
    },
    onWrapperMouseDown() {
      isMouseInteraction = true;
    },
    onInputMouseDown(_e: MouseEvent) {
      isMouseInteraction = true;
    },
    onInputKeyDown() {
      isMouseInteraction = false;
    },
    onFocus() {
      if (isRecentlyVisible) return;
      isFocusVisible = !isMouseInteraction;
    },
    onBlur() {
      isFocusVisible = false;
    }
  };
}
