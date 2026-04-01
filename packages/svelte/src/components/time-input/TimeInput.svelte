<script lang="ts">
  import { cn } from "@shizen-ui/styles";
  import { timeInputStyles } from "@shizen-ui/styles";
  import {
    type TimeInputProps,
    useTimeInputContext,
    useDerivedState,
    useSegments,
    useTimeInputHandlers,
    buildTimeString
  } from "./time-input.svelte.js";

  let {
    class: className,
    size = "md",
    variant = undefined,
    disabled = false,
    invalid = false,
    id: propId,
    value = $bindable(""),
    onchange
  }: TimeInputProps = $props();

  const { fieldContext, groupContext, surfaceContext } = useTimeInputContext();

  const computedProps = useDerivedState(
    {
      get size() {
        return size;
      },
      get variant() {
        return variant;
      },
      get disabled() {
        return disabled;
      },
      get invalid() {
        return invalid;
      },
      get id() {
        return propId;
      }
    },
    fieldContext,
    groupContext,
    surfaceContext
  );

  const segmentState = useSegments(() => value);

  let hhInput = $state<HTMLInputElement | null>(null);
  let mmInput = $state<HTMLInputElement | null>(null);
  let apInput = $state<HTMLInputElement | null>(null);

  const refs = {
    get hhInput() {
      return hhInput;
    },
    get mmInput() {
      return mmInput;
    },
    get apInput() {
      return apInput;
    }
  };

  function emit() {
    const { hh, mm } = segmentState.segments;
    if (!hh || !mm) return;
    const next = buildTimeString(segmentState.segments);
    if (next === value) return;
    value = next;
    onchange?.(value);
  }

  const { onHhKeydown, onHhBlur, onMmKeydown, onMmBlur, onApKeydown, onSegmentMousedown } =
    useTimeInputHandlers(segmentState, refs, computedProps, emit);

  const wrapperClass = $derived(
    cn(
      timeInputStyles({ size: computedProps.activeSize, variant: computedProps.finalVariant }),
      className
    )
  );

  function onWrapperMousedown(e: MouseEvent) {
    if (computedProps.finalDisabled) return;
    const target = e.target as HTMLElement;
    if (target.classList.contains("time-input__segment")) {
      onSegmentMousedown(e as MouseEvent & { target: HTMLInputElement });
      return;
    }
    e.preventDefault();
    hhInput?.focus();
  }
</script>

<div
  role="none"
  data-invalid={computedProps.finalInvalid}
  data-disabled={computedProps.finalDisabled}
  data-in-group={groupContext.inGroup}
  class={wrapperClass}
  onmousedown={onWrapperMousedown}
>
  <input
    bind:this={hhInput}
    id={computedProps.finalId}
    type="text"
    inputmode="numeric"
    class="time-input__segment"
    placeholder="─"
    value={segmentState.segments.hh}
    size={2}
    maxlength={2}
    disabled={computedProps.finalDisabled}
    aria-label="Hours"
    aria-invalid={computedProps.finalInvalid}
    aria-errormessage={computedProps.finalInvalid ? computedProps.errorId : undefined}
    aria-describedby={!computedProps.finalInvalid ? computedProps.descriptionId : undefined}
    onkeydown={onHhKeydown}
    onblur={onHhBlur}
    readonly
  />

  <span class="time-input__sep" aria-hidden="true">:</span>

  <input
    bind:this={mmInput}
    type="text"
    inputmode="numeric"
    class="time-input__segment"
    placeholder="─"
    value={segmentState.segments.mm}
    size={2}
    maxlength={2}
    disabled={computedProps.finalDisabled}
    aria-label="Minutes"
    onkeydown={onMmKeydown}
    onblur={onMmBlur}
    readonly
  />

  <span class="time-input__sep time-input__sep--space" aria-hidden="true"> </span>

  <input
    bind:this={apInput}
    type="text"
    class="time-input__segment time-input__segment--period"
    value={segmentState.segments.ap}
    size={2}
    maxlength={2}
    disabled={computedProps.finalDisabled}
    aria-label="AM or PM"
    onkeydown={onApKeydown}
    readonly
  />
</div>
