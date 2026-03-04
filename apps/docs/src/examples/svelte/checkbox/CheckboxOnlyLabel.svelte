<script lang="ts">
  import { Checkbox, Label } from "@shizen-ui/svelte";

  let subscribe = $state(true);
</script>

<div class="flex flex-col">
  <Checkbox bind:checked={subscribe}>
    <Checkbox.Control />

    <Checkbox.Content>
      <Label>Receive marketing updates</Label>
    </Checkbox.Content>
  </Checkbox>
</div>
