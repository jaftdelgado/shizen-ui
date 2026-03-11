<script lang="ts">
  import { Button, ButtonGroup, Description } from "@shizen-ui/svelte";
</script>

<div class="flex items-center justify-center gap-2">
  <div class="flex flex-col gap-4">
    <div class="flex flex-col items-start gap-2">
      <Description>All buttons disabled</Description>
      <ButtonGroup disabled>
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </ButtonGroup>
    </div>
    <div class="flex flex-col items-start gap-2">
      <Description>Group disabled, but one button overrides</Description>
      <ButtonGroup>
        <Button disabled>Left</Button>
        <Button disabled>Center</Button>
        <Button>Right (enabled)</Button>
      </ButtonGroup>
    </div>
  </div>
</div>
