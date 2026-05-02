import type { ListBoxStateInstance } from "./list-box.state.svelte.js";
import type { Key } from "./list-box.types.js";

export function createListBoxHandlers(state: ListBoxStateInstance) {
  /**
   * Keyboard handler on the <ul> element.
   * Handles: ArrowUp/Down navigation, Home/End, Enter/Space activation, typeahead.
   */
  function handleKeyDown(
    e: KeyboardEvent & { currentTarget: HTMLUListElement },
    itemKeys: Key[]
  ): void {
    const enabledKeys = itemKeys.filter((k) => !state.isDisabled(k));
    if (enabledKeys.length === 0) return;

    const currentIndex = enabledKeys.indexOf(state.focusedKey ?? "");

    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        const next = currentIndex < enabledKeys.length - 1 ? currentIndex + 1 : 0;
        state.setFocusedKey(enabledKeys[next] ?? null);
        focusItem(e.currentTarget, enabledKeys[next]);
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        const prev = currentIndex > 0 ? currentIndex - 1 : enabledKeys.length - 1;
        state.setFocusedKey(enabledKeys[prev] ?? null);
        focusItem(e.currentTarget, enabledKeys[prev]);
        break;
      }
      case "Home": {
        e.preventDefault();
        state.setFocusedKey(enabledKeys[0] ?? null);
        focusItem(e.currentTarget, enabledKeys[0]);
        break;
      }
      case "End": {
        e.preventDefault();
        const last = enabledKeys[enabledKeys.length - 1];
        state.setFocusedKey(last ?? null);
        focusItem(e.currentTarget, last);
        break;
      }
      case "Enter":
      case " ": {
        e.preventDefault();
        if (state.focusedKey === null) break;

        if (state.selectionMode === "none") {
          state.activateKey(state.focusedKey);
        } else {
          state.selectKey(state.focusedKey);
        }
        break;
      }
      default: {
        // Printable character → typeahead
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
          // We need textValues from DOM — caller passes them in via itemKeys/textValues
          // Typeahead is handled externally in the component for simplicity
        }
      }
    }
  }

  return { handleKeyDown };
}

// ─── Item handlers ────────────────────────────────────────────────────────────

export function createListBoxItemHandlers(state: ListBoxItemStateInstance) {
  function handleClick(e: MouseEvent): void {
    if (state.isDisabled) return;

    const ctx = state.listBoxCtx;

    if (ctx.selectionMode === "none") {
      ctx.activateKey(state.id);
    } else {
      ctx.selectKey(state.id);
    }
  }

  function handlePointerDown(): void {
    if (!state.isDisabled) state.isPressed = true;
  }

  function handlePointerUp(): void {
    state.isPressed = false;
  }

  function handlePointerLeave(): void {
    state.isPressed = false;
  }

  function handleFocus(): void {
    state.isFocused = true;
  }

  function handleBlur(): void {
    state.isFocused = false;
  }

  function handleKeyDown(e: KeyboardEvent): void {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(e as unknown as MouseEvent);
    }
  }

  return {
    handleClick,
    handlePointerDown,
    handlePointerUp,
    handlePointerLeave,
    handleFocus,
    handleBlur,
    handleKeyDown
  };
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function focusItem(list: HTMLUListElement, key: Key | undefined): void {
  if (key === undefined) return;
  const el = list.querySelector<HTMLLIElement>(`[data-key="${key}"]`);
  el?.focus();
}

// Re-export for handlers.ts to be self-contained
import type { ListBoxItemStateInstance } from "./compound/item.state.svelte.js";
export type { ListBoxItemStateInstance };
