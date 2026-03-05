<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { descriptionStyles } from "@shizen-ui/styles";
  import { useFieldStateContext } from "../../contexts/field-state.context";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  interface Props extends HTMLAttributes<HTMLParagraphElement> {
    children: Snippet;
    disabled?: boolean;
    id?: string;
  }

  let { children, class: className, disabled = false, id: propId, ...rest }: Props = $props();

  const fieldContext = useFieldStateContext();

  const finalInvalid = $derived(fieldContext.exists ? fieldContext.invalid : false);
  const finalDisabled = $derived(fieldContext.exists ? fieldContext.disabled : disabled);
  const finalId = $derived(
    propId ??
      (fieldContext.exists && fieldContext.id ? `${fieldContext.id}-description` : undefined)
  );

  const shouldShow = $derived(
    !finalInvalid || (fieldContext.exists && fieldContext.keepDescription)
  );
</script>

{#if shouldShow}
  <p
    id={finalId}
    class={cn(
      descriptionStyles({
        disabled: finalDisabled
      }),
      className
    )}
    data-slot="description"
    data-disabled={finalDisabled}
    data-invalid={finalInvalid}
    {...rest}
  >
    {@render children()}
  </p>
{/if}
