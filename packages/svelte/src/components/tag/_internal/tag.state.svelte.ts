import type { Snippet } from "svelte";
import { useTagGroupContext, setTagContext } from "../../../contexts/internal/index.js";
import type { TagStateProps } from "./tag.types.js";

export function createTagState(props: TagStateProps) {
  const group = useTagGroupContext();

  let removeButtonSnippet = $state<Snippet | undefined>(undefined);
  let tagEl = $state<HTMLElement | null>(null);

  const resolvedVariant = $derived(group.exists ? (group.variant ?? props.variant) : props.variant);
  const resolvedSize = $derived(group.exists ? (group.size ?? props.size) : props.size);
  const resolvedMode = $derived(group.exists ? group.selectionMode : props.selectionMode);

  const isSelected = $derived(
    group.exists && props.value != null
      ? group.selectedValues.includes(props.value)
      : props.selected
  );

  const isInteractive = $derived(resolvedMode !== "none");
  const isDisabled = $derived(group.exists && group.disabled);

  const tabIndex = $derived((): number => {
    if (!group.exists) return isDisabled ? -1 : 0;
    if (isDisabled) return -1;
    if (tagEl && group.isFirstTag(tagEl)) return 0;
    return -1;
  });

  function unmountTag(): void {
    if (tagEl) group.unregisterTag(tagEl);
    tagEl = null;
  }

  function mountTag(el: HTMLElement): { destroy: () => void } {
    tagEl = el;
    group.registerTag({ tagEl: el, removeButtonEl: null });

    // Una vez montado el tag, buscar el remove button en el DOM
    // en el siguiente microtask para dar tiempo al snippet a renderizarse
    Promise.resolve().then(() => {
      const removeBtn = el.querySelector<HTMLElement>("[data-remove-button]");
      if (removeBtn) {
        group.registerRemoveButton(el, removeBtn);
      }
    });

    return { destroy: unmountTag };
  }

  setTagContext({
    onClose: () => props.onClose?.(),
    registerRemoveButton: (snippet: Snippet) => {
      removeButtonSnippet = snippet;
    }
  });

  return {
    get group() {
      return group;
    },
    get resolvedVariant() {
      return resolvedVariant;
    },
    get resolvedSize() {
      return resolvedSize;
    },
    get resolvedMode() {
      return resolvedMode;
    },
    get isSelected() {
      return isSelected;
    },
    get isInteractive() {
      return isInteractive;
    },
    get isDisabled() {
      return isDisabled;
    },
    get removeButtonSnippet() {
      return removeButtonSnippet;
    },
    get value() {
      return props.value;
    },
    get onClose() {
      return props.onClose;
    },
    get tabIndex() {
      return tabIndex();
    },
    mountTag,
    unmountTag
  };
}

export type TagStateInstance = ReturnType<typeof createTagState>;
