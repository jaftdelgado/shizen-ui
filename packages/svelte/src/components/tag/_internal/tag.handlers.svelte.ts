import type { TagStateInstance } from "./tag.state.svelte.js";

export function createTagHandlers(
  state: TagStateInstance,
  getSelected: () => boolean,
  setSelected: (val: boolean) => void,
  notifyChange: (val: boolean) => void,
  notifyClick: (event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) => void
) {
  function toggle() {
    if (state.group.exists && state.value != null) {
      state.group.toggleValue(state.value);
    } else {
      const next = !getSelected();
      setSelected(next);
      notifyChange(next);
    }
  }

  function handleClick(event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) {
    if (state.isInteractive) {
      toggle();
    }
    notifyClick(event);
  }

  function handleKeyDown(event: KeyboardEvent & { currentTarget: EventTarget & HTMLDivElement }) {
    if (event.target !== event.currentTarget) return;
    if (state.isInteractive && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      toggle();
    }
  }

  return {
    handleClick,
    handleKeyDown
  };
}

export type TagHandlers = ReturnType<typeof createTagHandlers>;
