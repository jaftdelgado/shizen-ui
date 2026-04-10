import type { Snippet } from "svelte";
import { useTagGroupContext, setTagContext } from "../../../contexts/internal/index.js";
import type { TagStateProps } from "./tag.types.js";

export function createTagState(props: TagStateProps) {
  const group = useTagGroupContext();

  let removeButtonSnippet = $state<Snippet | undefined>(undefined);

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
    }
  };
}

export type TagStateInstance = ReturnType<typeof createTagState>;
