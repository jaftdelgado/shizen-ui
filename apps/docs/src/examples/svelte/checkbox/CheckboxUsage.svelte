<script lang="ts">
  import { Checkbox, Label, Description, Button } from "@shizen-ui/svelte";

  let agree = $state(false);
</script>

<div class="flex flex-col gap-4">
  <Checkbox bind:checked={agree}>
    <Checkbox.Control />

    <Checkbox.Content>
      <Label>This is a checkbox</Label>
    </Checkbox.Content>
  </Checkbox>
</div>
