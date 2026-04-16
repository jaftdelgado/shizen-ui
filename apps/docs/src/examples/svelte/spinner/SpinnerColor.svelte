<script lang="ts">
  import { Spinner, Description } from "@shizen-ui/svelte";
</script>

<div class="flex flex-wrap items-center gap-6">
  <div class="flex flex-col items-center gap-2">
    <Spinner color="current" />
    <Description>Current</Description>
  </div>

  <div class="flex flex-col items-center gap-2">
    <Spinner color="secondary" />
    <Description>Secondary</Description>
  </div>

  <div class="flex flex-col items-center gap-2">
    <Spinner color="accent" />
    <Description>Accent</Description>
  </div>

  <div class="flex flex-col items-center gap-2">
    <Spinner color="success" />
    <Description>Success</Description>
  </div>

  <div class="flex flex-col items-center gap-2">
    <Spinner color="warning" />
    <Description>Warning</Description>
  </div>

  <div class="flex flex-col items-center gap-2">
    <Spinner color="danger" />
    <Description>Danger</Description>
  </div>
</div>
