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
    // Ignorar eventos que vienen del remove button (bubbling)
    if (event.target !== event.currentTarget) return;

    const { key } = event;

    // Backspace / Delete en tag con remove button → cerrar
    if ((key === "Backspace" || key === "Delete") && state.removeButtonSnippet != null) {
      event.preventDefault();
      state.onClose?.();
      return;
    }

    // Navegación entre tags con flechas
    if (state.group.exists) {
      if (key === "ArrowRight" || key === "ArrowDown") {
        event.preventDefault();
        state.group.focusNext(event.currentTarget as HTMLElement);
        return;
      }
      if (key === "ArrowLeft" || key === "ArrowUp") {
        event.preventDefault();
        state.group.focusPrev(event.currentTarget as HTMLElement);
        return;
      }
    }

    // Tab con remove button → enfocar el remove button en lugar de salir del grupo
    if (key === "Tab" && !event.shiftKey && state.removeButtonSnippet != null) {
      event.preventDefault();
      // El remove button se busca dentro del propio tag element
      const tagEl = event.currentTarget as HTMLElement;
      const removeBtn = tagEl.querySelector<HTMLElement>("[data-remove-button]");
      removeBtn?.focus();
      return;
    }

    // Enter / Space → toggle selección
    if (state.isInteractive && (key === "Enter" || key === " ")) {
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
