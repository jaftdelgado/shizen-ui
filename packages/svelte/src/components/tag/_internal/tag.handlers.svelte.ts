import type { TagState } from "./tag.state.svelte.js";

export function createTagHandlers(
  state: TagState,
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

  function handleConfirmKey(el: HTMLElement, key: string, type: string): boolean {
    if (key !== "Enter" && key !== " ") return false;

    if (type === "keydown") {
      el.dataset.pressed = "true";
    } else if (type === "keyup") {
      delete el.dataset.pressed;

      if (el.dataset.skipKeyUp) {
        delete el.dataset.skipKeyUp;
        return true;
      }

      if (state.isInteractive) toggle();
    }

    return true;
  }

  function handleRemoveKey(key: string): boolean {
    if ((key !== "Backspace" && key !== "Delete") || state.removeButtonSnippet == null)
      return false;

    state.close();
    return true;
  }

  function handleNavigationKey(el: HTMLElement, key: string): boolean {
    if (!state.group.exists) return false;

    if (key === "ArrowRight" || key === "ArrowDown") {
      state.group.focusNext(el);
      return true;
    }

    if (key === "ArrowLeft" || key === "ArrowUp") {
      state.group.focusPrev(el);
      return true;
    }

    return false;
  }

  function handleTabKey(el: HTMLElement, event: KeyboardEvent): boolean {
    if (event.key !== "Tab" || event.shiftKey || state.removeButtonSnippet == null) return false;

    const removeBtn = el.querySelector<HTMLElement>("[data-remove-button]");
    removeBtn?.focus();
    return true;
  }

  function handleKey(event: KeyboardEvent & { currentTarget: EventTarget & HTMLDivElement }) {
    const el = event.currentTarget as HTMLElement;
    if (event.target !== el) return;

    const handlers = [
      () => handleConfirmKey(el, event.key, event.type),
      ...(event.type === "keydown"
        ? [
            () => handleRemoveKey(event.key),
            () => handleNavigationKey(el, event.key),
            () => handleTabKey(el, event)
          ]
        : [])
    ];

    if (handlers.some((handler) => handler())) {
      event.preventDefault();
    }
  }

  // ─── RemoveButton handlers ────────────────────────────────────────

  function handleRemoveButtonClick(event: MouseEvent): void {
    event.stopPropagation();
    state.close();
  }

  function handleRemoveButtonKeyDown(event: KeyboardEvent): void {
    const { key } = event;

    // Cerrar tag
    if (key === "Enter" || key === " " || key === "Backspace" || key === "Delete") {
      event.preventDefault();
      event.stopPropagation();
      state.close();
      return;
    }

    // Shift+Tab → volver al tag padre
    if (key === "Tab" && event.shiftKey) {
      event.preventDefault();
      const tagEl = (event.currentTarget as HTMLElement).closest<HTMLElement>("[role='checkbox']");
      tagEl?.focus();
      return;
    }

    // Flechas → navegar entre tags
    if (state.group.exists) {
      const el = event.currentTarget as HTMLElement;

      if (key === "ArrowRight" || key === "ArrowDown") {
        event.preventDefault();
        state.group.focusNext(el);
        return;
      }

      if (key === "ArrowLeft" || key === "ArrowUp") {
        event.preventDefault();
        state.group.focusPrev(el);
      }
    }
  }

  return {
    handleClick,
    handleKey,
    handleRemoveButtonClick,
    handleRemoveButtonKeyDown
  };
}

export type TagHandlers = ReturnType<typeof createTagHandlers>;
