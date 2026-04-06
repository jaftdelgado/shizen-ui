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

  let hhInput = $state<HTMLElement | null>(null);
  let mmInput = $state<HTMLElement | null>(null);
  let ssInput = $state<HTMLElement | null>(null);
  let apInput = $state<HTMLElement | null>(null);

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

  $effect(() => {
    const { hh, mm, ss, ap } = segmentState.segments;
    if (hhInput) hhInput.textContent = hh || "─";
    if (mmInput) mmInput.textContent = mm || "─";
    if (showSeconds && ssInput) ssInput.textContent = ss || "─";
    if (hour12 && apInput) apInput.textContent = ap || "─";
  });

  function emit(): boolean {
    const { hh, mm, ss, ap } = segmentState.segments;
    const incomplete = !hh || !mm || (showSeconds && !ss) || (hour12 && !ap);

    if (incomplete) {
      if (value !== "") {
        segmentState.markSelfEmit();
        value = "";
        onchange?.("");
      }
      return false;
    }

    const next = buildTimeString(segmentState.segments, showSeconds, hour12);
    if (next === value) return true;
    segmentState.markSelfEmit();
    value = next;
    onchange?.(value);
    return true;
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
    if (computedProps.finalDisabled) {
      e.preventDefault();
      return;
    }
    const target = e.target as HTMLElement;
    if (target.dataset.segment !== undefined) {
      onSegmentMousedown(e as MouseEvent & { target: HTMLElement });
      return;
    }
    e.preventDefault();
    hhInput?.focus();
  }

  function onWrapperFocusout(e: FocusEvent) {
    const wrapper = e.currentTarget as HTMLElement;
    const relatedTarget = e.relatedTarget as Node | null;
    if (!relatedTarget || !wrapper.contains(relatedTarget)) {
      segmentState.setEditing(false);
      if (segmentState.wasEdited) {
        segmentState.setWasEdited(false);
        emit();
      }
    }
  }
</script>

<div
  role="none"
  data-invalid={computedProps.finalInvalid}
  data-disabled={computedProps.finalDisabled}
  data-in-group={groupContext.inGroup}
  class={wrapperClass}
  onmousedown={onWrapperMousedown}
  onfocusout={onWrapperFocusout}
>
  <input
    id={!computedProps.finalDisabled ? computedProps.finalId : undefined}
    style="position:absolute; width:1px; height:1px; opacity:0; pointer-events:none;"
    tabindex="-1"
    disabled={computedProps.finalDisabled}
    aria-hidden="true"
    onfocus={() => {
      if (!computedProps.finalDisabled) hhInput?.focus();
    }}
  />

  <span
    bind:this={hhInput}
    role="spinbutton"
    contenteditable={!computedProps.finalDisabled}
    inputmode="numeric"
    data-segment
    class="time-input__segment"
    aria-label="Hours"
    aria-valuenow={segmentState.segments.hh ? Number(segmentState.segments.hh) : undefined}
    aria-valuemin={hour12 ? 1 : 0}
    aria-valuemax={hour12 ? 12 : 23}
    aria-invalid={computedProps.finalInvalid}
    aria-errormessage={computedProps.finalInvalid ? computedProps.errorId : undefined}
    aria-describedby={!computedProps.finalInvalid ? computedProps.descriptionId : undefined}
    aria-disabled={computedProps.finalDisabled}
    data-empty={!segmentState.segments.hh}
    tabindex={computedProps.finalDisabled ? -1 : 0}
    onkeydown={onHhKeydown}
    onblur={onHhBlur}
    onbeforeinput={(e) => e.preventDefault()}>{segmentState.segments.hh || "─"}</span
  >

  <span class="time-input__sep" aria-hidden="true">:</span>

  <span
    bind:this={mmInput}
    role="spinbutton"
    contenteditable={!computedProps.finalDisabled}
    inputmode="numeric"
    data-segment
    class="time-input__segment"
    aria-label="Minutes"
    aria-valuenow={segmentState.segments.mm ? Number(segmentState.segments.mm) : undefined}
    aria-valuemin={0}
    aria-valuemax={59}
    aria-disabled={computedProps.finalDisabled}
    data-empty={!segmentState.segments.mm}
    tabindex={computedProps.finalDisabled ? -1 : 0}
    onkeydown={onMmKeydown}
    onblur={onMmBlur}
    onbeforeinput={(e) => e.preventDefault()}>{segmentState.segments.mm || "─"}</span
  >

  {#if showSeconds}
    <span class="time-input__sep" aria-hidden="true">.</span>

    <span
      bind:this={ssInput}
      role="spinbutton"
      contenteditable={!computedProps.finalDisabled}
      inputmode="numeric"
      data-segment
      class="time-input__segment"
      aria-label="Seconds"
      aria-valuenow={segmentState.segments.ss ? Number(segmentState.segments.ss) : undefined}
      aria-valuemin={0}
      aria-valuemax={59}
      aria-disabled={computedProps.finalDisabled}
      data-empty={!segmentState.segments.ss}
      tabindex={computedProps.finalDisabled ? -1 : 0}
      onkeydown={onSsKeydown}
      onblur={onSsBlur}
      onbeforeinput={(e) => e.preventDefault()}>{segmentState.segments.ss || "─"}</span
    >
  {/if}

  {#if hour12}
    <span class="time-input__sep time-input__sep--space" aria-hidden="true"> </span>

    <span
      bind:this={apInput}
      role="spinbutton"
      contenteditable={!computedProps.finalDisabled}
      data-segment
      class="time-input__segment time-input__segment--period"
      aria-label="AM or PM"
      aria-disabled={computedProps.finalDisabled}
      data-empty={!segmentState.segments.ap}
      tabindex={computedProps.finalDisabled ? -1 : 0}
      onkeydown={onApKeydown}
      onbeforeinput={(e) => e.preventDefault()}>{segmentState.segments.ap || "─"}</span
    >
  {/if}
</div>
