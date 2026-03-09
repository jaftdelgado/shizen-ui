let activeClose = $state<(() => void) | null>(null);

export const tooltipGroup = {
  open(close: () => void) {
    if (activeClose && activeClose !== close) {
      activeClose();
    }
    activeClose = close;
  },

  close(close: () => void) {
    if (activeClose === close) {
      activeClose = null;
    }
  }
};
