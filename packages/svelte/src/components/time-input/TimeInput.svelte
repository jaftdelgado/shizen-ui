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
    showSeconds = false,
    hour12 = true,
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

  const segmentState = useSegments(
    () => value,
    () => hour12
  );

  let hhInput = $state<HTMLInputElement | null>(null);
  let mmInput = $state<HTMLInputElement | null>(null);
  let ssInput = $state<HTMLInputElement | null>(null);
  let apInput = $state<HTMLInputElement | null>(null);

  const resolvedSsInput = $derived(showSeconds ? ssInput : null);
  const resolvedApInput = $derived(hour12 ? apInput : null);

  const refs = {
    get hhInput() {
      return hhInput;
    },
    get mmInput() {
      return mmInput;
    },
    get ssInput() {
      return resolvedSsInput;
    },
    get apInput() {
      return resolvedApInput;
    }
  };

  function emit() {
    const { hh, mm, ss, ap } = segmentState.segments;
    if (!hh || !mm) return;
    if (showSeconds && !ss) return;
    if (hour12 && !ap) return;
    const next = buildTimeString(segmentState.segments, showSeconds, hour12);
    if (next === value) return;
    value = next;
    onchange?.(value);
  }

  const {
    onHhKeydown,
    onHhBlur,
    onMmKeydown,
    onMmBlur,
    onSsKeydown,
    onSsBlur,
    onApKeydown,
    onSegmentMousedown
  } = useTimeInputHandlers(
    segmentState,
    refs,
    computedProps,
    emit,
    () => showSeconds,
    () => hour12
  );

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

  {#if showSeconds}
    <span class="time-input__sep" aria-hidden="true">.</span>

    <input
      bind:this={ssInput}
      type="text"
      inputmode="numeric"
      class="time-input__segment"
      placeholder="─"
      value={segmentState.segments.ss}
      size={2}
      maxlength={2}
      disabled={computedProps.finalDisabled}
      aria-label="Seconds"
      onkeydown={onSsKeydown}
      onblur={onSsBlur}
      readonly
    />
  {/if}

  {#if hour12}
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
  {/if}
</div>
