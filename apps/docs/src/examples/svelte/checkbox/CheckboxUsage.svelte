<script lang="ts">
  import { Checkbox } from "@shizen-ui/svelte";

  let agree = $state(false);
</script>

<div class="flex flex-col gap-4">
  <Checkbox bind:checked={agree}>
    <Checkbox.Control />
  </Checkbox>
</div>
